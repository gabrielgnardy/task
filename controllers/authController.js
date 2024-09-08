const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.register = async (req, res) => {
  const { email, password, name, surname } = req.body;
  try {
    const user = await User.create({ email, password, name, surname });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.matchPassword(password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, name: user.name, surname: user.surname, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const generateResetToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

exports.sendResetEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    var token = generateResetToken(user.id)
    try {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

      await transporter.sendMail({
        to: email,      
        service: 'gmail',
        subject: 'Redefinição de Senha',
        html: `<p>Solicitamos a redefinição de sua senha. Clique no link abaixo para criar uma nova senha:</p>
               <a href="${resetUrl}">Redefinir Senha</a>
               <p>Este link expira em 1 hora.</p>`,
      });

      res.json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(400).json({});
  }
};

exports.validateResetEmail = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

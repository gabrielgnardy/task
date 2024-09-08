const Task = require('../models/Task');
const { Op } = require('sequelize'); 

exports.getTasks = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1; 
  const limit = req.query.limit ? parseInt(req.query.limit) : 10; 
  const offset = (page - 1) * limit; 
  const searchTerm = req.query.description || ''; 

  const tasks = await Task.findAndCountAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { description: { [Op.like]: `%${searchTerm}%` } }
      ]
    },
    limit: limit,
    offset: offset
  });

  
  res.json({
    tasks: tasks.rows,         
    total: tasks.count,        
    page: page,                
    totalPages: Math.ceil(tasks.count / limit) 
  });
};

exports.createTask = async (req, res) => {
  const { title, description, completed } = req.body;
  let completedDate = completed ? new Date() : null ;
  const task = await Task.create({ userId: req.user.id, title, description, completedDate, completed });
  res.json(task);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const taskById = await Task.findByPk(id);

  let completedDate = taskById.completedDate;
  if(taskById.completed != req.body.completed){
    completedDate = req.body.completed ? new Date() : null;
  }

  const task = await Task.update(
    { title, description, completed, completedDate },
    { where: { id } }
  );
  res.json({task, completedDate});
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id } });
  res.json({ message: 'Task deleted' });
};

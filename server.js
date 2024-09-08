const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

dotenv.config();

const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors());
app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);  

sequelize.sync()
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.log('Error syncing database:', err));

const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "Sistema de Gerenciamento de Tarefas",
        description: "Sistema grenciador de Tarefas"
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ],
    components: {
        schemas: {
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server');           // Your project's root file
});

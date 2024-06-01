'use strict';
require('dotenv').config();
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var port = process.env.PORT || 4201;
var app = express();

var server = require('http').createServer(app);

var admin_routes = require('./routes/admin');
var create_routes = require('./routes/create');
var delete_routes = require('./routes/delete');
var filter_routes = require('./routes/filter');
var list_routes = require('./routes/list');
var update_routes = require('./routes/update');

mongoose.connect('mongodb://127.0.0.1:27017/Example')
  .then(() => console.log('Connected!'));

server.listen(port, function(){
    console.log("Servidor " + port );
});

// Definir la configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    // Información básica del API.
    openapi:"3.0.0",
    info: {
      title: 'Mi API',
      description: 'Descripción de mi API',
      version: '1.0.0',
      contact: {
        name: 'Nombre de contacto',
        email: 'contacto@ejemplo.com',
      },
    },
    // Especificar el esquema de seguridad (JWT en este caso)
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  // Rutas a los archivos con las definiciones de Swagger
  apis: ['./routes/*.js'], // Ejemplo de ruta a un archivo con rutas
};

  //apis: ['./routes/*.js'], // Rutas donde se encuentran las definiciones de Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyparser.urlencoded({limit: '200mb',extended:true}));
app.use(bodyparser.json({limit: '200mb', extended: true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api/helper',admin_routes);
app.use('/api/create',create_routes);
app.use('/api/delete',delete_routes);
app.use('/api/filter',filter_routes);
app.use('/api/list',list_routes);
app.use('/api/update',update_routes);

module.exports = app;

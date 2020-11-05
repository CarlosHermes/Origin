const express = require("express");
const app = express();
const api = require('./api');

var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
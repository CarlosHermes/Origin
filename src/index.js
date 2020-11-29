const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const api = require('./api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

api.myApi(app);
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
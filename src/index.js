const express = require("express");
const bodyParser = require("body-parser");
const app = express()

<script src ="api.js" type="text.js">
//<script src ="api.js" type="text/javascript"></script>
//$.getScript("api.js", function(){});

/*var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());*/


app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
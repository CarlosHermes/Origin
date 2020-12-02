const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const api = require('./api');
const PORT = process.env.PORT || 3000;
//const rout = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//var swaggerUi = require('swagger-ui-express');
//var swaggerDocument = require('./swagger.json');

//app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


api.myApi(app);
const server = app.listen(PORT, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

const SocketIO = required('socket.io');
const io = SocketIO(server);

io.on('connection' , () => {
    console.log('new connection');
});

// en cliente:
//src = "/socket.io/socket.io.js"
src= "chat.js"
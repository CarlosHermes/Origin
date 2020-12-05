const bodyParser = require("body-parser");
const express = require("express");
const app = express();
//const fetch = require("node-fetch");
const api = require('./api');
const PORT = process.env.PORT || 5000;
var path = require('path');
//const rout = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');
//app.use(express.static('client'))
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static(path.join(__dirname, 'client')));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "file:///C:/Users/CarlosCC/nodejs/2damvi/src/TestSockets.html"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


api.myApi(app);
const server = app.listen(PORT, () => {
    console.log("El servidor está inicializado en el puerto" + PORT);
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('con0nection' , () => {
    console.log('new connection', socket.id);
    socket.on('function', (data) =>{
        console.log(data);
        io.sockets.emit('function', data);
    });
    //socket.emit();
});



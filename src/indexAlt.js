///////////////////////////////////////
///// CONSTANTS
        /// EXPRESS
        const express = require("express"),
        app = express(),
          /// PARSER
        bodyParser = require("body-parser"),
          /// API
        api = require("./apiAlt"),
          /// SWAGGER
        swaggerUi = require('swagger-ui-express'),
        swaggerDocument = require('./swagger.json'),
          /// SOCKET
        server = require('http').Server(app),
        io = require('socket.io')(server),
        socket = require('./socket'),
          /// PORT
        PORT = process.env.PORT || 5000;
          /// FETCH
          //const fetch = require("node-fetch");
  
  ///////////////////////////////////////
  ///// SET PARSER
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  //app.use(express.json());
  
  ///////////////////////////////////////
  ///// SET PUBLIC FILES
  app.use(express.static(__dirname + '/public'));
  
  ///////////////////////////////////////
  ///// SET OPENAPI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/api', api);
  
  ///////////////////////////////////////
  ///// SET EXTERNAL SCRIPTS
  api.io = io;
  socket.set(api.io);
  
  ///////////////////////////////////////
  ///// MAIN HTML INDEX
  app.get('/', function (req, res) {
      res.redirect('/index.html');
  });
  
  ///////////////////////////////////////
  ///// SERVER LISTEN UP
  server.listen(PORT, () => {
      console.log("El servidor está inicializado en el puerto " + PORT);
  });
  
  
  /*
  https://github.com/Rocher0724/socket.io-unity/releases/tag/v1.0.1
  */
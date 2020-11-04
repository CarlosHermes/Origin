import SwaggerUI from "./core"

const express = require("express");
const bodyParser = require("body-parser");
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
///////////////////////////////
var swaggerUi = require('swagger-ui-express'),/
const swaggerOptions = {
    "swagger": "2.0",
    "title": "Rest Ranking",
    "info": {
        "version": "1.0.0",
        "title": "Simple API",
        "description": "A simple API to learn how to write OpenAPI Specification"
    },
    "schemes": [
        "https"
    ],
    "host": "simple.api",
    "basePath": "/openapi101",
    "paths": {
        "/": {
            "get": {
                "summary": "Server status",
                "description": "Returns if the server 2-DAMVI is up",
                "responses": {
                    "200": {
                        "description": "message saying the server is up",
                        "schema": {
                            "type": "array",
                            "items": {
                                "properties": {
                                    "code": {
                                        "type": "string",
                                        "description": "error code"
                                    },
                                    "error": {
                                        "type": "boolean",
                                        "description":
                                        "true means there is an error"
                                    },
                                    "message": {
                                        "type": "string"
                                    }
                                }
                            },
                            "examples" : //cuidao
                        }
                    }
                }
            }
        },
        "/ranking": {
            "get": {
                "summary": "Players ranking",
                "description": "Returns a list containing all the players ordered by score.",
                "responses": {
                    "200": {
                        "description": "A list of Players",
                        "schema": {
                            "type": "array",
                            "items": {
                                "properties": {
                                    "position": {
                                        "type": "string",
                                        "description": "position on the ranking"
                                    },
                                    "alias": {
                                        "type": "string",
                                        "description": "alias of the player"
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "surname":{
                                        "type": "string"
                                    },
                                    "score":{
                                        "type": "integer"
                                    },
                                    "created":{
                                        "type": "string",
                                        "format": "date"
                                        "description": "Date when the player was created"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/players/:alias": {
            "post": {
                "summary": "Player creation",
                "description": "Returns an error message which says if the player searched by alias exists or not.",
                "parameters":{
                    "paramAlias":{
                        "name": "alias",
                        "description": "alias of a not existing player you want to save",
                        "type": "string"
                    }
                },
                "responses": {
                    "201": {
                        "description": "Returns the answer to the search",
                        "schema": {
                            "type": "array",
                            "items": {
                                "properties": {
                                    "code":{
                                        "type": "string",
                                        "description": "error code"
                                    },
                                    "error": {
                                        "type": "boolean",
                                        "description":
                                        "true means there is an error"
                                    },
                                    "message": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/players/:alias": {
            "put": {
                "summary": "Player update",
                "description": "Returns an error message which says if the player searched by alias already exists or not, also says if parameters are inserted correctly.",
                "parameters":{
                    "paramAlias":{
                        "name": "alias",
                        "description": "alias of an existing player you want to update",
                        "type": "string"
                    }
                },
                "responses": {
                    "201": {
                        "description": "Returns the answer to the update",
                        "schema": {
                            "type": "array",
                            "items": {
                                "properties": {
                                    "code":{
                                        "type": "string",
                                        "description": "error code"
                                    },
                                    "error": {
                                        "type": "boolean",
                                        "description":
                                        "true means there is an error"
                                    },
                                    "message": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerui.setup(swaggerDocs));
//////////////////////////////

let code100 = { code: 100, error: false, message: '2-DAMVI Server Up' };
let code200 = { code: 200, error: false, message: 'Player Exists' };
let code201 = { code: 201, error: false, message: 'Player Correctly Created' };
let code202 = { code: 201, error: false, message: 'Player Correctly Updated' };
let codeError502 = { code: 503, error: true, message: 'The field: name, surname, score are mandatories (the score value has to be >0)' };
let codeError503 = { code: 503, error: true, message: 'Error: Player Exists' };
let codeError504 = { code: 504, error: true, message: 'Error: Player not found' };

var players = [
    { position: "1", alias: "jperez", name: "Jose", surname: "Perez", score: 1000, created: "2020-11-03T15:20:21.377Z"},
    { position: "2", alias: "jsanz", name: "Juan", surname: "Sanz", score: 950, created: "2020-11-03T15:20:21.377Z" },
    { position: "3", alias: "mgutierrez", name: "Maria", surname: "Gutierrez", score: 850, created: "2020-11-03T15:20:21.377Z" }
];

function UpdateRanking() {
    //Order the ranking
    players.sort((a, b) => (a.score <= b.score) ? 1 : -1);

    //Position Update
    for (x = 0; x < players.length; x++) {
        players[x].position = x + 1;
    }
};

app.get('/', function (req, res) {
    //code funciona ok
    res.send(code100);
});

app.get('/ranking', function (req, res) {
    let ranking = { namebreplayers: players.length, players: players };
    res.send(ranking);
});

app.get('/players/:alias', function (req, res) {
    //Player Search
    var index = players.findIndex(j => j.alias === req.params.alias);

    if (index >= 0) {
        //Player exists
        response = code200;
        response.jugador = players[index];
    } else {
        //Player doesn't exists
        response = codeError504;
    }
    res.send(response);
});

app.post('/players/:alias', function (req, res) {
    var paramAlias = req.params.alias || '';
    var paramName = req.body.name || '';
    var paramSurname = req.body.surname || '';
    var paramScore = req.body.score || '';

    if (paramAlias === '' || paramName === '' || paramSurname === '' || parseInt(paramScore) <= 0 || paramScore === '') {
        response = codeError502;
    } else {
        //Player Search
        var index = players.findIndex(j => j.alias === paramAlias)

        if (index != -1) {
            //Player allready exists
            response = codeError503;
        } else {
            //Add Player
            players.push({ 
                position: '', 
                alias: paramAlias, 
                name: paramName, 
                surname: paramSurname, 
                score: paramScore ,
                created: new Date()
            });
            //Sort the ranking
            UpdateRanking();
            //Search Player Again
            index = players.findIndex(j => j.alias === paramAlias);
            //Response return
            response = code201;
            response.player = players[index];
        }
    }
    res.send(response);
});

app.put('/players/:alias', function (req, res) {
    var paramalias = req.params.alias || '';
    var paramname = req.body.name || '';
    var paramsurname = req.body.surname || '';
    var paramScore = req.body.score || '';

    if (paramalias === '' || paramname === '' || paramsurname === '' || parseInt(paramScore) <= 0 || paramScore === '') {
        response = codeError502; //Paràmetres incomplerts
    } else {
        //Player Search
        var index = players.findIndex(j => j.alias === paramalias)

        if (index != -1) {
            //Update Player
            players[index] = { 
                position: '', 
                alias: paramalias, 
                name: paramname, 
                surname: paramsurname, 
                score: paramScore,
                created:  players[index].created,
                updated: new Date()
            };
            //Sort the ranking
            UpdateRanking();
            //Search Player Again
            index = players.findIndex(j => j.alias === paramalias);
            //Response return
            response = code202;
            response.jugador = players[index];
        } else {
            response = codeError504;
        }
    }
    res.send(response);
});
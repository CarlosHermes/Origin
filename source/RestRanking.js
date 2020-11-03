const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false})); //espacios, accentos ->%
app.use(bodyParser.json());

let jugadores = [{
    posicio: '1',
    alies: 'jperez',
    nom:'jose',
    cognom: 'Perez',
    score: '1000'
},
{
    posicio: '2',
    alies: 'jsanz',
    nom:'Juan',
    cognom: 'Sanz',
    score: '950'
},
{
    posicio: '3',
    alies: 'mgutierrez',
    nom:'Maria',
    cognom: 'Gutierrez',
    score: '850'
}];

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

app.get('/ranking', function (req, res) {
    respuesta = {
        nombreJugadors : jugadores.length,
        jugadores: jugadores}
    res.send(respuesta);
});

app.get('/jugador/:alies', function (req, res) {
    respuesta = {
        error: true,
        codigo: 504,
        mensaje: 'El jugador no existe'
    };
    trobat = jugadores.find(({ alies }) => alies === req.params.alies ); //encuentra al jugador en el vector jugadores
    i = trobat != undefined? parseInt(trobat.posicio): 0; //i da igual si no lo encuentra
    respuesta =  trobat != undefined? {jugador : jugadores[i-1]    }: respuesta;  //respuesta es el jugadores[i] si lo encuentra
    res.send(respuesta);
});

app.post('/jugador/:alies', function (req, res) {
    respuesta = {
        error: true,
        codigo: 503,
        mensaje: 'El jugador ya existe'
    };
    if (req.params.alies== "" || req.body.nom == "" || req.body.cognom == "" ||  req.body.score == "" || parseInt(req.body.score) <0) //si te dejas un campo o score <0
    {
         respuesta = {
             error: true,
             codigo: 502,
             mensaje: 'El campo alias, nombre, apellido y score son requeridos'
         };
    }
    else{
        trobat = jugadores.find(({ alies }) => alies === req.params.alies );
        if (trobat == undefined)
            {
                jugadores[jugadores.length] = {
                    posicio: jugadores.length,
                    alies: req.params.alies,
                    nom: req.body.nom,
                    cognom: req.body.cognom,
                    score: req.body.score
                };
                jugadores.sort((a, b) => b.score - a.score); //ordeno jugadores en funcion de score de mayor a menor
                for(j=0; j<jugadores.length; j++) jugadores[j].posicio = j+1; //asocio la posicion al orden que tienen
                respuesta = { jugadores : jugadores};
            }
        }
    res.send(respuesta);
});

app.put('/jugador/:alies', function (req, res) {
    respuesta = {
        error: true,
        codigo: 504,
        mensaje: 'El jugador no existe'
    };
    if (req.params.alies== "" || req.body.nom == "" || req.body.cognom == "" ||  req.body.score == "" || parseInt(req.body.score) <0)
    {
         respuesta = {
             error: true,
             codigo: 502,
             mensaje: 'El campo alias, nombre, apellido y score son requeridos'
         };
    }
    else{
        trobat = jugadores.find(({ alies }) => alies === req.params.alies );
        if(trobat != undefined)
        {
            jugadores.splice(trobat.posicio-1, 1);
            jugadores[jugadores.length] = {
                posicio: jugadores.length,
                alies: req.params.alies,
                nom: req.body.nom,
                cognom: req.body.cognom,
                score: req.body.score
            };
            jugadores.sort((a, b) => b.score - a.score);
            for(j=0; j<jugadores.length; j++) jugadores[j].posicio = j+1;
            respuesta = { jugadores : jugadores };
        }
    }
    res.send(respuesta);
});

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
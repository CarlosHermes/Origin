//const { response } = require("express");

//const { Socket } = require("socket.io");
//const socket = io()
myApi = function (app){
    
let code100 = { code: 100, error: false, message: 'Game Server Up' };
let code200 = { code: 200, error: false, message: 'User Exists' };
let code201 = { code: 201, error: false, message: 'User Correctly Created' };
let code202 = { code: 201, error: false, message: 'User Correctly Updated' };
let code203 = { code: 201, error: false, message: 'User Correctly Deleted' };
let code204 = { cpde: 201, error: false, message: 'Login succeeded'};
//let codeError502 = { code: 503, error: true, message: 'The field: password, coins, level are mandatories (the level value has to be >0)' };
let codeError503 = { code: 503, error: true, message: 'Error: User Already Exists' };
let codeError504 = { code: 504, error: true, message: 'Error: User not found' };
let codeError505 = { code: 505, error: true, message: "Error: Incorrect Username or Password"};
let codeError506 = { code: 506, error: true, message: "Error: Incorrect Field"};
let codeError507 = { code: 507, error: true, message: "Error: Incorrect Password"};

//var login = false;

var users = [
    { position: "1", userName: "jperez", password: "sdaasdasfasd", coins: "0", ingots: "0", level: 1000, created: "2020-11-03T15:20:21.377Z"},
    { position: "2", userName: "jsanz", password: "asfasdasd", coins: "0", ingots: "0", level: 950, created: "2020-11-03T15:20:21.377Z" },
    { position: "3", userName: "mgutierrez", password: "Marasfasasdia", coins: "0", ingots: "0", level: 850, created: "2020-11-03T15:20:21.377Z" }
];
var updatableParams = [
     "password", "coins", "ingots", "level"  
];

function UpdateRanking() {
    //Order the ranking
    users.sort((a, b) => (a.level <= b.level) ? 1 : -1);

    //Position Update
    for (x = 0; x < users.length; x++) {
        users[x].position = x + 1;
    }
    //socket.emit('ranking', users);
};

/*app.put('/users', function (req, res){
    login = false;
});*/

app.get('/', function (req, res) {
    //code funciona ok
    res.send(code100);
});

app.get('/ranking', function (req, res) {
    let ranking = { numberplayers: users.length, users: users };
    res.send(ranking);
});

app.get('/login', function (req, res){
    var paramUser = req.body.userName || '';
    var paramPassword = req.body.password || '';

    var index = users.findIndex(j => j.userName === paramUser);
    var index2 = users.findIndex(j => j.password === paramPassword);
    response = index >= 0 && index2 >=0? code204: codeError505;
    //login = (index >= 0 && index2 >=0);
    res.send(response)
});

app.get('/users/:userName', function (req, res) {
    //User Search
    var index = users.findIndex(j => j.userName === req.params.userName);

    if (index >= 0) {
        //User exists
        response = code200;
        response.User = users[index];
    } else {
        //User doesn't exists
        response = codeError504;
    }
    res.send(response);
});

app.post('/users/:userName', function (req, res) {  //hacer post de crear usuario               
    var paramUser = req.params.userName || '';
    var paramPassword = req.body.password || '';

    if (paramUser === '' || paramPassword === '') {
        response = codeError502;
    } else {
        //User Search
        var index = users.findIndex(j => j.userName === paramUser)

        if (index != -1) {
            //User allready exists
            response = codeError503;
        } else {
            //Add User
            users.push({ 
                position: '', 
                userName: paramUser, 
                password: paramPassword, 
                coins: 0, 
                ingots: 0,
                level: 0,
                created: new Date()
            });
            //Sort the ranking
            UpdateRanking();
            //Search User Again
            index = users.findIndex(j => j.userName === paramUser);
            //Response return
            response = code201;
            response.User = users[index];
        }
    }
    res.send(response);
});


app.put('/users/:userName', function (req, res) { //put de cambiar algún campo  
    var paramUser = req.params.userName || '';
    var paramField = req.body.field || '';
    var paramValue = req.body.value || '';
        //User Search
    var index = users.findIndex(j => j.userName === paramUser)
    var index2 = updatableParams.findIndex(j => j == paramField);
    if (index != -1 && index2 != -1) {
        //Update User
        users[index] = { 
            position: '', 
            userName: paramUser, 
            password: users[index].password, 
            coins: users[index].coins,
            ingots: users[index].ingots, 
            level: users[index].level,
            created:  users[index].created,
            updated: new Date()
        };
        var field = updatableParams[index2];
        if (field == "level")
                //Sort the ranking
                UpdateRanking();
        users[index][field] = paramValue;

        //Search User Again
        index = users.findIndex(j => j.userName === paramUser);
        //Response return
        response = code202;
        response.User = users[index];
    } else {
        response = index==-1?codeError504: codeError506;
    }
    res.send(response);
});

app.delete('/users/:userName', function (req, res){
    var paramUser = req.params.userName || '';
    var paramPassword = req.body.password || '';
    index = users.findIndex(j => j.userName === paramUser);
    if(index != -1){
        if(users[index].password==paramPassword) { 
            users.splice(index,1);
            //User correctly deleted
            response = code203;
            UpdateRanking();
        } else
            //Incorrect Password
            response = codeError507;
    } else
        //User not found
        response = codeError504;
    res.send(response);
});

}
exports.myApi = myApi;


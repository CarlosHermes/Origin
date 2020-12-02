const { response } = require("express");

const socket = io()

let username = document.getElementById('username');
let password = document.getElementById('password');
let username2 = document.getElementById('username2');
let password2 = document.getElementById('password2');
let field = document.getElementById('field');
let value = document.getElementById('value');
let password3 = document.getElementById('password3');

var user = '';
// function httpGet(Url)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", Url, false ); // false for synchronous request
//     xmlHttp.send( null );
//     return xmlHttp.responseText;
// }
var requestt = new XMLHttpRequest();
function requesttSend(ttype, uurl, ddata)
{
    requestt.open(ttype, uurl, true);
    requestt.send(ddata);
    requestt.onload = function () {
        return requestt.response;
      };
}

// xhr.send('string');
function clicker(action) {
    document.getElementById("operacion").innerText = action;
    switch(action)
    {
        case 'server':
            //resp= xmlhttprequest.send("http://localhost:3000/");
            resp = requesttSend('Get', 'http://localhost:3000/', null);
            idvar = 'resServer';
            break;
        case 'login':
            data = {
                "userName": username,
                "password": password
            }
            resp = requesttSend('Get', 'http://localhost:3000/login', data);
            idvar = 'resLogin';
            user = !resp.error? username: '';
            break;
        case 'register':
            data = {
                "password": password2
            }
            resp = requesttSend('Post', 'http://localhost:3000/users/:' + username2, data);
            idvar ='resRegister';
            break;
        case 'ranking':
            resp = requesttSend('Get', 'http://localhost:3000/ranking', null);
            idvar =='resRanking';
            break;
        case 'myData':
            resp = requesttSend('Get', 'http://localhost:3000/users/:' + user, null);
            idvar =='resUser';
            break;    
        case 'update':
            data = {
                "field" : field,
                "value" : value
            }
            resp = requesttSend('Put', 'http://localhost:3000/users/:' + user, data);
            idvar =='resUpdate';
            break;
        case 'delete':
            data = {
                "password" : password3
            }
            resp = requesttSend('Delete', 'http://localhost:3000/users/:' + user, data);
            idvar =='resDelete';
            break;
    }

document.getElementById(idvar).innerText = resp;
};
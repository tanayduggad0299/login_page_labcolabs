const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const functionality = require('./functionality');

const hostname = 'localhost';
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',			//change these 4 properties according to your own database structure
    user: 'root', 
    password: '05041999',
    database: 'users'
});

connection.connect();
global.connection = connection;

const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', functionality.loginPage);
//app.get('/index', functionality.index);
app.get('/signup', functionality.signupPage);
app.post('/signup', functionality.signup);
app.get('/login', functionality.loginPage);
app.post('/login', functionality.login);
app.get('/logout', functionality.logout);

app.listen(3000, ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});
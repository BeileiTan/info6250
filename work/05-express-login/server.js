const express = require('express');
const app = express();
const uuidv4 = require('uuid').v4;
const PORT = 3000;

// Created outside a route handler
const sessions = {};
const user = {};

// express "middleware", this time as an extra library
const cookieParser = require('cookie-parser'); 
app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// (skipping over other express stuff)

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if(sid){
        const username = sessions[sid]?.username;
        const word = user[username]?.word;
        const display = word === undefined ? "" : word;
        res.send(
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
            <div class="login-form">
                <h1> Home Page</h1>
                <form action="/word" method="post">
                <div class="img-container">
                    <img src="/home.png" alt="Avatar" class="avatar">
                </div>
                <h2 class="store-word">Store word for this user: <span> ${username} </span></h2>
                <div class="word"> 
                ${display}  
                </div>
                <div class="container">
                    <label for="word">Change the stored word: </label>
                    <input type="text" id="word" name="word" value="" required>
                </div>
                <button type="submit">Submit</button>
                </form>
                <form action="/logout" method="post">
                <button type="submit" class="logout-btn">Logout</button>
                </form>
            </div>
            </body>
            </html>`
        )   
    }else{
        res.send(
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
            <div class="login-form">
                <h1> Login Page</h1>
                <form action="/login" method="post">
                <div class="img-container">
                    <img src="/login.png" alt="Avatar" class="avatar">
                </div>
                <div class="container">
                    <label for="username">Username: </label>
                    <input type="text" id="username" name="username" value="">
                </div>
                <button type="submit">Login</button>
                </form>          
            </div>
            </body>
            </html>`
        )
    }
});

app.post('/word', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions[sid]?.username;
    const word = req.body.word;
    user[username] = {word};
    res.redirect('/');
})

app.post('/login', (req,res) => {
    const username = req.body.username; 
    if(!username || username === 'dog' || !isValid(username)){
        // Give better errors than this!
        res.status(401).send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <div class="login-form">
                <div class="back-form">
                    <img src="/page.png" alt="Avatar" class="wrongPage">
                    <h1>This page isn't working</h1>
                    <p>HTTP/1.1 401 Unauthorized</p>
                    <a href="/">Back to the login Form</a>
                </div>
            </div>
        </body>
        </html>`);
        return 
    }
    const sid = uuidv4();
    sessions[sid] = { username };
    res.cookie('sid',sid);
    res.redirect('/');
    });

//check if username that is not made up of letters or numbers only
function isValid(inputText){
    const letterNumber =  /^[0-9a-zA-Z]+$/;
    if(inputText.match(letterNumber)){
        return true;
    }else{
        return false;
    }
}

app.post('/logout',(req, res) => {
    //remove the session id from the object
    const sid = req.cookies.sid;
    delete sessions[sid];
    //remove the cookie from the browser
    res.clearCookie('sid');
    //redirect the use
    res.redirect('/');
})

app.listen(PORT, ()=>{
    console.log(`Listening on https://localhost:${PORT}`)
});
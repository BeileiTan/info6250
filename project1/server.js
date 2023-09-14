const express = require('express');
const app = express();
const uuidv4 = require('uuid').v4;
const cookieParser = require('cookie-parser'); 
const PORT = 3000;

// Created outside a route handler
const sessions = {};
const states = {};


// express "middleware", this time as an extra library
app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//"game" holds all the non-web logic for managing users/messages
const game = require('./game');
//"game-web" holds the templates for the generated HTML
const gameWeb = require('./game-web');
const logIn = require('./login');
const words = require('./words');

app.get('/',(req, res) => {
    const sid = req.cookies.sid;
    const username = sessions[sid]?.username;
    const prevGuess = states[username]?.prevGuess;
    const validCount = states[username]?.validCount;
    const validArray = states[username]?.validArray;
    const scoreKeeper = validCount === undefined ? 0 : validCount;
    const validWord = validArray === undefined ? " " : validArray[scoreKeeper-1];
    const currentValid = validWord === undefined ? " " : validWord;
    const wordsTest = states[username]?.wordsTest;
    const wordList = wordsTest === undefined ? words : wordsTest;
    const preList = prevGuess === undefined ? [{guessedWords:" ", matchedLetter:" ", validState: " "}]: prevGuess;
    if(!isValidSid(sid)){
        res.send(logIn.sidPage());
    }else if(sid){
        if(currentValid === states[username]?.realWord){
            res.send(gameWeb.gamePage2(username, wordList, preList, scoreKeeper, currentValid));
        }else{
            res.send(gameWeb.gamePage(username, wordList, preList, scoreKeeper, currentValid));
        }
    }else{
        res.send(logIn.loginPage());
    }
})

app.post('/login', (req,res) => {
    const username = req.body.username; 
    if(!username || username === 'dog' || !isValidInput(username)){
        res.status(401).send(logIn.errorPage());
    }else{
        const sid = uuidv4();
        sessions[sid] = { username };
        res.cookie('sid',sid);
        res.redirect('/');
    }
});                                                                                                                                                                                                                                                                               
function isIncluded(guessedWords, matchedLetter, validCount, validArray, prevGuess, wordsTest){
    if(words.includes(guessedWords) && !validArray.includes(guessedWords)){
        validArray.push(guessedWords);
        prevGuess.push({guessedWords:guessedWords, matchedLetter: matchedLetter, validState: "valid"});
        const index = wordsTest.indexOf(guessedWords);
        wordsTest.splice(index, 1);
        return validCount + 1;
    }else{
        prevGuess.push({guessedWords:guessedWords, matchedLetter: matchedLetter, validState: "invalid"});
        return validCount;
    }
}

// check if username that is not made up of letters or numbers only
function isValidInput(inputText){
    const letterNumber =  /^[0-9a-zA-Z]+$/;
    if(inputText.match(letterNumber)){
        return true;
    }else{
        return false;
    }
} 

function isValidSid(curSid){
    if(sessions && curSid){
        if(sessions[curSid]){
            return true;
       }else{
            return false;
       }
    }else{
        return true;
    }
}

app.post('/guess', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions[sid]?.username;
    if(states[username]){
        const realWord = states[username].realWord;
        const guessedWords = req.body.guessedWords;
        validCount = states[username].validCount;
        validArray = states[username].validArray;
        prevGuess = states[username]?.prevGuess;
        wordsTest = states[username]?.wordsTest
        const matchedLetter = game.matchLetter(realWord , guessedWords);
        validCount = isIncluded(guessedWords, matchedLetter, validCount, validArray, prevGuess, wordsTest);
        states[username].validCount = validCount;
    }else{
        const realWord = game.randomWord(words);
        const guessedWords = req.body.guessedWords;
        let validCount = 0;
        let validArray = [];
        prevGuess = [];
        const wordsTest = structuredClone(words);
        const matchedLetter = game.matchLetter(realWord , guessedWords);
        validCount = isIncluded(guessedWords, matchedLetter, validCount, validArray, prevGuess, wordsTest);
        states[username] = {wordsTest, validCount, validArray, realWord, prevGuess};
    } 
    console.log(`username: ${username} and correct word: ${states[username].realWord}`);
    res.redirect('/');
})

app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions[sid].username;
    const wordsTest = structuredClone(words);
    states[username].wordsTest = wordsTest;
    delete states[username];
    res.redirect('/');
})

app.post('/logout',(req, res) => {
    //remove the session id from the object
    const sid = req.cookies.sid;
    delete sessions[sid];
    //remove the cookie from the browser
    res.clearCookie('sid');
    //redirect the use
    res.redirect('/');
})


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
const gameWeb = {
    gamePage: function(username, wordList, preList, scoreKeeper, currentValid){
        return `
        <!DOCTYPE html>
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
                    <h1> Guess Game Home Page for ${username}</h1>
                    <div class="img-container">
                        <img src="/home.png" alt="Avatar" class="avatar">
                    </div>
                    <div>
                        ${gameWeb.getWordList(wordList)}
                        <p class="list">This is the list of previously guessed words and their corresponding matched letter to the correct word:</p>
                        ${gameWeb.getGuessList(preList)}
                        <p class="container">The number of valid guesses is made: <span id="keeper"> ${scoreKeeper} </span> and the current valid guess is <span id="curValid">${currentValid}</span>
                        ${gameWeb.getOutgoing()}
                    </div>
                    <form action="/new-game" method="post">
                    <button type="submit" class="logout-btn">New Game</button>
                    </form>
                    <form action="/logout" method="post">
                    <button type="submit" class="logout-btn">Logout</button>
                    </form>
                </div>
            </body>
        </html>
        `;
    },
    gamePage2: function(username, wordList, preList, scoreKeeper, currentValid){
        return `
        <!DOCTYPE html>
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
                    <h1> Guess Game Home Page for ${username}</h1>
                    <div class="img-container">
                        <img src="/home.png" alt="Avatar" class="avatar">
                    </div>
                    <div>
                        ${gameWeb.getWordList(wordList)}
                        <p class="list">This is the list of previously guessed words and their corresponding matched letter to the correct word:</p>
                        ${gameWeb.getGuessList(preList)}
                        <p class="container">The number of valid guesses is made: <span id="keeper"> ${scoreKeeper} </span> and the current valid guess is <span id="curValid">${currentValid}</span>
                        <p id="success"> Congratulation! You have successfully guessed the word - ${currentValid}</p>
                        ${gameWeb.getOutgoing()}
                    </div>
                    <form action="/new-game" method="post">
                    <button type="submit" class="logout-btn">New Game</button>
                    </form>
                    <form action="/logout" method="post">
                    <button type="submit" class="logout-btn">Logout</button>
                    </form>
                </div>
            </body>
        </html>
        `;
    },
    getWordList: function(wordList){
        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                <p class="list">This is the list of possible correct words:</p>
                    <p id="wordList">
                    ${wordList}
                    </p>
            </body>
        </html>
        `;
    },
    getGuessList: function(preList){
        return `<ol class>` +
        // Fill in
        // Generate the HTML for the list of messages
        preList.map( p => `
        <li>
        <div>
                <span>Guessed word: <span class="preList">${p.guessedWords}</span> -  Number of matched letter: <span class="preList">${p.matchedLetter}</span> - Whether this is valid guess: <span class="preList">${p.validState}</span></span>
        </div>
        </li>
        `).join('') +
        `</ol>`;
    },
    getOutgoing: function(){
        return `
        <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                    <form action="/guess" method="post">
                    <p class="list">Guess the word: </p>
                    <div class="container">
                    <input type="text" name="guessedWords" value="" placeholder="Guess a 5-Letter Words" required>
                    </div>
                    <button type="submit">Guess</button>
                    </form>
                </body>
            </html>
        `;
    },
}

module.exports = gameWeb;
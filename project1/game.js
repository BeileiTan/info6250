"use strict";
function matchLetter( word, guess ) {
    function letterCountsOf( word ) {
        const letterCounts = {};
        word.toUpperCase().split('').forEach( letter => { letterCounts[letter] = letterCounts[letter] + 1 || 1;
        });
        return letterCounts;
    }
    const wordUpper = word.toUpperCase();
    const guessUpper = guess.toUpperCase();
    const wordCounts = letterCountsOf(wordUpper); 
    const guessCounts = letterCountsOf(guessUpper); 
    let matched = 0;
    for( let letter in guessCounts ){
        const wordCount = wordCounts[letter] || 0;
        const guessCount = guessCounts[letter] || 0; 
        matched += Math.min( wordCount, guessCount );
    }
    return matched;
}

function randomWord(wordList){
    return wordList[Math.floor(Math.random() * wordList.length)];
}

const game = {
    matchLetter,
    randomWord,
};


module.exports = game;
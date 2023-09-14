"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */

    // Compare number of letters regardless of upper/lowercase
    const wordUpper = word.toUpperCase();
    const guessUpper = guess.toUpperCase();
    // Get the object of number of occurrences of each character
    const w1Dict = countLetter(wordUpper);
    const w2Dict = countLetter(guessUpper);
    let commonNumber = 0;
    for(const key in w1Dict){
      //console.log(typeof w1Dict[key])
      //console.log(`${key}: ${w1Dict[key]}`);
      if(w2Dict[key]){
        if(w1Dict[key] === w2Dict[key]){
          commonNumber += w1Dict[key];
        }else{
          commonNumber += w1Dict[key] > w2Dict[key] ? w2Dict[key] : w1Dict[key];
        }
      }
    }
    return commonNumber;
}

// This is function to store number of occurrences of each character in the object
function countLetter(words){
  const wordDictionary = {};
  if(words.length === 0 || words === ''){
    return 0;
  }
  for(let i = 0; i < words.length; i++){
    let count = 0;
    for(let j = 0; j < words.length; j++){
      // avoid recounting the same character later
      if(words[i] === words[j] && i > j){
        break;
      }
      if(words[i] === words[j]){
        count += 1;
      }
    }
    if(count > 0){
      wordDictionary[words[i]] = count;
    }
  }
return wordDictionary;
}
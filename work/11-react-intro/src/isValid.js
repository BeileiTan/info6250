export function isValid(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
  }
  
export function isValidWord(word) {
    let isValidWord = true;
    isValidWord = !!word && word.trim();
    isValidWord = isValid && word.match(/^[A-Za-z0-9_]+$/) && word.length === 5;
    return isValidWord;
  }
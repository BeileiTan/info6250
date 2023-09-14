import './App.css';

import { useState } from 'react'; // no "path", we're importing from a library
import Game from './Game'; // These have explicit paths, we're importing our own files
import Login from './Login';
import { Compare } from './Compare'; 
import { isValid, isValidWord } from './isValid';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isValidname, setIsValidname] = useState(false);
  const [isValidpassword, setIsValidpassword] = useState(false);
  const [username, setUsername] = useState('');

  const[firstTime, setFirstTime] = useState(false);

  const [isValidword, setIsValidword] = useState(false);
  const [isCorrectword, setIsCorrectword] = useState(false);
  const [matchedLetter, setMatchedLetter] = useState(0);
  const [word, setWord] = useState('')

  function onLogin(username) {
    if(!isValid(username)){
      setIsValidname(true);
    }else if(username === 'dog'){
      setIsValidpassword(true);
      setIsValidname(false);
    }else{
      setUsername(username);
      setIsLoggedIn(true);
      setFirstTime(true);
      setIsValidname(false);
      setIsValidpassword(false);
    }
  };
  function onLogout() {
    setIsLoggedIn(false);
  };

  function onWord(word, guess){
    guess = "RECAT";
    if(!isValidWord(word)){
      setIsValidword(true);
      setWord(word);
      setFirstTime(false);
    }else if(word.toUpperCase() === guess){
      setIsValidword(false);
      setIsCorrectword(true);
      setWord(word);
      setFirstTime(false);
    }else{
      setIsCorrectword(false);
      setIsValidword(false);
      setWord(word);
      setMatchedLetter(Compare(word, guess));
      setFirstTime(false);
    }
  }

  // Notice we use "className", not "class"
  // Notice we use kebab-case classnames!
  // Notice the value in {} is replaced by result
  return (
    <div className="app">
      { isLoggedIn
        ? <Game
            username={username}
            onWord={onWord}
            isValidword={isValidword}
            isCorrectword={isCorrectword}
            word={word}
            onLogout={onLogout}
            matchedLetter={matchedLetter}
            firstTime={firstTime}
          />
        : <Login
            onLogin={onLogin}
            isValidname={isValidname}
            isValidpassword={isValidpassword}
          />
      }
    </div>
  );
}



export default App;

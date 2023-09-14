import './App.css';
import { useState, useEffect } from 'react';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';

import{
  fetchGet,
  fetchLogin,
  fetchUpdate,
  fetchGetWord,
  fetchLogout,
} from './services'

import Controls from './Controls';
import LoginForm from './LoginForm';
import Loading from './Loading';
import Status from './Status';
import Words from './Words';



function App() {

  const [ username, setUsername] = useState('');
  const [ isContentPending, setIsContentPending] = useState(false);
  const [ error, setError ] = useState('');
  const [ storedWord, setstoredWord] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING); // one variable covers multiple cases


  function onLogin(username){
    setIsContentPending(true);
    fetchLogin(username)
    .then(user => {
      setError('');
      setstoredWord(user.storedWord);
      setIsContentPending(false);
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onLogout(){
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setstoredWord('');
    fetchLogout()
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function onUpdateWord(word){
    fetchUpdate(word)
    .then(user => {
      setstoredWord(user.storedWord);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function checkForSession(){
    fetchGet()
    .then( session => {
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      return fetchGetWord();
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( user => {
      setstoredWord(user.storedWord);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        // Not yet logged in isn't a reported error
        return;
      }
      // For unexpected errors, report them
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  useEffect(
    () => {
      checkForSession();
    },
    [] // Only run on initial render
  );

  return (
    <div className="App">
      { error && <Status error={error}/> }
      { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
      { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
      { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="game-form">
            <p className='label'>Hello, {username}</p>
            <Controls onLogout={onLogout}/>
            <Words
              onUpdateWord={onUpdateWord}
              isContentPending={isContentPending}
              storedWord={storedWord}
            />
          </div>
      )}
    </div>
  );
}

export default App;

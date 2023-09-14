import { SERVER, CLIENT } from './constants';

import state, {
    login,
    logout,
    setChats,
    setError,
  } from './state';

import {
    fetchChat,
    fetchSession,
} from './services';

import {render} from './render';
import {renderMessage} from './renderMessage';

import {
    addAbilityToLogin,
    addAbilityToLogout,
    addAbilityToAddChat
  } from './listeners';

//This is where someone new to the code will see what happens on load
const appEl = document.querySelector('#app');
render({ state, appEl });
addAbilityToLogin({ state,  appEl });
addAbilityToLogout({ state, appEl });
addAbilityToAddChat({ state, appEl });
checkForSession();
pollChats();
function checkForSession() {
    fetchSession()
    .then( session => { // The returned object from the service call
      login(session.username); // We do not have todos yet!
      render({ state, appEl });  // Show we are logged in but don't have todos
      return fetchChat(); // By returning this promise we can chain the original promise
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( chats => {
      setChats(chats.messageLists, chats.senderLists);
      render({ state, appEl });
    })
    .catch( err => {
      if( err?.error == CLIENT.NO_SESSION ) { // expected "error"
        logout(); // No longer waiting, set to logged out case
        render({ state, appEl });
        return;
        }
        // For unexpected errors, report them
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
        render({ state, appEl });
    });
  }


function refreshChats() {
    fetchChat()
    .then( chats => {
      const updatesElement = document.querySelector('.user-list');
      setChats(chats.messageLists, chats.senderLists);
      renderMessage({ state, updatesElement });
      console.log("refreshed");
    })
}

function pollChats() {
    refreshChats(); // fetch and use data
    setTimeout( pollChats, 3500 );
}

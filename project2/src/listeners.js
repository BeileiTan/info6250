
import{
    fetchLogin,
    fetchLogout,
    fetchAddChat,
} from './services';
import {
    waitOnChats,
    login,
    logout,
    addChat,
    setChats,
    setError
} from './state'
import {render} from './render';
export function addAbilityToLogin({ state,  appEl }) {
    // Using 'submit' so we can get both submit via button-click and by "enter"
    appEl.addEventListener('submit', (e) => {
      e.preventDefault();
      if(!e.target.classList.contains('login__form')) {
        return;
      }
      const username = appEl.querySelector('.login__username').value;
      waitOnChats();
      render({ state, appEl }); // show loading state
      fetchLogin( username )
      .then( chats => {
        login(username);
        setChats(chats.messageLists, chats.senderLists);
        render({ state, appEl });
      })
      .catch( err => {
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
        render({ state, appEl });
      });
    });
  }

  export function addAbilityToLogout({ state, appEl }) {
    appEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('controls__logout')) {
        return;
      }
      logout();
      render({ state, appEl });
      fetchLogout()
      .catch( err => {
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
        render({ state, appEl });
      });
    });
  }


  export function addAbilityToAddChat({ state, appEl }) {
    appEl.addEventListener('submit', (e) => {
      if(!e.target.classList.contains('add__form')) {
        return;
      }
      const text = appEl.querySelector('.add__chat').value;
      // Here I elect not show a waiting status...what impact could that have?
      fetchAddChat(text)
      .then( chat => {
        // Notice we get the id of the new todo from the returned todo
        addChat({ id: chat.message.id, chat: chat.message, name: chat.sender.sender, sender: chat.sender});
        render({ state, appEl });
      })
      .catch( err => {
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
        render({ state, appEl });
      });
    });
  }

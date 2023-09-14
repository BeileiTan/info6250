import { MESSAGES } from './constants';

const state = {
    // We store these as an object because we will access by id
    chats: {},
    senders: {},
    isLoggedIn: false,
    isLoginPending: true, // We start with our login status unknown
    isChatPending: false,
    username: '',
    lastAddedChatId: '',
    error: '',
  };

  export function waitOnLogin() {
    state.isLoggedIn = false;
    state.isLoginPending = true;
    state.username = '';
    state.chats = {};
    state.senders = {};
    state.error = '';
  }


  export function login(username) {
    state.isLoggedIn = true;
    state.isLoginPending = false;
    state.username = username;
    state.error = '';
    state.lastAddedChatId = '';
  }

  export function logout() {
    state.isLoggedIn = false;
    state.isLoginPending = false;
    state.username = '';
    state.chats = {};
    state.senders = {};
    state.error = '';
  }

  export function waitOnChats() {
    state.chats = {};
    state.senders = {};
    state.isChatPending = true;
    state.error = '';
  }

  export function setChats(chats, senders) {
    state.chats = chats;
    state.senders = senders;
    state.isChatPending = false;
    state.error = '';
    state.lastAddedChatId = '';
  }

  export function setError(error) {
    console.log(error);
    if(!error) {
      state.error = '';
      return;
    }
    state.error = MESSAGES[error] || MESSAGES.default;
  }

  export function addChat({ id, chat, name, sender}) {
    state.chats[id] = chat;
    state.senders[name] = sender;
    state.lastAddedChatId = id;
    state.error = '';
  }
  
export default state;
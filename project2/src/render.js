export function render({state, appEl}){
    const html = `
    <main class="">
        ${ generateStatusHtml( state ) }
        <div id="chat-app">
          <div id="login">
          ${generateLoginHtml( state ) }
          </div>
        ${ generateContentHtml( state ) }
        </div>
    </main>
    `;
  appEl.innerHTML = html;
}

function generateStatusHtml( state ) {
    return `
        <div class="status">${state.error}</div>
    `;
  }
  
  function generateLoginHtml( state ) {
    if(state.isLoginPending) {
      return `
        <div class="login__waiting">Loading user...</div>
      `
    }
    if(state.isLoggedIn) {
      return ``;
    }
    return `
        <div id="title">Login Page! Welcome to chat room</div>
        <form class="login__form" action="#/login">
          <label>
            <span>Username:</span>
            <input class="login__username" value="">
          </label>
          <button class="login__button" type="submit">Login</button>
        </form>
    `;
  }

  function generateContentHtml( state ) {
    if(!state.isLoggedIn) {
      return ``;
    }
    if(state.isChatPending) {
      return `
        <div class="content">
          ${generateControlsHtml( state )}
          <div class="todos__waiting">Loading Chats...</div>
        </div>
      `;
    }
    return `
        <div class="content">
          ${generateControlsHtml(state)}
          <div class="user-list">
            <div class="">This is currently users: </div> 
          ${getUserList(state)}
            <div class="">This is previously message lists: </div> 
          ${getMessageList(state)}
          </div>
          ${getAddChatHtml(state)}
        </div>
    `;
  }

  function generateControlsHtml(state) {
    return `
          <div class="controls">
            <button class="controls__logout">Logout</button>
          </div>
    `;
  }

  function getUserList(state){
    return `<ul class="users">` + 
    Object.values(state.senders).map( sender => `
      <li>
        <div class="user">
          <span class="username">${sender.sender}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  }

  function getMessageList(state){
    return `<ol class="users">` + 
    Object.values(state.chats).map( chat => `
     <li class="message-text">
      <div class="message">
            <p class="message-text">${chat.sender}: ${chat.text}</p>
      </div>
    `).join('') +
    `</ol>`;
  }

  function getAddChatHtml(state){
    return `
    <!doctype html>
      <html>
        <head>
          <title></title>
        </head>
        <body>
          <div class="outgoing">
            <form class="add__form" action="#/add">
            <input class="add__chat" value="" name="text" placeholder="Enter message to send"/>
            <button type="submit" class="add__button">Send</button>
            </form>
          </div>
        </body>
      </html>
    `;
  }

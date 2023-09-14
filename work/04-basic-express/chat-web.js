const chatWeb = {
  chatPage: function(chat) {
    // Fill in/modify anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="styles.css">
        </head>
        <body>
          <div id="chat-app">
           <h1> This is a chat from <span>Bob to Amit!</span></h1>
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
      // Fill in
      // Generate the HTML for the list of messages
      chat.messages.map( m => `
      <li class="message-text">
        <div class="message">
              <p class="message-text">${m.sender}: ${m.text}</p>
        </div>
      </li>
      `).join('') +
      `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` + 
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    // Fill in
    // Generate the HTML for a form to send a message
    return `
    <!doctype html>
      <html>
        <head>
          <title></title>
        </head>
        <body>
          <div class="outgoing">
            <form action="/chat" method="post">
            <input type="hidden" name="sender" value="Bob"/> 
            <div class="sender"> Bob: </div> 
            <input value="" name="text" placeholder="Enter message to send"/>
            <button type="submit">Send</button>
            </form>
          </div>
        </body>
      </html>
    `;
  },
};
module.exports = chatWeb;

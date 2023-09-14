export function renderMessage({state, updatesElement}){
    const html = `
        ${ generateContentMessageHtml( state ) }
    `;
    updatesElement.innerHTML = html;
  } 

  

function generateContentMessageHtml(state){
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
        <div class="">This is currently users: </div>  
        ${getUserList(state)}
        <div class="">This is previously message lists: </div> 
        ${getMessageList(state)}
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

import { PAGES } from './state.js';
function render(state, rootEl, storedWord, username, error){
     if(state.page === PAGES.WORD){
        const htmlWord = generateDataHtml(storedWord, username);
        rootEl.innerHTML = htmlWord;
        return;
     }
     if(state.page === PAGES.LOGIN){
        const htmlLogin = generateLogin();
        rootEl.innerHTML = htmlLogin;
        return;
     }
     if(state.page === PAGES.Error){
        const htmlError = generateError(error);
        rootEl.innerHTML = htmlError;
        return;
     }
}

function generateDataHtml(storedWord, username){
    const htmlWord = `
    <form>
        <div class="img-container">
            <img src="/home.png" alt="Avatar" class="avatar">
        </div>
        <h2 class="store-word">Store word for this user: <span> ${username} </span></h2>
        <div class="word"> 
        ${storedWord}  
        </div>
        <div class="container">
            <label for="word">Change the stored word: </label>
            <input type="text" id="word" name="word" value="" required>
        </div>
        <button type="submit" class="word-submit">Submit</button>
     </form>
     <form>
     <button type="submit" class="logout-btn" data-target="login">Logout</button>
     </form>
    `;
    return htmlWord;
} 


function generateLogin(){
    const htmlLogin = `
    <div class="login-form">
        <h1> Login Page</h1>
        <form>
            <div class="img-container">
                <img src="/login.png" alt="Avatar" class="avatar">
            </div>
            <div class="container">
                <label for="username">Username: </label>
                <input type="text" id="username" name="username" value="">
            </div>
            <button type="submit" class="login_load" data-target="word">Login</button>
        </form>
    </div>    
    `;
    return htmlLogin;
}


function generateError(error){
    const htmlError = `
    <div class="login-form">
    <h1> Login Page</h1>
    <form>
        <div class="img-container">
            <img src="/login.png" alt="Avatar" class="avatar">
        </div>
        <p>This is error message: ${error}</p>
        <div class="container">
            <label for="username">Username: </label>
            <input type="text" id="username" name="username" value="">
        </div>
        <button type="submit" class="login_load" data-target="word">Login</button>
    </form>
</div>    
`;
    return htmlError;
}


export default render;
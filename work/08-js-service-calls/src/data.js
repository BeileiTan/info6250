import { fetchGet, fetchLogin, fetchUpdate, fetchGetWord, fetchDelete } from './services';
import { PAGES, state } from './state';
import render from './view';

const rootEl = document.querySelector('.main');

rootEl.addEventListener('click', (e) => {
    if(e.target.classList.contains('login_load')){
        e.preventDefault();
        const inputUsername = document.querySelector('#username');
        const username = inputUsername.value;
        fetchLogin(username)
        .catch(error => {
            console.warn("replace this with actual error reporting", error);
            state.page = PAGES.Error;
            if(error.error === "required-username"){
                const errorMessage = "Invalid username, please try another one that only include letters "
                render(state, rootEl, '', '', errorMessage);
                return;
            }else{
                const errorMessage = "You got a wrong password, please try again "
                render(state, rootEl, '', '', errorMessage);
                return;
            }
        })
        .then(fetchGet())
        .then(data => {
            if(data.username){
                fetchGetWord()
                .then(users => {
                    state.page = e.target.dataset.target;
                    render(state, rootEl, users.storedWord, users.username);
                })
            }
        })
    }
    if(e.target.classList.contains('word-submit')){
        e.preventDefault();
        const inputWord = document.querySelector('#word');
        const word = inputWord.value;
        fetchUpdate(word)
        fetchGetWord()
        .then( users => {
            render(state, rootEl, users.storedWord, users.username);
        })
        .catch( error => {
            console.warn("replace this with actual error reporting", error);
        });
    }
    if(e.target.classList.contains('logout-btn')){
        state.page = e.target.dataset.target;
        fetchDelete();
    }
})



fetchGet()
.then(data => {
    if(data.username){
        fetchGetWord()
        .then(users => {
            state.page = PAGES.WORD;
            render(state, rootEl, users.storedWord, users.username);
        })
        return;
    }
})

render(state, rootEl);

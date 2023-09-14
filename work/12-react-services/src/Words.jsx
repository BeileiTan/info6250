import Loading from './Loading';

import { useState } from 'react';

function Words({
    isContentPending,
    storedWord,
    onUpdateWord,
}){
    const PAGES = {
        PENDING: 'pending',
        WORDS: 'words',
    }

    const [word, setWord] = useState('');

    let page;
    if(isContentPending){
        page = PAGES.PENDING;
    }else{
        page = PAGES.WORDS;
    }

    function onChangeWord(e){
        setWord(e.target.value);
    }

    function onSubmitWord(e){
        e.preventDefault();
        setWord('');
        if(word){
            onUpdateWord(word)
        }
    }

    return (
        <div className="">
            {page === PAGES.PENDING && <Loading className="todos__waiting">Loading Todos...</Loading>}
            {page === PAGES.WORDS && (
                <div className="">
                    <label className="word-label">Change the stored word: </label>
                    <div className="word">
                        {storedWord}  
                    </div>
                    <form action="#/login" onSubmit={onSubmitWord}>
                        <input className="login__username" value={word} onChange={onChangeWord} placeholder="please store a word"/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Words;
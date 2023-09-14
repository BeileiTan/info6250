import { useState } from "react";

function Game({username, onLogout, onWord, isValidword, isCorrectword, word, matchedLetter, firstTime}){
    const [words, setWords] = useState('');

    function handleTestWord(){
        onWord(words)
        setWords("")
    }
    if(firstTime){
        return(
        <div className="game-form">
            <label className='login-label'>Hello {username}! Make a guess</label>
            <form>
                <input
                    placeholder="Please input a 5 letter word:"
                    value={words}
                    onInput={(e) => setWords(e.target.value)}
                />
                <button
                    type="button"
                    onClick={handleTestWord}
                >
                    Submit
                </button>
            </form>
            <button onClick={onLogout}>Logout</button>
        </div>
        );
    }else if(isValidword){
        return(
        <div className="game-form">
            <label className='login-label'>Hello {username}! Make a guess</label>
            <p className='error'>{word} was not a valid word</p>
            <form>
                <input
                    placeholder="Please input a 5 letter word:"
                    value={words}
                    onInput={(e) => setWords(e.target.value)}
                />
                <button
                    type="button"
                    onClick={handleTestWord}
                >
                    Submit
                </button>
            </form>
            <button onClick={onLogout}>Logout</button>
        </div>
        );
    }else if(isCorrectword){
        return(
        <div className="game-form">
             <label className='login-label'>Hello {username}! Make a guess</label>
            <p className="success">{word} is the secret word!</p>
            <form>
                <input
                    placeholder="Please input a 5 letter word:"
                    value={words}
                    onInput={(e) => setWords(e.target.value)}
                />
                <button
                    type="button"
                    onClick={handleTestWord}
                >
                    Submit
                </button>
            </form>
            <button onClick={onLogout}>Logout</button>
        </div>
        );
    }else{
        return (
        <div className="game-form">
                 <label className='login-label'>Hello {username}! Make a guess</label>
                <p className="matched">{word} had {matchedLetter} letters in common</p>
                <form>
                    <input
                        placeholder="Please input a 5 letter word:"
                        value={words}
                        onInput={(e) => setWords(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={handleTestWord}
                    >
                        Submit
                    </button>
                </form>
                <button onClick={onLogout}>Logout</button>
            </div>
        );
    }
}

export default Game;
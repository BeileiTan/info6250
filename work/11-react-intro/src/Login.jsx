import { useState } from 'react';

function Login({ onLogin, isValidname, isValidpassword}){
    const [username, setUsername] = useState('');

    function handleButtonClick(){
        onLogin(username);
        setUsername('');
    }
    if(isValidname){
        return (
            <div className='login-form'>
                <div className='login'>
                    <label className='login-label'>Login Form</label>
                    <form>
                        <p className='error'>The username is not made up of valid characters</p>
                        <label>
                            <input 
                                placeholder="Username"
                                value={username}
                                onInput={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <button
                            type="button"
                            onClick={handleButtonClick}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }else if(isValidpassword){
        return (
            <div className='login-form'>
                <div className='login'>
                    <label className='login-label'>Login Form</label>
                    <form>
                        <p className='error'>The username is not a valid user</p>
                        <label>
                            <input 
                                placeholder="Username"
                                value={username}
                                onInput={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <button
                            type="button"
                            onClick={handleButtonClick}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }else{
        return (
            <div className='login-form'>
                <div className='login'>
                    <label className='login-label'>Login Form</label>
                <form>
                    <label>
                        <input 
                            placeholder="Username"
                            value={username}
                            onInput={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <button
                        type="button"
                        onClick={handleButtonClick}
                    >
                        Login
                    </button>
                </form>
                </div>
            </div>
        );
    }
}



export default Login;
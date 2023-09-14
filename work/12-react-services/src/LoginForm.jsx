import { useState }  from 'react'


function LoginForm({onLogin}){
    const [username, setUsername] = useState('');

    function onChange(e){
        setUsername(e.target.value);
    }

    function onSubmit(e){
        e.preventDefault();
        if(username){ // Don't allow blank username to try login
            onLogin(username);
        }
    }

    return (
        <div className='login-form'>
            <div className='login'>
                <label className='login-label'>Login Form</label>
                <form action="#/login" onSubmit={onSubmit}>
                    <label>
                        <input 
                            placeholder="Username"
                            value={username}
                            onChange={onChange}
                        />
                    </label>
                    <button
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );

}

export default LoginForm;
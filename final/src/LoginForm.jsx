import { useState } from 'react';

// The "onLogin" below is not an automatic event
// such events only happen on JSX representing native HTML elements
// Here it just a prop name like any other
function LoginForm({ onLogin, toggleAuth }) {
  // This state is local to this component
  // it is used only inside this component
  // until login is complete
  // when we call the passed action function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function onSubmitLogin(e) {
    e.preventDefault(); 
    if(email && password) { 
      onLogin(email, password);
    }
  }
 
  return (
    <div className="login">
      <h1>Login</h1>
        <form className="login__form" action="#/login" onSubmit={onSubmitLogin}>
          <div className='txt_field'>
              <input className="login__email" value={email} onChange={onChangeEmail} required/>
              <span></span>
              <label>Email:</label>
          </div>
          <div className='txt_field'>
              <input className="login__password" value={password} onChange={onChangePassword} required/>
              <span></span>
              <label>Password:</label>
          </div>
          <button className="login__button" type="submit">Login</button>
          <div className='signup'>
            Not a member? <button onClick={toggleAuth} className='sign_button'>Sign up</button>
          </div>
        </form>
    </div>
  );
}

export default LoginForm;

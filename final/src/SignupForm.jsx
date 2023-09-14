import { useState } from 'react';

// The "onLogin" below is not an automatic event
// such events only happen on JSX representing native HTML elements
// Here it just a prop name like any other
function SignupForm({ onSignup, toggleAuth }) {
  // This state is local to this component
  // it is used only inside this component
  // until login is complete
  // when we call the passed action function
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function onChangeName(e) {
    setName(e.target.value);
  }

  function onSubmitSignup(e) {
    e.preventDefault(); 
    if(email) { 
      onSignup(name, email, password);
    }
  }

  return (
    <div className="login">
      <h1>Sign up</h1>
        <form className="login_form" action="#/signup" onSubmit={onSubmitSignup}>
            <div className='txt_field'>
                <input className="login__email" value={email} onChange={onChangeEmail} required/>
                <span></span>
                <label>Email:</label>
            </div>
            <div className='txt_field'>
                <input className="login__email" value={name} onChange={onChangeName} required/>
                <span></span>
                <label>Username:</label>
            </div>
            <div className='txt_field'>
                <input className="login__password" value={password} onChange={onChangePassword} required/>
                <span></span>
                <label>Password:</label>
            </div>
            <button className="login__button" type="submit">Register</button>
            <div className='signup'>
              <button onClick={toggleAuth} type="submit" className='sign_button'>Back to login</button>
            </div>
        </form>
    </div>
  );
}

export default SignupForm;
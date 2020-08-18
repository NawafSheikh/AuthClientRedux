import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginAsync,
  login2Async
} from './authorizationSlice';

function Login () {
  const loggedIn = useSelector(state => state.authorization.loggedIn);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if(loggedIn === true)
  {
    return <Redirect to="/"/>
  }
  else{
    return (
      <div>
        <h1>
          Login
        </h1>
            <label>
              <input placeholder="Username" type="text" name="name" onChange={e => setName(e.target.value)} />
            </label>
            <br/>
            <label>
              <input placeholder="Password" type="text" name="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <br/>
            <button onClick={e => dispatch(loginAsync(name, password))}>
              Login
            </button>
            <button onClick={e => dispatch(login2Async())}>
              Login Fb
            </button>
            <br/>
            <Link to="/Create" style={{fontSize:15}}>
              Create new account
            </Link>
        </div>
  );
  }
}

export default Login;

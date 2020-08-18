import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  createAsync
} from './authorizationSlice';

function Create () {
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
          Create Account
        </h1>
          <label>
            <input placeholder="Username" type="text" name="name" onChange={e => setName(e.target.value)} />
          </label>
          <br/>
          <label>
            <input placeholder="Password" type="text" name="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <br/>
          <br/>
          <button onClick={e => dispatch(createAsync(name, password))}>
            SignUp
          </button>
      </div>
  );
  }
}

export default Create;

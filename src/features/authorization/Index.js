import React from 'react'
import Home from './Home'
import Login from './Login'
import Create from './Create'
import { useSelector, useDispatch } from 'react-redux';
import {
  checkAsync
} from './authorizationSlice';
import {
  BrowserRouter as Router,
  Route,
  Switch, Redirect
} from 'react-router-dom';

function AuthIndex (){
  const loggedIn = useSelector(state => state.authorization.loggedIn);
  const dispatch = useDispatch();
  console.log(loggedIn)
  if(loggedIn == null)
  {
    dispatch(checkAsync())
    return(<p>Loading........</p>)
  }
  else{
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path = '/' component={Home}>
            {loggedIn ? <Home/>: <Redirect to='/login'/>}
            </Route>
            <Route exact path = '/login'>
            {loggedIn ? <Redirect to='/'/>: <Login/>}
            </Route>
            <Route exact path = '/Create' component={Create}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default AuthIndex;

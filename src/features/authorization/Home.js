import React from 'react';
import Counter from '../counter/Counter'
import { useSelector, useDispatch } from 'react-redux';
import {
  infoAsync
} from './authorizationSlice';

function Home (){
  const name = useSelector(state => state.authorization.name);
  const dispatch = useDispatch();
  if(name == null)
  {
    dispatch(infoAsync())
  }
  return (<div>
    <h1>Hello {name}</h1>
    <br />
    <Counter />
  </div>
)}

export default Home;

import React from 'react';
import Counter from '../counter/Counter'
import { useSelector, useDispatch } from 'react-redux';
import {
  infoAsync,
  selectName
} from './authorizationSlice';

function Home (){
  const name = useSelector(selectName);
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

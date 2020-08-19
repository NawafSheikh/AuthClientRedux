import React from 'react';
import Data from '../data/data'
import { useSelector, useDispatch } from 'react-redux';
import {
  infoAsync
} from './authorizationSlice';
import {
  fetchDataAsync
} from '../data/dataSlice';

function Home (){
  const name = useSelector(state => state.authorization.name);
  const lst = useSelector(state => state.data.lst);
  const dispatch = useDispatch();

  if(name == null)
  {
    dispatch(infoAsync())
  }
  if(lst == null)
  {
    dispatch(fetchDataAsync())
    return <p>Loading Data........</p>
  }
  return (<div>
      <h1>{name} Data</h1>
      <br />
      <Data />
    </div>
    )
}

export default Home;

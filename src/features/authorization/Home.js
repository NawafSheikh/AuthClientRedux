import React from 'react';
import Data from '../data/data'
import { useSelector, useDispatch } from 'react-redux';
import {
  infoAsync
} from './authorizationSlice';
import {
  fetchDataAsync
} from '../data/dataSlice';
import { Layout } from 'antd';

const { Footer, Content } = Layout;

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
  return (
    <div>
      <Content><Data /></Content>
      <Footer style={{textAlign:"center"}}>Simple Data App</Footer>
    </div>
  )
}

export default Home;

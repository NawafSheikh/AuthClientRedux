import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {
  createAsync
} from './authorizationSlice';
import { Button, Col, Input, Layout, Row } from 'antd';
const { Header} = Layout;

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
      <div style={{textAlign:"center"}}>
        <Row sgutter={[16, 16]}>
          <Col span={6} offset={9}>
          <Header style={{backgroundColor:"#F0F2F5", fontSize:30}}>Account</Header>
          <Input placeholder="Username" type="text" name="name" onChange={e => setName(e.target.value)}/>
        <Input.Password
          placeholder="input password"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          onChange={e => setPassword(e.target.value)}
        />
          <Button type="primary" onClick={e => dispatch(createAsync(name, password))}>
            Signup
          </Button>
          </Col>
        </Row>
      </div>
  );
  }
}

export default Create;

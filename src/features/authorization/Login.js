import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {
  loginAsync,
  login2Async
} from './authorizationSlice';
import { Button, Input, Space, Row, Col, Layout } from 'antd';
const { Header} = Layout;

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
      <div style={{textAlign:"center"}}>
        <Row sgutter={[16, 16]}>
          <Col span={6} offset={9}>
          <Header style={{backgroundColor:"#F0F2F5", fontSize:30}}>Login</Header>
          <Input placeholder="Username" type="text" name="name" onChange={e => setName(e.target.value)}/>
        <Input.Password
          placeholder="input password"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          onChange={e => setPassword(e.target.value)}
        />
        <Space size={10}>
          <Button type="primary" onClick={e => dispatch(loginAsync(name, password))}>
            Login
          </Button>
          <Button type="default" onClick={e => dispatch(login2Async())}>
            Login Fb
          </Button>
        </Space>
        <br/>
        <Link to="/Create" style={{fontSize:15}}>
          Create new account
        </Link>
          </Col>
        </Row>
      </div>
  );
  }
}

export default Login;

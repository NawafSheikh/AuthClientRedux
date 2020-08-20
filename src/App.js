import React from 'react';
import AuthIndex from "./features/authorization/Index"
import { Col, Layout, Row } from 'antd';
import { useSelector} from 'react-redux';
import {UserOutlined
} from '@ant-design/icons';
const { Header} = Layout;

function User() {
  const name = useSelector(state => state.authorization.name);
  if(name !== null)
  {
    return(
      <div>
        <UserOutlined /> {name}
      </div>
    )
  }
  else
  {
    return(<div></div>)
  }
}

function App() {
  return (
    <div className="App">
      <Header style={{color:"white"}}>
        <Row>
          <Col span={12}>Data App</Col>
          <Col span={12} style={{textAlign:"right"}}>
            <User />
          </Col>
        </Row>
      </Header>
        <AuthIndex />
    </div>
  );
}

export default App;

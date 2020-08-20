import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { Layout } from 'antd';

ReactDOM.render(
    <Provider store={store}>
      <Layout>
        <App />
      </Layout>
    </Provider>,
  document.getElementById('root')
);

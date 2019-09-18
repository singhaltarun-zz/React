import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout, Menu } from 'antd';
import Job from './components/MunimJi/Job';
import { Tabs } from 'antd';
import BatonRegistry from './Baton';
import Munimji from './Munimji';

const { TabPane } = Tabs;
const { Header } = Layout;

class App extends React.Component {

  render() {
    
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Header className="header" >
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">Mindtickle</Menu.Item>
          </Menu>
        </Header>
        <Tabs defaultActiveKey="1" style={{ height: '100%', width: '100%'  }}>
          
          <TabPane tab="MunimJI" key="1" style={{ height: '99%', width: '100%'  }} >
            <Munimji />
          </TabPane>
          <TabPane tab="Baton Registry" key="2" style={{ height: '99%', width: '100%'  }} >
            <BatonRegistry />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
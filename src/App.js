import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout, Menu } from 'antd';
import Baton from './Baton';
import Job from './Job';
import { Tabs } from 'antd';

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
          <TabPane tab="Baton Registry" key="1" style={{ height: '99%', width: '100%'  }} >
            <Baton />
          </TabPane>
          <TabPane tab="MinimG" key="2">
            <Job />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
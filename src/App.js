import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import { Spinner } from 'reactstrap';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress, Button } from 'antd';
import { Steps } from 'antd';
import { Input, InputNumber, Popconfirm, Form } from 'antd';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { Table, Divider, Tag } from 'antd';

import TenantCreateForm from './components/tenant/CreateTenant'
import ListTenant from './components/tenant/ListTenant'
import TenantDeleteForm from './components/tenant/DeleteTenant';
import TenantUpdateForm from './components/tenant/UpdateTenant';


import ListResource from './components/resource/ListResource';
import ResourceCreateForm from './components/resource/CreateResource';
import ResourceDeleteForm from './components/resource/DeleteResource';
import ResourceUpdateForm from './components/resource/UpdateResource';
import ListProcessor from './components/Processor/ListProcessor';
import ListSubscription from './components/subscription/ListSubscription';

const { Step } = Steps;
const ButtonGroup = Button.Group;
const CreateTenant = Form.create({ name: 'advanced_search' })(TenantCreateForm);
const DeleteTenant = Form.create({ name: 'advanced_search' })(TenantDeleteForm);
const UpdateTenant = Form.create({ name: 'advanced_search' })(TenantUpdateForm);
const CreateResource = Form.create({ name: 'advanced_search' })(ResourceCreateForm);
const DeleteResource = Form.create({ name: 'advanced_search' })(ResourceDeleteForm);
const UpdateResource = Form.create({ name: 'advanced_search' })(ResourceUpdateForm);

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  state = {
    status : 0,
    displayStatus : 0,
    resource : 0
  }
  
  TenantListHandler() {
    this.setState({
      displayStatus : 1,
      status : 0
    })
  }

  TenantCreateHandler() {
    this.setState({
      status : 1,
    })
  }

  TenantDeleteHandler() {
    this.setState({
      status : 2,
    })
  }

  TenantUpdateHandler() {
    this.setState({
      status : 3,
    })
  }

  ResourceListHandler() {
    this.setState({
      displayStatus:2,
      status : 0
    })
  }
  ResourceCreateHandler(){
    this.setState({
      status : 4
    })
  }

  ResourceDeleteHandler(){
    this.setState({
      status : 5
    })
  }

  ResourceUpdateHandler() {
    this.setState({
      status : 6
    })
  }

  ProcessorListHandler(){
    this.setState({
      displayStatus : 3
    })
  }
  SubscriptionListHandler(){
    this.setState({
      displayStatus : 4
    })
  }
  render() {
    return (
    <Layout style={{ height: '100%', width:'100%'}}>
    <Header className="header" >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">Mindtickle</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Baton Registry</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: '24px 0', background: '#fff' ,height:'100%' ,width:'100%'}} >
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            style={{ height: '100%' ,width:'100%'}}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  Tenant
                </span>
              }
              onTitleClick={this.TenantListHandler.bind(this)}
            >
              {/* <Menu.Item key="1" onClick={this.TenantCreateHandler.bind(this)}>Create</Menu.Item>
              <Menu.Item key="2" onClick={this.TenantDeleteHandler.bind(this)}>Delete</Menu.Item>
              <Menu.Item key="3"onClick={this.TenantUpdateHandler.bind(this)}>Update</Menu.Item> */}
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  Resource
                </span>
              }
              onTitleClick={this.ResourceListHandler.bind(this)}
            >
              {/* <Menu.Item key="1" onClick={this.ResourceCreateHandler.bind(this)} >Create</Menu.Item>
              <Menu.Item key="2" onClick={this.ResourceDeleteHandler.bind(this)}>Delete</Menu.Item>
              <Menu.Item key="3" onClick={this.ResourceUpdateHandler.bind(this)}>Update</Menu.Item> */}
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="notification" />
                  subscription
                </span>
              }
              onTitleClick={this.SubscriptionListHandler.bind(this)}
            >
              {/* <Menu.Item key="1">List</Menu.Item>
              <Menu.Item key="2">Create</Menu.Item>
              <Menu.Item key="3">Delete</Menu.Item>
              <Menu.Item key="4">Update</Menu.Item> */}
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="user" />
                  Processor
                </span>
              }
              onTitleClick={this.ProcessorListHandler.bind(this)}
            >
              {/* <Menu.Item key="1">List</Menu.Item>
              <Menu.Item key="2">Create</Menu.Item>
              <Menu.Item key="3" >Delete</Menu.Item>
              <Menu.Item key="4">Update</Menu.Item> */}
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {this.state.displayStatus===1  && <ListTenant/>}
          {/* {(this.state.status===1) && (this.state.displayStatus === 1) && <CreateTenant/>}
          {((this.state.status===2) && (this.state.displayStatus === 1) ) &&  <DeleteTenant/>}
          {((this.state.status===3) && (this.state.displayStatus === 1) ) &&  <UpdateTenant/>} */}
          {(this.state.displayStatus == 2 ) &&  <ListResource/>}
          {/* {(this.state.status===4 && this.state.displayStatus==2) &&  <CreateResource/>}
          {(this.state.status===5 && this.state.displayStatus==2) &&  <DeleteResource/>}
          {(this.state.status===6 && this.state.displayStatus==2) &&  <UpdateResource/>} */}
          {this.state.displayStatus===3  && <ListProcessor/>}
          {this.state.displayStatus===4  && <ListSubscription/>}
        </Content>
      </Layout>
    </Content>
  </Layout>
    );
  }
}

export default App;
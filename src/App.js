import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import { Spinner } from 'reactstrap';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress, Button } from 'antd';
import { Steps } from 'antd';
import JsonClass from './components/Json'
import { Input, InputNumber, Popconfirm, Form } from 'antd';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import EditableTable from './Editable';
import Demo from './testedit';
import AdvancedSearchForm from './components/testTable'
import ListTenant from './components/listTenant'
import ListResource from './components/listResource'
import TenantDeleteForm from './components/deleteTenant';
import TenantUpdateForm from './components/updateTenant';
import ProgressClass from './components/Progress.js';
import Query from './components/Query';
import { Table, Divider, Tag } from 'antd';
import TenantTable from './components/TenantTable';
import SubscriberTable from './components/Subscription';
import EventSubscriberTable from './components/EventSubscriptionTable';
import ResourceTable from './components/ResourceTable';
import ProcessorTable from './components/ProcessorTable';
import ListProcessor from './components/listProcessor';
import CreateResource from './components/CreateResource';

const { Step } = Steps;
const ButtonGroup = Button.Group;
const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
const WrappedAdvancedSearchForm2 = Form.create({ name: 'advanced_search' })(TenantDeleteForm);
const WrappedAdvancedSearchForm3 = Form.create({ name: 'advanced_search' })(TenantUpdateForm);
const CreateResourceForm = Form.create({ name: 'advanced_search' })(CreateResource);

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const axios = require('axios')
const EditableFormTable = Form.create()(EditableTable);

class App extends React.Component {
  state = {
    status : 0,
    displayStatus : 1,
    resource : 0
  }
  
  TenantListHandler() {
    this.setState({
      status : 1,
      displayStatus : 0
    })
  }

  TenantCreateHandler() {
    this.setState({
      status : 2,
      displayStatus : 1
    })
  }

  TenantDeleteHandler() {
    this.setState({
      status : 3,
      displayStatus : 1
    })
  }

  TenantUpdateHandler() {
    this.setState({
      status : 4,
      displayStatus : 1
    })
  }

  ResourceListHandler() {
    this.setState({
      status : 5,
      displayStatus:0
    })
  }
  ResourceCreateHandler(){
    this.setState({
      displayStatus : 0,
      state : 5,
      resource : 1
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
            >
              <Menu.Item key="1" onClick={this.TenantListHandler.bind(this)}>List </Menu.Item>
              <Menu.Item key="2" onClick={this.TenantCreateHandler.bind(this)}>Create</Menu.Item>
              <Menu.Item key="3" onClick={this.TenantDeleteHandler.bind(this)}>Delete</Menu.Item>
              <Menu.Item key="4"onClick={this.TenantUpdateHandler.bind(this)}>Update</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  Resource
                </span>
              }
            >
              <Menu.Item key="1" onClick={this.ResourceListHandler.bind(this)}>List</Menu.Item>
              <Menu.Item key="2" onClick={this.ResourceCreateHandler.bind(this)} >Create</Menu.Item>
              <Menu.Item key="3">Delete</Menu.Item>
              <Menu.Item key="4">Update</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="notification" />
                  subscription
                </span>
              }
            >
              <Menu.Item key="1">List</Menu.Item>
              <Menu.Item key="2">Create</Menu.Item>
              <Menu.Item key="3">Delete</Menu.Item>
              <Menu.Item key="4">Update</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="user" />
                  Processor
                </span>
              }
            >
              <Menu.Item key="1">List</Menu.Item>
              <Menu.Item key="2">Create</Menu.Item>
              <Menu.Item key="3" >Delete</Menu.Item>
              <Menu.Item key="4">Update</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {((this.state.displayStatus===1 && (this.state.status)) || this.state.status===1) && <ListProcessor/>}
          {(this.state.status===2) && (this.state.displayStatus === 1) && <WrappedAdvancedSearchForm/>}
          {((this.state.status===3) && (this.state.displayStatus === 1) ) &&  <WrappedAdvancedSearchForm2/>}
          {((this.state.status===4) && (this.state.displayStatus === 1) ) &&  <WrappedAdvancedSearchForm3/>}
          {(this.state.status===5 ) &&  <ListResource/>}
          {(this.state.status===5 && this.state.resource===1) &&  <CreateResourceForm/>}
        </Content>
      </Layout>
    </Content>
  </Layout>
    );
  }
}

export default App;
import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout, Menu, Breadcrumb, Icon} from 'antd';


import ListTenant from './components/tenant/ListTenant'
import ListResource from './components/resource/ListResource';
import ListProcessor from './components/Processor/ListProcessor';
import ListSubscription from './components/subscription/ListSubscription';


const { SubMenu } = Menu;
const { Content, Sider } = Layout;
class Baton extends React.Component {
    state = {
        status: 0,
        displayStatus: 0,
        resource: 0
    }

    TenantListHandler() {
        this.setState({
            displayStatus: 1,
            status: 0
        })
    }

    TenantCreateHandler() {
        this.setState({
            status: 1,
        })
    }

    TenantDeleteHandler() {
        this.setState({
            status: 2,
        })
    }

    TenantUpdateHandler() {
        this.setState({
            status: 3,
        })
    }

    ResourceListHandler() {
        this.setState({
            displayStatus: 2,
            status: 0
        })
    }
    ResourceCreateHandler() {
        this.setState({
            status: 4
        })
    }

    ResourceDeleteHandler() {
        this.setState({
            status: 5
        })
    }

    ResourceUpdateHandler() {
        this.setState({
            status: 6
        })
    }

    ProcessorListHandler() {
        this.setState({
            displayStatus: 3
        })
    }
    SubscriptionListHandler() {
        this.setState({
            displayStatus: 4
        })
    }
    render() {
        return (
            <Layout style={{ height: '100%', width: '100%' }}>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Baton Registry</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{ padding: '24px 0', background: '#fff', height: '100%', width: '100%' }} >
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                style={{ height: '100%', width: '100%' }}
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
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            {this.state.displayStatus === 1 && <ListTenant />}
                            {(this.state.displayStatus === 2) && <ListResource />}
                            {this.state.displayStatus === 3 && <ListProcessor />}
                            {this.state.displayStatus === 4 && <ListSubscription />}
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        );
    }
}

export default Baton;
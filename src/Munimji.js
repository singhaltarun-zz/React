import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout, Menu, Breadcrumb, Icon} from 'antd';


import Jobs from './components/MunimJi/Job';
import Worker from './components/MunimJi/Worker'
import Offset from './components/MunimJi/Offset'
import { Form } from 'antd';
import Stat from './components/MunimJi/Stat';


const { SubMenu } = Menu;
const { Content, Sider } = Layout;
class Munimji extends React.Component {
    state = {
        status: 0,
        displayStatus: 0,
        resource: 0
    }

    JobsHandler() {
        this.setState({
            displayStatus: 1,
            status: 0
        })
    }

    WorkerHandler() {
        this.setState({
            displayStatus: 2,
            status: 0
        })
    }

    OffsetHandler() {
        this.setState({
            displayStatus: 3,
            status: 0
        })
    }

    ListWorkerHandler() {
        this.setState({
            displayStatus: 4
        })
    }

    StatsHandler() {
        this.setState({
            displayStatus: 5
        })
    }

    render() {
        return (
            <Layout style={{ height: '100%', width: '100%' }}>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Munimji</Breadcrumb.Item>
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
                                            Jobs
                                        </span>
                                    }
                                    onTitleClick={this.JobsHandler.bind(this)}
                                >
                                    
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                                            <Icon type="laptop" />
                                            Workers
                                        </span>
                                    }
                                    onTitleClick={this.WorkerHandler.bind(this)}
                                >
                                </SubMenu>
                                <SubMenu
                                    key="sub3"
                                    title={
                                        <span>
                                            <Icon type="laptop" />
                                            Offsets
                                        </span>
                                    }
                                    
                                    onTitleClick={this.OffsetHandler.bind(this)}
                                >
                                    
                                </SubMenu>
                                <SubMenu
                                    key="sub4"
                                    title={
                                        <span>
                                            <Icon type="user" />
                                            Stats
                                        </span>
                                    }
                                    onTitleClick={this.StatsHandler.bind(this)}
                                ></SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            {this.state.displayStatus === 1 && <Jobs />}
                            {this.state.displayStatus === 5 && <Stat />}
                            {this.state.displayStatus === 2 && <Worker />}
                            {this.state.displayStatus === 3 && <Offset />}
                            
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        );
    }
}

export default Munimji;
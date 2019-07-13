import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'antd';
import { Input, Form } from 'antd';
import { Layout, Breadcrumb, Icon } from 'antd';
import { Table } from 'antd';
const { Content } = Layout;

class Job extends React.Component {
    state = {
        id: 0,
        data: {}
    }
    columns = [
        {
            title: 'Id',
            width: 200,
            dataIndex: 'id',
            editable: true,

        },
        {
            title: 'Stat_Id',
            width: 200,
            dataIndex: 'stat_id',
            editable: true,
        },
        {
            title: 'Scheduled_At',
            dataIndex: 'scheduled_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Assigned_At',
            dataIndex: 'assigned_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Picked_At',
            dataIndex: 'picked_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Synced_At',
            dataIndex: 'synced_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Started_At',
            dataIndex: 'started_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Completion_at',
            dataIndex: 'completion_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Worker_Id',
            dataIndex: 'worker_id',
            width: 200,
            editable: true,
        },
        {
            title: 'Start_Offset',
            dataIndex: 'start_offset',
            width: 200,
            editable: true,
        },
        {
            title: 'End_Offset',
            width: 200,
            dataIndex: 'end_offset',
            editable: true,

        },
        {
            title: 'Max_Memory',
            width: 200,
            dataIndex: 'max_memory',
            editable: true,
        },
        {
            title: 'Time_Taken',
            dataIndex: 'time_taken',
            width: 200,
            editable: true,
        },
        {
            title: 'Response',
            dataIndex: 'response',
            width: 200,
            editable: true,
        },
        {
            title: 'State',
            dataIndex: 'state',
            width: 200,
            editable: true,
        },
        {
            title: 'Is_active',
            dataIndex: 'is_active',
            width: 200,
            editable: true,
        },
        {
            title: 'RetryCount',
            dataIndex: 'retryCount',
            width: 200,
            editable: true,
        },
        {
            title: 'Created_at',
            dataIndex: 'created_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Updated_at',
            dataIndex: 'updated_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Namespace',
            dataIndex: 'namespace',
            width: 200,
            editable: true,
        },
    ]
    idHandler(event) {
        this.setState({
            id: event.target.value
        })
    }
    handleSubmit() {
        fetch(`http://localhost:3001/Job/`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => this.setState({
            data: data
        }))
        .catch(error => console.log('Error fetching and parsing data', error));
    }
    render() {

        return (
            <Layout style={{ height: '100%', width: '100%' }}>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>MunimG</Breadcrumb.Item>
                    </Breadcrumb>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item style={{ width: '10%' }}>
                            {
                                <Input
                                    prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Id" onChange={this.idHandler.bind(this)}
                                />
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Get Jobs
                            </Button>
                        </Form.Item>
                    </Form>
                    <Table dataSource={this.state.data["jobs"]} columns={this.columns} scroll={{ x: 1500 }} style={{ width: '100%' }} />
                </Content>
            </Layout>
        );
    }
}

export default Job;
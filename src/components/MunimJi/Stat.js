import React from 'react';
import '../../App.js';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'antd';
import { Input, Form } from 'antd';
import { Layout, Breadcrumb, Icon } from 'antd';
import { Table } from 'antd';
import {API_BASE_HOST} from '../../constants.js'
import {API_BASE_PORT} from '../../constants.js'

const { Search } = Input;
const { Content } = Layout;
class Stat extends React.Component {
    state = {
        id: 0,
        data: {},
        result: []
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
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={() => this.unblockJob(record.id)}>UnblockJob</a>
                </span>
            ),
        },
    ]
    idHandler(event) {
        this.setState({
            id: event.target.value
        })
    }
    func(data){
        var result = [];
        result.push(data);
        this.setState(
            {
                result:result
            }
        )
        console.log(result);
        }
    handleSubmit(id) {
        
        console.log(API_BASE_HOST+':'+API_BASE_PORT)
        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Job?id=${encodeURIComponent(id)}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => this.func(data["job"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }

    unblockJob(id){
        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Job/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "job": {
                    "id": id
                }
            })
        })
        .then(response => response.json())
        .then(data => this.func(data["job"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }
    render() {

            return (
                <div>
                    <Search
                    placeholder="Enter JobID"
                    onSearch={value => this.handleSubmit(value)}
                    style={{ width: 200 }}
                    />
                    <Table dataSource={this.state.result} columns={this.columns} scroll={{ x: 1500 }} style={{ width: '100%' }} />
                </div>
    
            );
    }
}

export default Stat;
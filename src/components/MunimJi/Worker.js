import React from 'react';
import '../../App.js';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Form } from 'antd';
import { Table } from 'antd';
import ListWorkersForm from './ListWorkers';
import {API_BASE_HOST} from '../../constants.js'
import {API_BASE_PORT} from '../../constants.js'
const ListWorkers = Form.create({ name: 'advanced_search' })(ListWorkersForm);
const { Search } = Input;


class Worker extends React.Component {
    componentDidMount() {
        this.setState({
            status: 0
        })
    }
    state = {
        id: 0,
        data: {},
        result: [],
        status: 0,
        record: ''
    }

    columns = [
        {
            title: 'Id',
            width: 200,
            dataIndex: 'id',
            editable: true,

        },
        {
            title: 'Hostname',
            width: 200,
            dataIndex: 'hostname',
            editable: true,
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            width: 200,
            editable: true,
        },
        {
            title: 'Port',
            dataIndex: 'port',
            width: 200,
            editable: true,
        },
        {
            title: 'Heartbeat_at',
            dataIndex: 'heartbeat_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Heartbeat_received_at',
            dataIndex: 'heartbeat_received_at',
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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={() => this.FilterWorkerHandler(record)}>Filter Worker</a>
                    
                </span>
            ),
        },
    ]
    
    idHandler(event) {
        this.setState({
            id: event.target.value
        })
    }
    FilterWorkerHandler(record) {
        
        this.setState({
            status: 1,
            id: record.id,
            data:  record}
            ) 
        console.log(this.state.data)    
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
        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Worker?id=${encodeURIComponent(id)}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => this.func(data["worker"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }
  

    render() {
            console.log(this.state.status);
            return (
                <div>
                    <Search
                    placeholder="Enter WorkerId"
                    onSearch={value => this.handleSubmit(value)}
                    style={{ width: 200 }}
                    />
                    <Table dataSource={this.state.result} columns={this.columns} scroll={{ x: 1500 }} style={{ width: '100%' }} />
                    {(this.state.status === 1) && <ListWorkers record={this.state.data} />}
                </div>
    
            );
    }
}

export default Worker;
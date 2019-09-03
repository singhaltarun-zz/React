import React from 'react';
import '../../App.js';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Form } from 'antd';
import { Layout, Breadcrumb, Icon } from 'antd';
import { Table } from 'antd';

const { Search } = Input;

class Offset extends React.Component {
    state = {
        id: 0,
        data: {},
        result: []
    }
    columns = [
        {
            title: 'EventTypeId',
            width: 200,
            dataIndex: 'EventTypeId',
            editable: true,

        },
        {
            title: 'TenantId',
            width: 200,
            dataIndex: 'TenantId',
            editable: true,
        },
        {
            title: 'ProcessorId',
            dataIndex: 'ProcessorId',
            width: 200,
            editable: true,
        },
        {
            title: 'Offset',
            dataIndex: 'offset',
            width: 200,
            editable: true,
        },
        {
            title: 'UpdatedByWorker',
            dataIndex: 'UpdatedByWorker',
            width: 200,
            editable: true,
        },
        {
            title: 'CreatedAt',
            dataIndex: 'CreatedAt',
            width: 200,
            editable: true,
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'UpdatedAt',
            width: 200,
            editable: true,
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
        fetch(`http://localhost:3001/Worker?id=${encodeURIComponent(id)}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => this.func(data["worker"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }


    render() {
            return (
                <div>
                    <Search
                    placeholder="Enter OffsetId"
                    onSearch={value => this.handleSubmit(value)}
                    style={{ width: 200 }}
                    />
                    <Table dataSource={this.state.result} columns={this.columns} scroll={{ x: 1500 }} style={{ width: '100%' }} />
                </div>
            );
    }
}

export default Offset;
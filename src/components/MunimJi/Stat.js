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
        result: [],
        status: 0,
    }
    columns = [
        {
            title: 'Id',
            width: 200,
            dataIndex: 'id',
            editable: true,

        },
        {
            title: 'Tenant_id',
            width: 200,
            dataIndex: 'tenant_id',
            editable: true,
        },
        {
            title: 'Event_type_id',
            dataIndex: 'event_type_id',
            width: 200,
            editable: true,
        },
        {
            title: 'Count',
            dataIndex: 'count',
            width: 200,
            editable: true,
        },
        {
            title: 'Processor_id',
            dataIndex: 'processor_id',
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
            title: 'Processor_version',
            dataIndex: 'processor_version',
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
    func(data){
        var result = [];
        result.push(data);
        this.setState(
            {
                result:result[0]
            }
        )
        }
    handleSubmit(id) {
        id =  id.split(',');
        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Stat/bulkStats`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": id
            })
        })
        .then(response => response.json())
        
       .then(data => this.func(data["stats"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }

    render() {
            return (
                <div>
                    <Search
                    placeholder="Enter Comma seperated Stat ID (e.g. 1,2,3)"
                    onSearch={value => this.handleSubmit(value)}
                    style={{ width: 350 }}
                    />
                    <Table dataSource={this.state.result} columns={this.columns} scroll={{ x: 1500 }} style={{ width: '100%' }} />
                </div>
    
            );
    }
}

export default Stat;
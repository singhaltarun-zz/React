import React, { Component } from 'react';
import { Table, Divider, Icon, Form, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import TenantCreateForm from './CreateTenant';
import TenantUpdateForm from './UpdateTenant';
import {API_BASE_HOST} from '../../../constants.js'
import {API_BASE_PORT} from '../../../constants.js'

const CreateTenant = Form.create({ name: 'advanced_search' })(TenantCreateForm);
const UpdateTenant = Form.create({ name: 'advanced_search' })(TenantUpdateForm);





class ListTenant extends React.Component {
    componentDidMount() {
        this.setState({
            status: 0
        })
    }
    state = {
        id: '',
        org_id: '',
        data: {},
        status: 0,
        plusButton: 1,
        negButton: 0,
        display: 1
    }
    columns = [
        {
            title: 'Id',
            width: 200,
            dataIndex: 'id',
            editable: true,
        },
        {
            title: 'Org_Id',
            width: 200,
            dataIndex: 'org_id',
            editable: true,
        },
        {
            title: 'Created_At',
            dataIndex: 'created_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Updated_At',
            dataIndex: 'updated_at',
            width: 200,
            editable: true,
        },
        {
            title: 'State',
            dataIndex: 'state',
            width: 200,
            editable: true,
        },
    ]
    handleDelete(id) {
        fetch(API_BASE_HOST + ':' + API_BASE_PORT +`/Tenant/`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "identity": {
                    "id": id
                }
            })
        })
        .then(response => response.json())
        .then(data => this.setState({
            display: 1
        }))
        .catch(error => console.log('Error fetching and parsing data', error));
    };
    handleUpdate(id) {
        this.setState({
            id: id,
            status: 2
        })
    }
    createHandler() {
        this.setState({
            status: 1,
            plusButton: 0,
            negButton: 1
        })
    }
    negButtonHandler() {
        this.setState({
            plusButton: 1,
            status: 0,
            negButton: 0
        })
    }
    displayList() {
        this.setState({
            display: 1
        })
    }
    TenantList() {
        fetch(API_BASE_HOST + ':' + API_BASE_PORT +`/Tenant`, {
            method: "get"
        })
        .then(response => response.json())
        .then(data => this.setState({
            data: data,
            display: 0
        }))
        .catch(error => console.log('Error fetching and parsing data', error));
    }
    render() {
        if (this.state.display === 1)
            this.TenantList();
        return (
            <div>
                <Table dataSource={this.state.data["tenants"]} columns={this.columns} scroll={{ x: 1500 }} style={{ width: '100%' }} />
                {(this.state.plusButton === 1) && <Icon type="plus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c' }} onClick={this.createHandler.bind(this)} />}
                {(this.state.negButton === 1) && <Icon type="minus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c' }} onClick={this.negButtonHandler.bind(this)} />}
                {(this.state.status === 1) && <CreateTenant func={this.displayList.bind(this)} />}
                {(this.state.status === 2) && <UpdateTenant id={this.state.id} func={this.displayList.bind(this)} />}
            </div>

        );
    }
}

export default ListTenant;
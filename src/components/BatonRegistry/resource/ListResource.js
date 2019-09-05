import React, { Component } from 'react';
import { Table, Popconfirm, Icon, Divider, Form } from 'antd';
import 'antd/dist/antd.css';
import ResourceCreateForm from './CreateResource';
import ResourceUpdateForm from './UpdateResource';
import {API_BASE_HOST} from '../../../constants.js'
import {API_BASE_PORT} from '../../../constants.js'

const CreateResource = Form.create({ name: 'advanced_search' })(ResourceCreateForm);
const UpdateResource = Form.create({ name: 'advanced_search' })(ResourceUpdateForm);

const FULL_HOST_URL= process.env.BATON_NODE_REST_API_DEPLOY_SERVICE_HOST + ':' + process.env.BATON_NODE_REST_API_DEPLOY_SERVICE_PORT;

class ListResource extends React.Component {
    componentDidMount() {
        this.setState({
            status: 0
        })
    }
    state = {
        data: {},
        status: 0,
        plusButton: 1,
        negButton: 0,
        id: 0,
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
            title: 'Topic_Name',
            width: 200,
            dataIndex: 'topic_name',
            editable: true,
        },
        {
            title: 'Namespace',
            dataIndex: 'namespace',
            width: 200,
            editable: true,
        },
        {
            title: 'Resource_Name',
            dataIndex: 'resource_name',
            width: 200,
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
    ]

    handleDelete(id) {
        fetch(API_BASE_HOST+ ':' + API_BASE_PORT+`/Resource/`, {
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
            status: 2,
            id: id
        })
    }
    ResourceList() {
        fetch(API_BASE_HOST+ ':' + API_BASE_PORT+`/Resource/`, {
            method: "get"
        })
            .then(response => response.json())
            .then(data => this.setState({
                data: data,
                display: 0
            }))
            .catch(error => console.log('Error fetching and parsing data', error));
            
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
    createHandler() {
        this.setState({
            status: 1,
            plusButton: 0,
            negButton: 1
        })
    }
    render() {
        if (this.state.display === 1)
            this.ResourceList();
        return (
            <div>
                <Table dataSource={this.state.data["resources"]} columns={this.columns} scroll={{ x: 1500 }} style={{ width: '100%' }} />
                {(this.state.plusButton === 1) && <Icon type="plus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c' }} onClick={this.createHandler.bind(this)} />}
                {((this.state.negButton === 1) && <Icon type="minus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c' }} onClick={this.negButtonHandler.bind(this)} />)}
                {(this.state.status === 1) && <CreateResource func={this.displayList.bind(this)} />}
                {(this.state.status === 2) && <UpdateResource id={this.state.id} func={this.displayList.bind(this)} />}
            </div>
        );
    }
}

export default ListResource;
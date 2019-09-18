import React, { Component } from 'react';
import { Table, Divider, Icon, Form, Row, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import SubscriptionCreateForm from './CreateSubscription';
import SubscriptionUpdateForm from './UpdateSubscription';
import {API_BASE_HOST} from '../../../constants.js'
import {API_BASE_PORT} from '../../../constants.js'

const CreateSubscription = Form.create({ name: 'advanced_search' })(SubscriptionCreateForm);
const UpdateSubscription = Form.create({ name: 'advanced_search' })(SubscriptionUpdateForm);



class ListSubscription extends React.Component {
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
        display: 1,
        id: 0
    }
    columns = [
        {
            title: 'Id',
            width: 100,
            dataIndex: 'id',
            editable: true,

        },
        {
            title: 'Publisher',
            width: 200,
            dataIndex: 'publisher',
            editable: true,
        },
        {
            title: 'EventResource',
            dataIndex: 'event_resource_id',
            width: 200,
            editable: true,
        },
        {
            title: 'SchemaVersion',
            dataIndex: 'schema_version',
            width: 200,
            editable: true,
        },
        {
            title: 'ProcessorId',
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
            title: 'CreatedAt',
            dataIndex: 'created_at',
            width: 200,
            editable: true,
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updated_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Are you sure？"
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={() => this.handleDelete(record.id)}
                    >
                        <a href="#">Delete</a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={() => this.handleUpdate(record.id)}>Update</a>
                </span>
            ),
        },
    ]
    handleDelete(id) {
        fetch(API_BASE_HOST + ':' + API_BASE_PORT+ `/Subscription/`, {
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
    negButtonHandler() {
        this.setState({
            plusButton: 1,
            status: 0,
            negButton: 0
        })
    }
    createHandler() {
        this.setState({
            status: 1,
            plusButton: 0,
            negButton: 1
        })
    }
    displayList() {
        this.setState({
            display: 1
        })
    }

    SubscriptionList() {
        fetch(API_BASE_HOST +':' + API_BASE_PORT + `/Subscription/`, {
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
            this.SubscriptionList();
        return (
            <div>
                <Table dataSource={this.state.data["subscriptions"]} columns={this.columns} scroll={{ x: 1500 }} style={{ width: '100%' }} />
                {(this.state.plusButton === 1) && <Icon type="plus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c' }} onClick={this.createHandler.bind(this)} />}
                {((this.state.negButton === 1) && <Icon type="minus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c' }} onClick={this.negButtonHandler.bind(this)} />)}
                {(this.state.status === 1) && <CreateSubscription func={this.displayList.bind(this)} />}
                {(this.state.status === 2) && <UpdateSubscription id={this.state.id} func={this.displayList.bind(this)} />}
            </div>

        );
    }
}

export default ListSubscription;
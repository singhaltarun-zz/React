import React, { Component } from 'react';
import { Table, Divider, Icon, Form, Row, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import ProcessorCreateForm from './CreateProcessor';
import ProcessorUpdateForm from './UpdateProcessor';

const CreateProcessor = Form.create({ name: 'advanced_search' })(ProcessorCreateForm);
const UpdateProcessor = Form.create({ name: 'advanced_search' })(ProcessorUpdateForm);

class ListProcessor extends React.Component {
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
            title: 'Name',
            width: 200,
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'Version',
            dataIndex: 'version',
            width: 200,
            editable: true,
        },
        {
            title: 'ConsumerID',
            dataIndex: 'consumer_service_id',
            width: 200,
            editable: true,
        },
        {
            title: 'TimeOut',
            dataIndex: 'timeout',
            width: 200,
            editable: true,
        },
        {
            title: 'Parallelism',
            dataIndex: 'parallelism',
            width: 200,
            editable: true,
        },
        {
            title: 'BatchCount',
            dataIndex: 'batch_count',
            width: 200,
            editable: true,
        },
        {
            title: 'RuntimeLang',
            dataIndex: 'runtime_language',
            width: 200,
            editable: true,
        },
        {
            title: 'SourcePath',
            dataIndex: 'source_path',
            width: 200,
            editable: true,
        },
        {
            title: 'PluginPath',
            dataIndex: 'plugin_path',
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
            title: 'Invocation',
            dataIndex: 'invocation_symbol',
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
            title: 'LocalVersion',
            dataIndex: 'local_version',
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
        fetch(`http://localhost:3001/Processor/`, {
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
            plusButton: 0,
            negButton: 1,
            id: id
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
    ProcessorList() {
        fetch(`http://localhost:3001/Processor`, {
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
            this.ProcessorList();
        return (
            <div>
                <Table dataSource={this.state.data["processors"]} columns={this.columns} scroll={{ x: 1500 }} style={{ width: '100%' }} />
                {(this.state.plusButton === 1) && <Icon type="plus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c' }} onClick={this.createHandler.bind(this)} />}
                {((this.state.negButton === 1) && <Icon type="minus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c' }} onClick={this.negButtonHandler.bind(this)} />)}
                {(this.state.status === 1) && <CreateProcessor func={this.displayList.bind(this)} />}
                {(this.state.status === 2) && <UpdateProcessor id={this.state.id} func={this.displayList.bind(this)} />}
            </div>

        );
    }
}

export default ListProcessor;
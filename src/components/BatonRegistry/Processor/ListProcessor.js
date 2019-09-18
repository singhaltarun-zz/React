import React, { Component } from 'react';
import {Table, Divider, Icon, Form, Row, Popconfirm, Input, Button} from 'antd';
import {API_BASE_HOST} from '../../../constants.js'
import {API_BASE_PORT} from '../../../constants.js'
import 'antd/dist/antd.css';
import ProcessorCreateForm from './CreateProcessor';
import ProcessorUpdateForm from './UpdateProcessor';
import Highlighter from "react-highlight-words";

const CreateProcessor = Form.create({ name: 'advanced_search' })(ProcessorCreateForm);
const UpdateProcessor = Form.create({ name: 'advanced_search' })(ProcessorUpdateForm);

const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class ListProcessorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            status: 0,
            plusButton: 1,
            negButton: 0,
            display: 1,
            id: 0,
            editingKey: '',
        }
        this.columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                editable: true,
                width: 200,
                ...this.getColumnSearchProps('id'),
            },
            {
                title: 'Name',
                dataIndex: 'name',
                editable: true,
                width: 200,
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Namespace',
                dataIndex: 'namespace',
                width: 200,
                editable: true,
                ...this.getColumnSearchProps('namespace'),
            },
            {
                title: 'Version',
                dataIndex: 'version',
                editable: true,
                width: 200,
                ...this.getColumnSearchProps('version'),
            },
            {
                title: 'ConsumerID',
                dataIndex: 'consumer_service_id',
                width: 200,
                editable: true,
                ...this.getColumnSearchProps('consumer_service_id'),
            },
            {
                title: 'TimeOut',
                dataIndex: 'timeout',
                width: 200,
                editable: true,
                ...this.getColumnSearchProps('timeout'),
            },
            {
                title: 'Parallelism',
                dataIndex: 'parallelism',
                width: 200,
                editable: true,
                ...this.getColumnSearchProps('parallelism'),
            },
            {
                title: 'BatchCount',
                dataIndex: 'batch_count',
                width: 200,
                editable: true,
                ...this.getColumnSearchProps('batch_count'),
            },
            {
                title: 'RuntimeLang',
                dataIndex: 'runtime_language',
                width: 200,
                editable: true,
                ...this.getColumnSearchProps('runtime_language'),
            },
            {
                title: 'SourcePath',
                dataIndex: 'source_path',
                width: 200,
                editable: true,
                ...this.getColumnSearchProps('source_path'),
            },
            {
                title: 'PluginPath',
                dataIndex: 'plugin_path',
                width: 200,
                editable: true,
                ...this.getColumnSearchProps('plugin_path'),
            },
            {
                title: 'State',
                dataIndex: 'state',
                width: 200,
                editable: true,
                ...this.getColumnSearchProps('state'),
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
                ...this.getColumnSearchProps('updated_at'),
            },
            {
                title: 'LocalVersion',
                dataIndex: 'local_version',
                width: 200,
                editable: true,
                ...this.getColumnSearchProps('local_version'),
            },
            {
                title: 'Action',
                dataIndex: 'action',
                fixed: 'right',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                  <EditableContext.Consumer>
                    {form => (
                        <a
                            onClick={() => this.save(form, record)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                    ) : (<span>
                            <Popconfirm
                    title="Are you sure？"
                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                    onConfirm={() => this.handleDelete(record.id)}>
                    <a href="#">Delete</a>
                    </Popconfirm>

                            <Divider type="vertical" />
                            <a href="#" disabled={editingKey !== ''} onClick={() =>  this.edit(record.id)}> Edit </a>
                    </span>
                    );
                },
            },
        ]
    }
    handleDelete(id) {
        fetch(API_BASE_HOST+ ':' + API_BASE_PORT+`/Processor/`, {
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

    save(form, record) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            fetch(API_BASE_HOST + ':' + API_BASE_PORT + `/Processor/`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "processor": {
                        "id": row.id,
                        "name": row.name,
                        "version": row.version,
                        "consumer_service_id": row.consumer_service_id,
                        "timeout": row.timeout,
                        "parallelism": row.parallelism,
                        "batch_count": row.batch_count,
                        "runtime_language": row.runtime_language,
                        "source_path": row.source_path,
                        "plugin_path": row.plugin_path,
                        "state": {},
                        "invocation_symbol": row.invocation_symbol,
                        "created_at": 12,
                        "updated_at": 21,
                        "local_version": row.local_version,
                        "namespace": row.namespace
                    }
                })
            })
                .then(response => response.json())
                .then(() => this.setState({
                    editingKey: '',
                    display: 1
                }) )
                .catch(error => console.log('Error fetching and parsing data', error));
        })

        this.setState({
            editingKey: '',
        })

    }

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
        fetch(API_BASE_HOST+ ':' + API_BASE_PORT+`/Processor`, {
            method: "get",
            headers: {
                'Access-Control-Allow-Origin' : "*",
            },
        })
            .then(response => response.json())
            .then(data => this.setState({
                data: data,
                display: 0
            }))
            .catch(error => console.log('Error fetching and parsing data', error));
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };


    isEditing = record => record.id === this.state.editingKey;

    edit(id) {
        console.log("logging  : "+ id)
        this.setState({ editingKey: id });
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        if (this.state.display === 1) {
            this.ProcessorList();
        }

        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });


        return (
            <div>
                <EditableContext.Provider value={this.props.form}>
                    <Table dataSource={this.state.data["processors"]} components={components} columns={columns}
                           rowClassName='editable-row'  scroll={{ x: 500}} style={{ width: '100%' }} pagination={{ pageSize: 6 }} />
                </EditableContext.Provider>
                {(this.state.plusButton === 1) && <Icon type="plus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c' }} onClick={this.createHandler.bind(this)} />}
                {((this.state.negButton === 1) && <Icon type="minus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c' }} onClick={this.negButtonHandler.bind(this)} />)}
                {(this.state.status === 1) && <CreateProcessor func={this.displayList.bind(this)} />}
                {(this.state.status === 2) && <UpdateProcessor id={this.state.id} func={this.displayList.bind(this)} />}
            </div>

        );
    }
}

const ListProcessor = Form.create()(ListProcessorForm);

export default ListProcessor;
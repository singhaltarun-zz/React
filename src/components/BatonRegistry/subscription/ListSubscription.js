import React, { Component } from 'react';
import { Table, Divider, Icon, Form, Row, Popconfirm , Input} from 'antd';
import 'antd/dist/antd.css';
import SubscriptionCreateForm from './CreateSubscription';
import SubscriptionUpdateForm from './UpdateSubscription';
import {API_BASE_HOST} from '../../../constants.js'
import {API_BASE_PORT} from '../../../constants.js'

const CreateSubscription = Form.create({ name: 'advanced_search' })(SubscriptionCreateForm);
const UpdateSubscription = Form.create({ name: 'advanced_search' })(SubscriptionUpdateForm);

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

class ListSubscriptionForm extends React.Component {
    componentDidMount() {
        this.setState({
            status: 0
        })
    }
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

        },
        {
            title: 'Publisher',
            dataIndex: 'publisher',
            editable: true,
        },
        {
            title: 'EventResource',
            dataIndex: 'event_resource_id',
            editable: true,
        },
        {
            title: 'SchemaVersion',
            dataIndex: 'schema_version',
            editable: true,
        },
        {
            title: 'ProcessorId',
            dataIndex: 'processor_id',
            editable: true,
        },
        {
            title: 'State',
            dataIndex: 'state',
            editable: true,
        },
        {
            title: 'CreatedAt',
            dataIndex: 'created_at',
            editable: true,
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updated_at',
            editable: true,
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
                    ) : (<div >
                            <Popconfirm
                                title="Are you sure？"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                onConfirm={() => this.handleDelete(record.id)}
                            >
                                <a href="#">Delete</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <a href="#" disabled={editingKey !== ''} onClick={() =>  this.edit(record.id)}>
                                Edit
                            </a>
                        </div>
                    );
                },
            },
        ]
    }
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
    save(form, record) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            fetch(API_BASE_HOST + ':' + API_BASE_PORT + `/Subscription/`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "subscription": {
                        "id": row.id,
                        "publisher": row.publisher,
                        "event_resource_id": row.event_resource_id,
                        "schema_version": row.schema_version,
                        "processor_id": row.processor_id,
                        "state": row.state,
                        "created_at": 21,
                        "updated_at": 12
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

    isEditing = record => record.id === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };



    edit(id) {
        this.setState({ editingKey: id });
    }

    render() {
        if (this.state.display === 1){
            this.SubscriptionList();
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
            <div><EditableContext.Provider value={this.props.form}>
                <Table dataSource={this.state.data["subscriptions"]} components={components} columns={columns}
          rowClassName='editable-row'  scroll={{ x: 1500 }} style={{ width: '100%' }} />
          </EditableContext.Provider>
                {(this.state.plusButton === 1) && <Icon type="plus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c' }} onClick={this.createHandler.bind(this)} />}
                {((this.state.negButton === 1) && <Icon type="minus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c' }} onClick={this.negButtonHandler.bind(this)} />)}
                {(this.state.status === 1) && <CreateSubscription func={this.displayList.bind(this)} />}
                {(this.state.status === 2) && <UpdateSubscription id={this.state.id} func={this.displayList.bind(this)} />}
            </div>

        );
    }
}
const ListSubscription = Form.create()(ListSubscriptionForm);

export default ListSubscription;
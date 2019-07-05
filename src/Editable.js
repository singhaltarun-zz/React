import React,{Component} from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import { Spinner } from 'reactstrap';
// import {Form} from 'antd';
// import { Button } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress, Button } from 'antd';
import { Steps } from 'antd';
import './components/Progress.js'
import JsonClass from './components/Json'
import { Input, InputNumber, Popconfirm, Form,Table } from 'antd';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
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
var data=[];
var x;
class EditableTable extends React.Component {
  func(){
    data = this.props.dataSource123;
    if(this.props.dataSource123)
    x=this.props.dataSource123.length;
    const columns=this.props.columns;
    // console.log(columns);
    columns.push(
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
              const { editingKey } = this.state;
              const editable = this.isEditing(record);
              return editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
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
              ) : (
                <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                  Edit
                </a>
              );
            },
          }
    );
    this.state = { data , editingKey:''};
    this.columns = this.props.columns;
    }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = data;
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    this.func();
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
          inputType: col.dataIndex === 'id' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    // console.log(this.props.dataSource123);
    // var xyz = {data:this.props.dataSource123 , editingKey:''};
    // console.log(this.state.data===this.props.dataSource123)
    console.log(data);
    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={this.props.columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

export default EditableTable;
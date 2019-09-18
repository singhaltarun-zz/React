import React from 'react';
import '../../App.js';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Form , Button} from 'antd';
import {  Divider, Icon } from 'antd';
import { Table } from 'antd';
import { API_BASE_HOST} from '../../constants.js';
import { API_BASE_PORT} from '../../constants.js';

const { Search } = Input;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  const EditableContext = React.createContext();

  const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
  
  const EditableFormRow = Form.create()(EditableRow);
  
  class EditableCell extends React.Component {
    state = {
      editing: false,
    };
  
    toggleEdit = () => {
      const editing = !this.state.editing;
      this.setState({ editing }, () => {
        if (editing) {
          this.input.focus();
        }
      });
    };

    

    save = e => {
      const { record, handleSave } = this.props;
      this.form.validateFields((error, values) => {
        if (error && error[e.currentTarget.id]) {
          return;
        }
        this.toggleEdit();
        handleSave({ ...record, ...values });
      });
    };
  
    renderCell = (form )=> {
      this.form = form;
      const { children, dataIndex, record, title } = this.props;
      const { editing } = this.state;
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(dataIndex, {
            rules: [
              {
                required: true,
                message: `${title} is required.`,
              },
            ],
            initialValue: record[dataIndex],
          })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
    };

  
    render() {
      const {
        editable,
        dataIndex,
        title,
        record,
        index,
        handleSave,
        children,
        ...restProps
      } = this.props;
      return (
        <td {...restProps}>
          {editable ? (
            <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
          ) : (
            children
          )}
        </td>
      );
    }
  }

  
class OffsetSearchForm extends React.Component {
    componentDidMount() {
        this.props.form.validateFields();
    }
    state = {
        EventTypeId: '',
        TenantId: '',
        ProcessorId: '',
        data: {},
        result: []
    }
    
    
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
    }
    columns = [
        {
            title: 'EventTypeId',
            width: 200,
            dataIndex: 'EventTypeId',

        },
        {
            title: 'TenantId',
            width: 200,
            dataIndex: 'TenantId',
        },
        {
            title: 'ProcessorId',
            dataIndex: 'ProcessorId',
            width: 200,
            
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
            
        },
        {
            title: 'CreatedAt',
            dataIndex: 'CreatedAt',
            width: 200,
            
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'UpdatedAt',
            width: 200,
            
        },
        {title: 'Update',
        key: 'action',
            fixed: 'right',
        render: (text, record) => (
            <span>
                <a href="javascript:;" onClick={() => this.handleUpdateCustom(record)}>UpdateToCustom</a>
                <Divider type="horizontal" />
                <a href="javascript:;" onClick={() => this.handleUpdateLatest(record)}>UpdateToLatest</a>
                <Divider type="horizontal" />
                <a href="javascript:;" onClick={() => this.handleUpdateOldest(record)}>UpdateToOldest</a>
            </span>
        ),
        },
    ]

    handleUpdateCustom(record) {
        
        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Offset/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "offset": {
                    "EventTypeId": record.EventTypeId,
                    "TenantId": record.TenantId,
                    "ProcessorId": record.ProcessorId,
                    "value": record.offset,
                    "UpdatedByWorker": "Hello"
                  }
            })
        })
        .then(response => response.json())
        .then(data => this.func(data["offset"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }

    handleUpdateLatest(record) {
        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Offset/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "offset": {
                    "EventTypeId": record.EventTypeId,
                    "TenantId": record.TenantId,
                    "ProcessorId": record.ProcessorId,
                    "latest": {
                        "value": true
                      },
                    "UpdatedByWorker": "Hello"
                  }
            })
        })
        .then(response => response.json())
        .then(data => this.func(data["offset"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }
    

    handleUpdateOldest(record) {
        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Offset/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "offset": {
                    "EventTypeId": record.EventTypeId,
                    "TenantId": record.TenantId,
                    "ProcessorId": record.ProcessorId,
                    "oldest": {
                        "value": true
                      },
                    "UpdatedByWorker": "Hello"
                  }
            })
        })
        .then(response => response.json())
        .then(data => this.func(data["offset"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }
    handleSubmit = e => {
        e.preventDefault();
        fetch(API_BASE_HOST + ':' + API_BASE_PORT+`/Offset?EventTypeId=${encodeURIComponent(this.state.EventTypeId)}&TenantId=${encodeURIComponent(this.state.TenantId)}&ProcessorId=${encodeURIComponent(this.state.ProcessorId)}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => this.func(data["offset"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }

    ProcessorIdHandler( event) {
        this.setState({
            ProcessorId: event.target.value
        })
    }

    EventTypeIdHandler( event) {
        this.setState({
            EventTypeId: event.target.value
        })
    }

    TenantIdHandler( event) {
        this.setState({
            TenantId: event.target.value
        })
    }

    handleSave = (row,record) => {
        const newData = [...this.state.result];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        
        this.setState({ result: newData });
        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Offset/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "offset": {
                    "EventTypeId": record.EventTypeId,
                    "TenantId": record.TenantId,
                    "ProcessorId": record.ProcessorId,
                    "value": record.offset,
                    "UpdatedByWorker": "Hello"
                  }
            })
        })
        .then(response => response.json())
        .then(data => this.func(data["offset"]))
        .catch(error => console.log('Error fetching and parsing data', error));
      };

    render() {
        const components = {
            body: {
              row: EditableFormRow,
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
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: this.handleSave,
              }),
            };
          });
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const EventTypeIdError = isFieldTouched('EventTypeId') && getFieldError('EventTypeId');
    const TenantIdError = isFieldTouched('TenantId') && getFieldError('TenantId');
    const ProcessorIdError = isFieldTouched('ProcessorId') && getFieldError('ProcessorId');
            return (
                <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={EventTypeIdError ? 'error' : ''} help={EventTypeIdError || ''}>
          {getFieldDecorator('EventTypeId', {
            rules: [{ required: true, message: 'Please input EventTypeId!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="EventTypeId" value={this.state.EventTypeId} onChange={this.EventTypeIdHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={TenantIdError ? 'error' : ''} help={TenantIdError || ''}>
          {getFieldDecorator('TenantId', {
            rules: [{ required: true, message: 'Please input TenantId!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="TenantId" value={this.state.TenantId} onChange={this.TenantIdHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={ProcessorIdError ? 'error' : ''} help={ProcessorIdError || ''}>
          {getFieldDecorator('ProcessorId', {
            rules: [{ required: true, message: 'Please input ProcessorId!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="ProcessorId" value={this.state.ProcessorId} onChange={this.ProcessorIdHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
          Get Offset
          </Button>
        </Form.Item>
      </Form>
      
      <Table dataSource={this.state.result} components={components}
          rowClassName={() => 'editable-row'} columns={columns} scroll={{ x: 1500 }} style={{ width: '100%' }} />        
                   
                </div>
            );
    }
}

export default OffsetSearchForm;
import React,{Component} from 'react';
import {Table, Divider, Icon, Form, Row,Popconfirm} from 'antd';
import 'antd/dist/antd.css';
import { throwStatement, breakStatement } from '@babel/types';
import Item from 'antd/lib/list/Item';
import TenantCreateForm from './CreateTenant';
import TenantUpdateForm from './UpdateTenant';

const CreateTenant = Form.create({ name: 'advanced_search' })(TenantCreateForm);
const UpdateTenant = Form.create({ name: 'advanced_search' })(TenantUpdateForm);
var ID = 0;

const columns = [
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
      width:200,
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
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm
            title="Are you sure？"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm = {() => handleDelete(record.id)}
            >
            <a href="#">Delete</a>
        </Popconfirm>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => handleUpdate(record.id)}>Update</a>
          </span>
        ),
      },
]
function handleDelete(id) {
    fetch(`http://localhost:3001/Tenant/`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "identity" : {
            "id" : id
        }
      })
    })
    .then(response => response.json())
    .catch(error => console.log('Error fetching and parsing data', error));

    // this.TenantList();
  };
  function handleUpdate(id) {
    ID = id;
}

class ListTenant extends React.Component {
    componentDidMount() {
        this.setState({
            status : 0
        })
    }
    state = {
        id : '',
        org_id : '',
        data : {},
        status : 0
    }
    createHandler() {
        this.setState({
            status : 1
        })
    }
    
    TenantList() {
        fetch(`http://localhost:3001/Tenant`,{
          method : "get"
        })
        .then(response => response.json())
        .then(data => this.setState({
          data: data
        }))
        .catch(error => console.log('Error fetching and parsing data', error));
    }
    render() {
        this.TenantList();
        return(
            <div>
                <Table dataSource={this.state.data["tenants"]} columns={columns}  scroll={{ x: 1500}} style={{ width:'100%'}}/>
                <Icon type="plus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c'}}  onClick={this.createHandler.bind(this)}/>
                {(this.state.status === 1) && <CreateTenant/>} 
                {!(ID === 0) && <UpdateTenant id={ID}/>} 
            </div>
            
        );
    }
}

export default ListTenant;
import React,{Component} from 'react';
import {Table, Divider, Icon, Form, Row,Popconfirm} from 'antd';
import 'antd/dist/antd.css';
import { throwStatement, breakStatement } from '@babel/types';
import Item from 'antd/lib/list/Item';
import SubscriptionCreateForm from './CreateSubscription';
import SubscriptionUpdateForm from './UpdateSubscription';

const CreateSubscription = Form.create({ name: 'advanced_search' })(SubscriptionCreateForm);
const UpdateSubscription = Form.create({ name: 'advanced_search' })(SubscriptionUpdateForm);
var ID = 0;

const columns = [
    {
      title: 'Id',
      width: 100,
      dataIndex: 'id',
      editable: true,
      fixed : 'left'
      
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
      width:200,
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
    fetch(`http://localhost:3001/Subscription/`, {
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

    // this.SubscriptionList();
  };
  function handleUpdate(id) {
    ID = id;
}

class ListSubscription extends React.Component {
    componentDidMount() {
        this.setState({
            status : 0
        })
    }
    state = {
        data : {},
        status : 0
    }
    createHandler() {
        this.setState({
            status : 1
        })
    }
    
    SubscriptionList() {
        fetch(`http://localhost:3001/Subscription`,{
          method : "get"
        })
        .then(response => response.json())
        .then(data => this.setState({
          data: data
        }))
        .catch(error => console.log('Error fetching and parsing data', error));
    }
    render() {
        this.SubscriptionList();
        return(
            <div>
                <Table dataSource={this.state.data["subscriptions"]} columns={columns}  scroll={{ x: 1500}} style={{ width:'100%'}}/>
                <Icon type="plus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c'}}  onClick={this.createHandler.bind(this)}/>
                {(this.state.status === 1) && <CreateSubscription/>} 
                {!(ID === 0) && <UpdateSubscription id={ID}/>} 
            </div>
            
        );
    }
}

export default ListSubscription;
import React,{Component} from 'react';
import {Table, Popconfirm,Icon,Divider, Form} from 'antd';
import 'antd/dist/antd.css';
import ResourceCreateForm from './CreateResource';
import ResourceUpdateForm from './UpdateResource';

const CreateResource = Form.create({ name: 'advanced_search' })(ResourceCreateForm);
const UpdateResource = Form.create({ name: 'advanced_search' })(ResourceUpdateForm);

var ID = 0;
const columns = [
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
      width:200,
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
    fetch(`http://localhost:3001/Resource/`, {
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


class ListResource extends React.Component {
    componentDidMount() {
        this.setState({
            status : 0
        })
    }
    state = {
        data : {},
        status : 0
    }
    ResourceList() {
        fetch(`http://localhost:3001/Resource`,{
          method : "get"
        })
        .then(response => response.json())
        .then(data => this.setState({
          data: data
        }))
        .catch(error => console.log('Error fetching and parsing data', error));
    }

    createHandler(){
        this.setState({
            status : 1
        })
    }
    render() {
        this.ResourceList();
        return(
            <div>
                <Table dataSource={this.state.data["resources"]} columns={columns}  scroll={{ x: 1500}} style={{ width:'100%'}}/>
                <Icon type="plus-circle" theme="twoTone" style={{ fontSize: '25px', color: '#08c'}}  onClick={this.createHandler.bind(this)}/>
                {(this.state.status === 1) && <CreateResource/>} 
                {!(ID === 0) && <UpdateResource id={ID}/>} 
            </div>
        );
    }
}

export default ListResource;
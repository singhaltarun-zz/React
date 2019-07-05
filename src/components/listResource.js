import React,{Component} from 'react';
import {Table} from 'antd';
import 'antd/dist/antd.css';

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
]


class ListResource extends React.Component {
    state = {
        data : {}
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
    render() {
        this.ResourceList();
        return(
            <Table dataSource={this.state.data["resources"]} columns={columns}  scroll={{ x: 1500, y: "100vh" }} style={{ width:'100%'}}/>
        );
    }
}

export default ListResource;
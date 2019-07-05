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
]


class ListTenant extends React.Component {
    state = {
        data : {}
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
            <Table dataSource={this.state.data["tenants"]} columns={columns}  scroll={{ x: 1500, y: "100vh" }} style={{ width:'100%'}}/>
        );
    }
}

export default ListTenant;
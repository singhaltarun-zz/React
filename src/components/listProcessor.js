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
      title: 'Name',
      width: 200,
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Version',
      dataIndex: 'version',
      width:200,
      editable: true,
    },
    {
      title: 'ConsumerServiceId',
      dataIndex: 'consumer_service_id',
      width: 200,
      editable: true,
    },
    {
      title: 'Timeout',
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
      width: 200,
      dataIndex: 'batch_count',
      editable: true,
    },
    {
      title: 'RuntimeLanguage',
      dataIndex: 'runtime_language',
      width:200,
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
      title: 'InvocationSymbol',
      width: 200,
      dataIndex: 'invocation_symbol',
      editable: true,
    },
    {
      title: 'CreatedAt',
      dataIndex: 'created_at',
      width:200,
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
]


class ListProcessor extends React.Component {
    state = {
        data : {}
    }
    ProcessorList() {
        fetch(`http://localhost:3001/Processor`,{
          method : "get"
        })
        .then(response => response.json())
        .then(data => this.setState({
          data: data
        }))
        .catch(error => console.log('Error fetching and parsing data', error));
    }
    render() {
        this.ProcessorList();
        return(
            <Table dataSource={this.state.data["processors"]} columns={columns}  scroll={{ x: 1500, y: "100vh" }} style={{ width:'100%'}}/>
        );
    }
}

export default ListProcessor;
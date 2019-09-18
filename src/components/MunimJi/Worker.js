import React from 'react';
import '../../App.js';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Form, Button } from 'antd';
import { Table, Checkbox } from 'antd';
import {API_BASE_HOST} from '../../constants.js'
import {API_BASE_PORT} from '../../constants.js'
import { bool } from 'prop-types';
import { hostname } from 'os';
import { isArray } from 'util';
const { Search } = Input;


class Worker extends React.Component {
    componentDidMount() {
        this.setState({
            status: 0
        })
    }
    state = {
        id: 0,
        data: {},
        result: [],
        status: 0,
        record: '',
        idMask : false,
        hostname : false,
        state : false,
        
    }
    isEditing()  {
            return this.state.status === 1;
    }

    
    columns = [
        {
            title: 'Id',
            width: 200,
            dataIndex: 'id',
            editable: true,

        },
        {
            title: 'Hostname',
            width: 200,
            dataIndex: 'hostname',
            editable: true,
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            width: 200,
            editable: true,
        },
        {
            title: 'Port',
            dataIndex: 'port',
            width: 200,
            editable: true,
        },
        {
            title: 'Heartbeat_at',
            dataIndex: 'heartbeat_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Heartbeat_received_at',
            dataIndex: 'heartbeat_received_at',
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
            title: 'Created_at',
            dataIndex: 'created_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Updated_at',
            dataIndex: 'updated_at',
            width: 200,
            editable: true,
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 200,     

            render: (text, record) => {
                const editable = this.isEditing();
                return editable ? (
                  <span>
                      <Checkbox onChange={(e) => this.onChangeID(e)}>ID</Checkbox>
                      <Checkbox onChange={(e) => this.onChangeHostname(e)}>Hostname</Checkbox>
                      <Checkbox onChange={(e) => this.onChangeState(e)}>State</Checkbox>
                      <Button onClick = {(record) => this.onSubmit(record) }>Submit</Button>
                  </span>
                ) : (
                    <span>
                  <a href="javascript:;" onClick={ () => this.FilterWorkerHandler()}>
                    Filter Worker
                  </a>
                  </span>
                );
              },
        },
    ]
    
    onChangeID(e) {
        if (e.target.checked ){
            this.setState({
              idMask: true,
            })
        }
        else if (!e.target.checked){
          this.setState({
              idMask: false,
            })
        }
      }
  
      onChangeHostname(e) {
          if (e.target.checked ){
              this.setState({
                hostname: true,
              })
          }
          else if (!e.target.checked){
            this.setState({
                hostname: false,
              })
          }
        }
  
        onChangeState(e) {
          if (e.target.checked ){
              this.setState({
                state: true,
              })
          }
          else if (!e.target.checked){
            this.setState({
                state: false,
              })
          }
        }

    idHandler(event) {
        this.setState({
            id: event.target.value
        })
    }

    onSubmit(record) {
        var filter_mask = [];
        if(this.state.idMask) {
            filter_mask.push(1)
        }
        if(this.state.hostname) {
            filter_mask.push(2)
        }
        if(this.state.state) {
            filter_mask.push(7)
        }
        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Worker/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "worker": {
                    "id": record.id,
                    "hostname": record.hostname,
                    "ip": record.ip,
                    "port": record.port,
                    "state": record.state,
                },
               "filter_mask": filter_mask,
            })
        })
        .then(response => response.json())
        .then(data => this.func(data["workers"]))
        .catch(error => console.log('Error fetching and parsing data', error))
    }
    FilterWorkerHandler() {
        
        this.setState({
            status: 1,
        }
            ) 
    
    }

    func(data){
        var result = [];
        result.push(data);
        if (isArray (result[0])){
            result = result[0];
        } 
        this.setState(
            {
                result:result
            }
        )
    
    }
    handleSubmit(id) {
        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Worker?id=${encodeURIComponent(id)}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => this.func(data["worker"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }
  

    render() {
           
            return (
                <div>
                    <Search
                    placeholder="Enter WorkerId"
                    onSearch={value => this.handleSubmit(value)}
                    style={{ width: 200 }}
                    />
                    <Table dataSource={this.state.result} columns={this.columns} scroll={{ x: 1500 }} style={{ width: '100%' }} />
                </div>
    
            );
    }
}

export default Worker;
import React from 'react';
import '../../App.js';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'antd';
import { Input, Form } from 'antd';
import { Layout, Breadcrumb, Icon } from 'antd';
import { Table } from 'antd';
import {API_BASE_HOST} from '../../constants.js'
import {API_BASE_PORT} from '../../constants.js'
import { isArray } from 'util';
import  Stat from './Stat';
import Highlighter from 'react-highlight-words';

const { Search } = Input;
const { Content } = Layout;
class Job extends React.Component {
    state = {
        id: 0,
        data: {},
        result: [],
        jobsWithProcessor: [],
        stats: '',
        displaySatus: 0,
        searchText: '',
        processor_ids: [],
        statsMap: new Map(),
    }

    
    idHandler(event) {
        this.setState({
            id: event.target.value
        })
    }

    getProcessorId(statIds) {
        statIds =  statIds.split(',');
        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Stat/bulkStats`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": statIds
            })
        })
            .then(response => response.json())

            .then(data => this.extractProcessorIds(data["stats"]))
            .catch(error => console.log('Error fetching and parsing data', error));
    }

    extractProcessorIds(data) {
        var result = [];
        result.push(data);
        result = result[0];
        for(var i=0;i<result.length;i++){
            this.state.statsMap.get(result[i].id).processor_id = result[i].processor_id
        }
        for(var i=0;i<result.length;i++){
            result[i] = this.state.statsMap.get(result[i].id)
        }
        this.setState({
            jobsWithProcessor : result
        })
    }

    func(data){
        var result = [];
        result.push(data);
        
        if (isArray (result[0])){
        result = result[0];
        } 
        var i;
        var  statIDs = '';
         for (i = 0; i < result.length; i++) { 
        statIDs = statIDs + ','+ result[i].stat_id;
        this.state.statsMap.set(result[i].stat_id, result[i]);
        }
        statIDs = statIDs.substring(1,);
        this.setState(
            {
                result:result,
            }
        )
         this.getProcessorId(statIDs)


        }
    handleSubmit(id) {

        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Job?id=${encodeURIComponent(id)}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => this.func(data["job"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }

    listFailedJobs() {


        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Job/failed/`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => this.func(data["job"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }
    handleStatList() {
        Stat.handleSubmit()
    }
    unblockJob(id){
        fetch(API_BASE_HOST+':'+API_BASE_PORT+`/Job/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "job": {
                    "id": id
                }
            })
        })
        .then(response => response.json())
        .then(data => this.func(data["job"]))
        .catch(error => console.log('Error fetching and parsing data', error));
    }


      getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      });

      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      };

      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };

      columns = [
        {
            title: 'Id',
            width: 200,
            dataIndex: 'id',
            editable: true,
            ...this.getColumnSearchProps('id'),
        },
        {
            title: 'Stat_Id',
            width: 200,
            dataIndex: 'stat_id',
            editable: true,
            ...this.getColumnSearchProps('stat_id'),
        },
          {
              title: 'Processor_id',
              dataIndex: 'processor_id',
              width: 200,
              editable: true,
          },
        {
            title: 'Scheduled_At',
            dataIndex: 'scheduled_at',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('scheduled_at'),
        },
        {
            title: 'Assigned_At',
            dataIndex: 'assigned_at',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('assigned_at'),
        },
        {
            title: 'Picked_At',
            dataIndex: 'picked_at',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('picked_at'),
        },
        {
            title: 'Synced_At',
            dataIndex: 'synced_at',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('synced_at'),
        },
        {
            title: 'Started_At',
            dataIndex: 'started_at',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('started_at'),
        },
        {
            title: 'Completion_at',
            dataIndex: 'completion_at',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('completion_at'),
        },
        {
            title: 'Worker_Id',
            dataIndex: 'worker_id',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('worker_id'),
        },
        {
            title: 'Start_Offset',
            dataIndex: 'start_offset',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('start_offset'),
        },
        {
            title: 'End_Offset',
            width: 200,
            dataIndex: 'end_offset',
            editable: true,
            ...this.getColumnSearchProps('end_offset'),

        },
        {
            title: 'Max_Memory',
            width: 200,
            dataIndex: 'max_memory',
            editable: true,
            ...this.getColumnSearchProps('max_memory'),
        },
        {
            title: 'Time_Taken',
            dataIndex: 'time_taken',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('time_taken'),
        },
        {
            title: 'Response',
            dataIndex: 'response',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('response'),
        },
        {
            title: 'State',
            dataIndex: 'state',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('state'),
        },
        {
            title: 'Is_active',
            dataIndex: 'is_active',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('is_active'),
        },
        {
            title: 'RetryCount',
            dataIndex: 'retryCount',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('retryCount'),
        },
        {
            title: 'Created_at',
            dataIndex: 'created_at',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('created_at'),
        },
        {
            title: 'Updated_at',
            dataIndex: 'updated_at',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('updated_at'),
        },
        {
            title: 'Namespace',
            dataIndex: 'namespace',
            width: 200,
            editable: true,
            ...this.getColumnSearchProps('namespace'),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={() => this.unblockJob(record.id)}>UnblockJob</a>
                </span>
            ),
        },
    ]
    
    render() {

            return (
                <div>
                    <Search
                    placeholder="Enter JobID"
                    onSearch={value => this.handleSubmit(value)}
                    style={{ width: 200 }}
                    />
                    <Button  onClick = { () => this.listFailedJobs()} style={{ width: 200 }}>
                 List Failed Jobs
                 </Button>
                 
                    <Table dataSource={this.state.jobsWithProcessor} columns={this.columns} scroll={{ x: 1500 }} style={{ width: '100%' }} />
                    
                </div>
            );
    }
}

export default Job;
import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import { Table, Divider, Tag } from 'antd';

const { Column, ColumnGroup } = Table;

const data = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['active'],
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['active'],
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['inactive'],
    },
  ];
class ResourceTable extends React.Component {
  render() {
    return (
        <Table dataSource={data}>
        <ColumnGroup title="Resource">
          <Column title="Id" dataIndex="firstName" key="firstName" />
          <Column title="Org_Id" dataIndex="lastName" key="lastName" />
          <Column title="Created_At" dataIndex="lastName" key="lastName" />
          <Column title="Updated_At" dataIndex="lastName" key="lastName" />
          <Column
          title="State"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <span>
              {tags.map(tag => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
          <a href="javascript:;">Create</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
          <Divider type="vertical" />
          <a href="javascript:;">Update</a>
        </span>
          )}
        />
        </ColumnGroup>
        
      </Table>
    );
  }
}

export default ResourceTable;
import React,{Component} from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Icon, Input, Button } from 'antd';
// import './Progress.js/ProgressClass'
import ProgressClass from './Progress.js';


class Query extends React.Component {
  render() {
    return (
      <Form layout="inline">
        <Form.Item>
            <Input type="text"
              placeholder="Username"
            />,
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.props.value}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Query;
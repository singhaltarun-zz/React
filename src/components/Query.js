import React,{Component} from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Icon, Input, Button } from 'antd';
// import './Progress.js/ProgressClass'
import ProgressClass from './Progress.js';
import JsonClass from './Json.js';


class Query extends React.Component {
  isEmpty(obj) {
    var isObj = obj !== null 
    && typeof obj === 'object' 
    && Object.prototype.toString.call(obj) === '[object Object]';
 
    if (isObj) {
        for (var o in obj) {
            if (obj.hasOwnProperty(o)) {
                return false;
                break;
            }
        }
        return true;
    } else {
        console.error("isEmpty function only accept an Object");
    }
 }
  state = {
    userName : '',
    data : {}
  }
  userNameHandler(event) {
    this.setState({
      userName : event.target.value
    })
  }
  fetchUser(cname) {
    fetch(`http://batonregistry.internal.titos.mindtickle.com/baton/tenants`)
    .then(response => response.json())
    .then(data => this.setState({
      data: data
    }))
    .catch(error => console.log('Error fetching and parsing data', error));

    // console.log(this.state.data)
  }

  handleOnClick() {
    this.fetchUser(this.state.userName)
    // this.props.value()
  }

  render() {
    return (
      <Form layout="inline">
        <Form.Item>
            <Input type="text"
              placeholder="Username"
              value = {this.state.userName}
              onChange = {this.userNameHandler.bind(this)}
            />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.handleOnClick.bind(this)}>
            Log in
          </Button>
        </Form.Item>
        { !this.isEmpty(this.state.data)  && <JsonClass value={this.state.data}/>}
      </Form>
    );
  }
}

export default Query;
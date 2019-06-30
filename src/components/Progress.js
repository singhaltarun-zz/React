import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import { Spinner } from 'reactstrap';
// import {Form} from 'antd';
// import { Button } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress, Button } from 'antd';
import { Steps } from 'antd';

const { Step } = Steps;

const ButtonGroup = Button.Group;

class ProgressClass extends React.Component {
  state = {
    currentValue: 0
  };

  updateState() {
    this.setState = {
      currentValue : 1
    }
  }

  render() {
    return (
      <Steps current={this.props.currentValue}>
      <Step title="Enter Cname" description="Provide the CName" />
      <Step title="Enter and submit filters" description="Fill the required details" />
      <Step title="Completed" description="Rows fetched" />
      </Steps>
    );
  }
}

export default ProgressClass;

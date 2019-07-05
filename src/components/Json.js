import React,{Component} from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Icon, Input, Button } from 'antd';
// import './Progress.js/ProgressClass'
import ProgressClass from './Progress.js';

class JsonClass extends React.Component {
    render(){
        return(
            <div>
                 {JSON.stringify(this.props.value)}
            </div>
            
            
        )
    }
}

export default JsonClass;
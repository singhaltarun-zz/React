import React from 'react';
import '../../App.js';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Form } from 'antd';
import OffsetSearchForm from './SearchOffset.js';
const OffsetSearch = Form.create({ name: 'advanced_search' })(OffsetSearchForm);

class Offset extends React.Component {
       render() {
            return (
                <div>
                <OffsetSearch/>  
                </div>
            );
    }
}

export default Offset;
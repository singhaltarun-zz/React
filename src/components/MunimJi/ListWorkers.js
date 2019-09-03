import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
const sleepcall = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class ListWorkersForm extends React.Component {
    componentDidMount() {
        this.props.form.validateFields();
        
    }
    handleSubmit = e => {
        e.preventDefault();
        fetch(`/Worker/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "worker": {
                    "id": this.state.id,
                    "hostname": this.state.hostname,
                    "ip": this.state.ip,
                    "port": this.state.port,
                    "state": this.state.state,
                },
                "filter_mask": [this.state.filter_mask]
            })
        })
        .then(response => response.json())
        .catch(error => console.log('Error fetching and parsing data', error));
    };
    state = {
        "id": '',
        "hostname": '',
        "ip": '',
        "port": '',
        "state": '',
        "filter_mask": ''
    }
    idHandler(event) {
        this.setState({
            id: event.target.value
        })
    }

    hostnameNameHandler(event) {
        this.setState({
            hostname: event.target.value
        })
    }
    ipHandler(event) {
        this.setState({
            ip: event.target.value
        })
    }
    portHandler(event) {
        this.setState({
            port: event.target.value
        })
    }
    stateHandler(event) {
        this.setState({
            state: event.target.value
        })
    }
    filter_maskHandler(event) {
        this.setState({
            filter_mask: event.target.value
        })
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const idError = isFieldTouched('id') && getFieldError('id');
        const org_idError = isFieldTouched('org_id') && getFieldError('org_id');
        return (
            <div style={{
                display: 'flex', justifyContent: 'center',
                margin: 'auto',
                width: '30%',
                border: '2px solid #09a9e3',
                padding: '10px'
            }}
            >  
                <Form onSubmit={this.handleSubmit} style={{ margin: 30, padding: 30 }}>
                    <Form.Item style={{ width: '80%' }}>
                        <label>Filter Workers</label>
                    </Form.Item>
                    <Form.Item validateStatus={idError ? 'error' : ''} help={idError || ''} style={{ width: '80%' }}>
                        {getFieldDecorator('id', {
                            rules: [{ required: true, message: 'Please input worker id!' }],
                        })(
                            <Input
                                prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder={this.props.record.id}
                                value={this.state.id}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={org_idError ? 'error' : ''} help={org_idError || ''} style={{ width: '80%' }}>
                        {getFieldDecorator('hostname', {
                            rules: [{ required: true, message: 'Please input worker hostname!' }],
                        })(
                            <Input
                                prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder={this.props.record.hostname}
                                value={this.state.hostname}
                            
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={org_idError ? 'error' : ''} help={org_idError || ''} style={{ width: '80%' }}>
                        {getFieldDecorator('ip', {
                            rules: [{ required: true, message: 'Please input worker ip!' }],
                        })(
                            <Input
                                prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder={this.props.record.ip}
                                value={this.state.ip}
                                
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={org_idError ? 'error' : ''} help={org_idError || ''} style={{ width: '80%' }}>
                        {getFieldDecorator('port', {
                            rules: [{ required: true, message: 'Please input worker port!' }],
                        })(
                            <Input
                                prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder={this.props.record.port}
                                value={this.state.port}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={org_idError ? 'error' : ''} help={org_idError || ''} style={{ width: '80%' }}>
                        {getFieldDecorator('state', {
                            rules: [{ required: true, message: 'Please input worker state!' }],
                        })(
                            <Input
                                prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder={this.props.record.state}
                                value={this.props.record.state}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={org_idError ? 'error' : ''} help={org_idError || ''} style={{ width: '80%' }}>
                        {getFieldDecorator('filter_mask', {
                            rules: [{ required: true, message: 'Please input filter masks' }],
                        })(
                            <Input
                                prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="filter masks" value={this.state.filter_mask} onChange={this.filter_maskHandler.bind(this)}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            Get Workers
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default ListWorkersForm;
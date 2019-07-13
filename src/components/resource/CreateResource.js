import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
const sleepcall = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ResourceCreateForm extends React.Component {
    componentDidMount() {
        this.props.form.validateFields();
    }


    handleSubmit = e => {
        e.preventDefault();
        fetch(`http://localhost:3001/Resource/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "resource": {
                    "id": this.state.id,
                    "topic_name": this.state.topic_name,
                    "namespace": this.state.namespace,
                    "resource_name": this.state.resource_name,
                    "created_at": 12,
                    "updated_at": 21
                }
            })
        })
        .then(response => response.json())
        .catch(error => console.log('Error fetching and parsing data', error));
        sleepcall(500).then(() => {
            this.props.func();
        })
    };
    state = {
        "id": '',
        "topic_name": '',
        "namespace": '',
        "resource_name": ''
    }

    idHandler(event) {
        this.setState({
            id: event.target.value
        })
    }

    topicNameHandler(event) {
        this.setState({
            topic_name: event.target.value
        })
    }
    namespaceHandler(event) {
        this.setState({
            namespace: event.target.value
        })
    }
    resourceNameHandler(event) {
        this.setState({
            resource_name: event.target.value
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
                        <label>Create Resource</label>
                    </Form.Item>
                    <Form.Item validateStatus={idError ? 'error' : ''} help={idError || ''} style={{ width: '80%' }}>
                        {getFieldDecorator('id', {
                            rules: [{ required: true, message: 'Please input your id!' }],
                        })(
                            <Input
                                prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Id" value={this.state.id} onChange={this.idHandler.bind(this)}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={org_idError ? 'error' : ''} help={org_idError || ''} style={{ width: '80%' }}>
                        {getFieldDecorator('topic_name', {
                            rules: [{ required: true, message: 'Please input your org_id!' }],
                        })(
                            <Input
                                prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="TopicName" value={this.state.topic_name} onChange={this.topicNameHandler.bind(this)}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={org_idError ? 'error' : ''} help={org_idError || ''} style={{ width: '80%' }}>
                        {getFieldDecorator('namespace', {
                            rules: [{ required: true, message: 'Please input your org_id!' }],
                        })(
                            <Input
                                prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Namespace" value={this.state.namespace} onChange={this.namespaceHandler.bind(this)}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={org_idError ? 'error' : ''} help={org_idError || ''} style={{ width: '80%' }}>
                        {getFieldDecorator('org_id', {
                            rules: [{ required: true, message: 'Please input your org_id!' }],
                        })(
                            <Input
                                prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Resource" value={this.state.resource_name} onChange={this.resourceNameHandler.bind(this)}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default ResourceCreateForm;
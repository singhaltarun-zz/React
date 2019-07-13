import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
const sleepcall = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TenantCreateForm extends React.Component {
    componentDidMount() {
        this.props.form.validateFields();
    }


    handleSubmit = e => {
        e.preventDefault();
        fetch(`http://localhost:3001/Tenant/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "tenant": {
                    "id": this.state.id,
                    "org_id": this.state.org_id,
                    "created_at": 12,
                    "updated_at": 21,
                    "state": {}
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
        "org_id": ''
    }

    idHandler(event) {
        this.setState({
            id: event.target.value
        })
    }

    orgIdHandler(event) {
        this.setState({
            org_id: event.target.value
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
                        <label>Create Tenant</label>
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
                        {getFieldDecorator('org_id', {
                            rules: [{ required: true, message: 'Please input your org_id!' }],
                        })(
                            <Input
                                prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Org_Id" value={this.state.org_id} onChange={this.orgIdHandler.bind(this)}
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

export default TenantCreateForm;
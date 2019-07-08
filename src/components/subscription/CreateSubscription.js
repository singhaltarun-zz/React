import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SubscriptionCreateForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }


  handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:3001/Subscription/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "subscription" : {
            "id": this.state.id,
            "publisher": this.state.publisher,
            "event_resource_id": this.state.event_resource_id,
            "schema_version": this.state.schema_version,
            "processor_id": this.state.processor_id,
            "state": {},
            "created_at": 21,
            "updated_at": 12
      }
      })
    })
    .then(response => response.json())
    .catch(error => console.log('Error fetching and parsing data', error));
    
  };
  state = {
    "id": '',
    "publisher": '',
    "event_resource_id": '',
    "schema_version": '',
    "processor_id": ''
  }

  idHandler(event){
      this.setState({
          id : event.target.value
      })
  }
  eventHandler(event){
    this.setState({
        event_resource_id : event.target.value
    })
}
processorHandler(event){
    this.setState({
        processor_id : event.target.value
    })
}
publisherHandler(event){
    this.setState({
        publisher : event.target.value
    })
}
schemaHandler(event){
    this.setState({
        schema_version : event.target.value
    })
}

  
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const idError = isFieldTouched('id') && getFieldError('id');
    const publisherError = isFieldTouched('publisher') && getFieldError('publisher');
    const eventError = isFieldTouched('event') && getFieldError('event');
    const schemaError = isFieldTouched('schema') && getFieldError('schema');
    const processorError = isFieldTouched('processor') && getFieldError('processor');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={idError ? 'error' : ''} help={idError || ''}>
          {getFieldDecorator('id', {
            rules: [{ required: true, message: 'Please input your id!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Id" value={this.state.id} onChange={this.idHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={publisherError ? 'error' : ''} help={publisherError || ''}>
          {getFieldDecorator('publisher', {
            rules: [{ required: true, message: 'Please input your publisher_id!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Publisher"  value={this.state.publisher} onChange={this.publisherHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={eventError ? 'error' : ''} help={eventError || ''}>
          {getFieldDecorator('event', {
            rules: [{ required: true, message: 'Please input your event_id!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Event Resource Id"  value={this.state.event_resource_id} onChange={this.eventHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={schemaError ? 'error' : ''} help={schemaError || ''}>
          {getFieldDecorator('schema', {
            rules: [{ required: true, message: 'Please input your schema_id!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Schema Version"  value={this.state.schema_version} onChange={this.schemaHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={processorError ? 'error' : ''} help={processorError || ''}>
          {getFieldDecorator('processor', {
            rules: [{ required: true, message: 'Please input your processor_id!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Processor Id"  value={this.state.processor_id} onChange={this.processorHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Create
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default SubscriptionCreateForm;
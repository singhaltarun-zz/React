import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UpdateProcessorForm extends React.Component {
  componentDidMount() {
    this.props.form.validateFields();
  }


  handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:3001/Processor/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "processor" : {
          "id": this.state.id,
          "name": this.state.name,
          "version": this.state.version,
          "consumer_service_id": this.state.consumer_service_id,
          "timeout": this.state.timeout,
          "parallelism": this.state.parallelism,
          "batch_count": this.state.batch_count,
          "runtime_language": this.state.runtime_language,
          "source_path": this.state.source_path,
          "plugin_path": this.state.plugin_path,
          "state": {},
          "invocation_symbol": this.state.invocation_symbol,
          "created_at": 12,
          "updated_at": 21,
          "local_version": this.state.local_version,
          "namespace": this.state.namespace
      }
      })
    })
    .then(response => response.json())
    .catch(error => console.log('Error fetching and parsing data', error));
  };
  state = {
    "id": this.props.id,
    "name": '',
    "version": '',
    "consumer_service_id": '',
    "timeout": '',
    "parallelism": '',
    "batch_count": '',
    "runtime_language": '',
    "source_path": '',
    "plugin_path": '',
    "invocation_symbol": '',
    "local_version": '',
    "namespace": ''
  }

  idHandler(event){
      this.setState({
          id : event.target.value
      })
  }

  nameHandler(event){
    this.setState({
        name : event.target.value
    })
}
versionHandler(event){
    this.setState({
      version : event.target.value
    })
}
consumerServiceIdHandler(event){
    this.setState({
      consumer_service_id : event.target.value
    })
}
timeoutHandler(event){
  this.setState({
    timeout : event.target.value
  })
}

parallelismHandler(event){
this.setState({
  parallelism : event.target.value
})
}
batchCountHandler(event){
this.setState({
  batch_count : event.target.value
})
}
runtimeLanguageHandler(event){
this.setState({
  runtime_language : event.target.value
})
}
sourcePathHandler(event){
  this.setState({
    source_path : event.target.value
  })
}

pluginPathHandler(event){
this.setState({
  plugin_path : event.target.value
})
}
invocationSymbolHandler(event){
this.setState({
  invocation_symbol : event.target.value
})
}
localVersionHandler(event){
this.setState({
  local_version : event.target.value
})
}
namespaceHandler(event){
  this.setState({
      namespace : event.target.value
  })
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const idError = isFieldTouched('id') && getFieldError('id');
    const nameError = isFieldTouched('name') && getFieldError('name');
    const versionError = isFieldTouched('version') && getFieldError('version');
    const consumerServiceIdError = isFieldTouched('consumerServiceId') && getFieldError('consumerServiceId');
    const timeoutError = isFieldTouched('timeout') && getFieldError('timeout');
    const parallelismError = isFieldTouched('parallelism') && getFieldError('parallelism');
    const batchCountError = isFieldTouched('batchCount') && getFieldError('batchCount');
    const runtimeLanguageError = isFieldTouched('runtimeLanguage') && getFieldError('runtimeLanguage');
    const sourcePathError = isFieldTouched('sourcePath') && getFieldError('sourcePath');
    const pluginPathError = isFieldTouched('pluginPath') && getFieldError('pluginPath');
    const invocationSymbolError = isFieldTouched('invocationSymbol') && getFieldError('invocationSymbol');
    const localVersionError = isFieldTouched('localVersion') && getFieldError('localVersion');
    const namespaceError = isFieldTouched('namespace') && getFieldError('namespace');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={idError ? 'error' : ''} help={idError || ''}>
          {getFieldDecorator('id', {
            rules: [{ message: 'Please input your id!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={this.props.id}
              disabled={true}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Name"  value={this.state.topic_name} onChange={this.nameHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={versionError ? 'error' : ''} help={versionError || ''}>
          {getFieldDecorator('version', {
            rules: [{ required: true, message: 'Please input your version!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Version"  value={this.state.namespace} onChange={this.versionHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={consumerServiceIdError ? 'error' : ''} help={consumerServiceIdError || ''}>
          {getFieldDecorator('consumerServiceId', {
            rules: [{ required: true, message: 'Please input your consumerServiceId!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Consumer Service Id"  value={this.state.consumer_service_id} onChange={this.consumerServiceIdHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={timeoutError ? 'error' : ''} help={timeoutError || ''}>
          {getFieldDecorator('timeout', {
            rules: [{ required: true, message: 'Please input your timeout!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Timeout" value={this.state.timeout} onChange={this.timeoutHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={parallelismError ? 'error' : ''} help={parallelismError || ''}>
          {getFieldDecorator('parallelism', {
            rules: [{ required: true, message: 'Please input your parallelism!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Parallelism"  value={this.state.parallelism} onChange={this.parallelismHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={batchCountError ? 'error' : ''} help={batchCountError || ''}>
          {getFieldDecorator('batchCount', {
            rules: [{ required: true, message: 'Please input your batchCount!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="BatchCount"  value={this.state.batch_count} onChange={this.batchCountHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={runtimeLanguageError ? 'error' : ''} help={runtimeLanguageError || ''}>
          {getFieldDecorator('runtimeLanguage', {
            rules: [{ required: true, message: 'Please input your runtimeLanguage!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Runtime Language"  value={this.state.runtime_language} onChange={this.runtimeLanguageHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={sourcePathError ? 'error' : ''} help={sourcePathError || ''}>
          {getFieldDecorator('sourcePath', {
            rules: [{ required: true, message: 'Please input your sourcePath!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Source Path"  value={this.state.source_path} onChange={this.sourcePathHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={pluginPathError ? 'error' : ''} help={pluginPathError || ''}>
          {getFieldDecorator('pluginPath', {
            rules: [{ required: true, message: 'Please input your pluginPath!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Plugin Path"  value={this.state.plugin_path} onChange={this.pluginPathHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={invocationSymbolError ? 'error' : ''} help={invocationSymbolError || ''}>
          {getFieldDecorator('invocationSymbol', {
            rules: [{ required: true, message: 'Please input your invocationSymbol!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Invocation Symbol Path"  value={this.state.invocation_symbol} onChange={this.invocationSymbolHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={localVersionError ? 'error' : ''} help={localVersionError || ''}>
          {getFieldDecorator('localVersion', {
            rules: [{ required: true, message: 'Please input your localVersion!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Local Version"  value={this.state.local_version} onChange={this.localVersionHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={namespaceError ? 'error' : ''} help={namespaceError || ''}>
          {getFieldDecorator('namespace', {
            rules: [{ required: true, message: 'Please input your namespace!' }],
          })(
            <Input
              prefix={<Icon type="data" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Namespace"  value={this.state.namespace} onChange={this.namespaceHandler.bind(this)}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default UpdateProcessorForm;
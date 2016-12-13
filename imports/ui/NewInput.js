import React from 'react';
import { render } from 'react-dom';

export class NewInput extends React.Component {
  constructor(props) {
    super();

    this.state = {
      key: '',
      value: '' 
    }

    this.setKey = this.setKey.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setPlaceholderValues = this.setPlaceholderValues.bind(this);
  }

  setKey(e) {
    this.setState({key: e.target.value});
  }

  setValue(e) {
    this.setState({value: e.target.value});
  }

  setPlaceholderValues() {
    let newKeyValuePair = {key: this.state.key, value: this.state.value};
    this.setState({key: '', value: ''});
    this.props.setPlaceholderVal(newKeyValuePair);
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Key</label>
          <input className="form-control" value={this.state.key} onChange={this.setKey} />
          <label>Value</label>
          <input className="form-control" value={this.state.value} onChange={this.setValue} />
        </div>
        <div className="form-group">
          <button className="btn btn-success" onClick={this.setPlaceholderValues}>Submit</button>
        </div>
      </div>
    );
  }
} 
import React from 'react';
import {render} from 'react-dom';
import { Editor, EditorState, ContentState, RichUtils, convertFromHTML, convertFromRaw, convertToRaw } from 'draft-js';

export class SpecialEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
			contentState: '',
    }

    this.onChange = (editorState) => this.setState({editorState});
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  setPlaceholderA(e){
    console.log(e.target.value)
  }

  setPlaceholderB(e){
    console.log(e.target.value)
  }

  handleKeyCommand(command) {
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

		if (newState) {
		this.onChange(newState);
			return ;
		}
		return ;
	}

  render () {
    return ( 
      <div className="container">
        <div className="col-md-6">
          <label> label a </label>
          <input className="form-control" onChange={this.setPlaceholderA} />
          <label>label b </label>
          <input className="form-control" onChange={this.setPlaceholderB} />
        </div>

        
        <div className="col-md-6">
        <div className="alert alert-warning">
          <p>Use curly braces for adding placeholder values</p>
        </div>
          <div className="editor">
            <Editor
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    )
  }
}
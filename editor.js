import React from 'react';
import {render} from 'react-dom';
import { Editor, EditorState, ContentState, RichUtils, convertFromHTML, convertFromRaw, convertToRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

export class SpecialEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
			contentState: '',
      name: '',
      surname: '',
      currentHtml: '',
    }

    // Set editor state for exporting data to html lateron
    this.onChange = (editorState) => this.setState({editorState});
		
    // Bind methods to access the right this context
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.setName = this.setName.bind(this);
    this.setSurName = this.setSurName.bind(this);
    this.getCurrentHtml = this.getCurrentHtml.bind(this);
    this.replacePlaceholders = this.replacePlaceholders.bind(this);
  }

  setName(e) {
    this.setState({name: e.target.value});
  }

  setSurName(e) {
    this.setState({surname: e.target.value});
  }

  replacePlaceholders(currentHtml) {
    if(!currentHtml) return;
    let newHtml = currentHtml;

    // Set placeholders
    let placeholders = ["name", "surname"];

    // Set regular expression for each placeholder
    placeholders.map( placeholder => {
      let newReg = placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      let reg = new RegExp("{" + newReg + "}", 'g');

      // Mutate newHtml
      newHtml = newHtml.replace(reg, this.state[placeholder]);
    });

    return newHtml;
  }

  getCurrentHtml() {
    // Get current html from the editorState
     let currentHtml = stateToHTML(this.state.editorState.getCurrentContent());
     
     const newHtml = this.replacePlaceholders(currentHtml);
     this.setState({currentHtml: newHtml});
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
        <div className="col-md-6 form-group">
          <label>Name</label>
          <input className="form-control" onChange={this.setName} />
          <label>Surname</label>
          <input className="form-control" onChange={this.setSurName} />
        </div>

        
        <div className="col-md-6">
          <div className="alert alert-warning">
            <p>Use curly braces for adding placeholder values</p>
            <p>Example: {"{name}"} </p>
          </div>

          <div className="editor col-md-12">
            <Editor
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
            />
          </div>

          {this.state.currentHtml && this.state.currentHtml !== "<p><br></p>" ? 
            <div className="alert alert-success">
             <label>Preview</label>
              <div dangerouslySetInnerHTML={{__html: this.state.currentHtml}} />
            </div>
          : "" }

          <div className="row col-md-12 text-center">
            <button onClick={this.getCurrentHtml} className="btn btn-success">Preview</button>
          </div>
        </div>
      </div>
    )
  }
}
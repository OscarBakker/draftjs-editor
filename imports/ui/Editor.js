import React from 'react';
import { render } from 'react-dom';
import { Editor, EditorState, ContentState, RichUtils, convertFromHTML, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Preview } from './Preview';
import { replacePlaceholders } from '../lib/replacers';
import { NewInput } from './NewInput';
import _ from 'underscore';

export class SpecialEditor extends React.Component {
  constructor(props) {
    super();

    this.state = {
      editorState: EditorState.createEmpty(),
			contentState: '',
      currentHtml: '',
      placeholderList: [],
    }

    // Set editor state for exporting data to html
    this.onChange = (editorState) => this.setState({editorState});
		
    // Bind methods to access the right this context
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.getCurrentHtml = this.getCurrentHtml.bind(this);
    this.removePreview = this.removePreview.bind(this);
    this.setPlaceholderVal = this.setPlaceholderVal.bind(this);
  }

  setPlaceholderVal(obj) {
    let newPlaceholderList = this.state.placeholderList;
    newPlaceholderList.push(obj);
    this.setState({placeholderList: newPlaceholderList});
  }

  removePreview() {
    this.setState({currentHtml: ''});
  }

  /*
  * Methods for getting and setting content draftJS editor
  */
  getCurrentHtml() {
     let currentHtml = stateToHTML(this.state.editorState.getCurrentContent());
     const newHtml = replacePlaceholders(currentHtml, this.state.placeholderList);
     this.setState({currentHtml: newHtml});
  }

  handleKeyCommand(command) {
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    
    // Set new state for styles in editor 
		if (newState) {
	  	this.onChange(newState);
			return ;
		}
		return ;
	}

  render () {
    return ( 
      <div className="row">
        <div className="col-md-6 ">
          <div className="col-md-12 well">
            <NewInput
              setPlaceholderVal={this.setPlaceholderVal}
            />

            <div className="form-group">
              <button onClick={this.getCurrentHtml} className="btn btn-success">Preview</button>
            </div>
          </div>

          <div className="col-md-12 well">
            <h2>Placeholder list {this.state.placeholderList.length === 0 ? "is empty" : "" }</h2>
              <ul>
                {this.state.placeholderList.map((val, i) => {
                  return (
                    <li key={i} ><b>key:</b> {val.key} <b>value:</b> {val.value}</li>
                  )
                })}
              </ul>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="col-md-12 well">
            <div className="alert alert-warning">
              <p>Use curly braces for adding placeholder keys between text:</p>
              <p>Example: { "Hello {name} {surname} living at {adress}"} </p>
              <hr/>
              <p><b>Use command + b for bold</b></p>
              <p><i>Use command + i for italic</i></p>
              <p><u>Use command + u for underline</u></p>
            </div>

            <div className="editor col-md-12">
              <Editor
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
              />
            </div>
          </div>
        </div>

        <Preview
          currentHtml={this.state.currentHtml}
          removePreview={this.removePreview}
        />
      </div>
    )
  }
}
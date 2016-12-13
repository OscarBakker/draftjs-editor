import React from 'react';
import {render} from 'react-dom';

export class Preview extends React.Component {
  render() {
    const currentHtml = this.props.currentHtml;

    return (
      <div>
        {currentHtml && currentHtml !== "<p><br></p>" ? 
          
          <div onClick={this.props.removePreview} className="preview-screen alert alert-success">
            <label>Preview</label><span className="glyphicon glyphicon-remove pull-right"></span>
            <div dangerouslySetInnerHTML={{__html: currentHtml}} />
          </div>

        : "" }
      </div>
    )
  };
}
require("!style!css!./style.css");
import React from 'react';
import {render} from 'react-dom';
import { SpecialEditor } from './Editor';

class App extends React.Component {
  render () {
    return ( 
      <div className="container">
        <h1>Draft editor!</h1>

        <SpecialEditor/>
      </div>
    )
  }
}

render(<App/>, document.getElementById('root'));
import React, { Component } from 'react';
import { render } from 'react-dom';
import Paper from './pages/Paper';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return <Paper />;
  }
}

render(<App />, document.getElementById('root'));
registerServiceWorker();

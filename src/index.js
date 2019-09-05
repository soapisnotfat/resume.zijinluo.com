import React, { Component } from 'react';

import Paper from './pages/Paper';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return <Paper />;
  }
}

render(<App />, document.getElementById('root'));
registerServiceWorker();

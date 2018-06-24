'use strict';

import * as React from 'react';
import { HashRouter as Router } from 'react-router-dom';
// import Provider from './provider/provider';
// import Header from './header/header';
// import Footer from './footer/footer';
import Routes from './routes';

class App extends React.Component {
  render() {
    return (
        <Router>
          <Routes/>
        </Router>
    );
  }
}

export default App;

import * as React from 'react';

import { Route } from 'react-router-dom';

// Pages

import { Home, Start, ViewClass, ViewJF } from './pages';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Route exact path='/' component={Start} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/turma' component={ViewClass} />
        <Route exact path='/jf' component={ViewJF} />
      </div>
    );
  }
}

export default App;

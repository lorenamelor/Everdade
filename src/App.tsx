import * as React from 'react';

import { Route } from 'react-router-dom';

// Pages

import { Home, Login, SignUp, ViewClass, ViewJF } from './pages';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route path='/home' component={Home} />
        <Route path='/turma' component={ViewClass} />
        <Route path='/jf' component={ViewJF} />
      </div>
    );
  }
}

export default App;

import * as React from 'react';

import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages

import { Home, Login, SignUp, ViewClass, ViewJF } from './pages';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/home' component={Home} />
        <Route path='/turma/:idClass' component={ViewClass} />
        <Route path='/jf' component={ViewJF} />
      </div>
    );
  }
}

export default App;

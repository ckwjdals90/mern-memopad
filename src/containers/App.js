import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from 'components';
import { Home, Login, Register } from 'containers';

class App extends Component {
  render(){

    return (
      <Router>
          <div>
          <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
      </Router>
    );
  }
}

export default App;

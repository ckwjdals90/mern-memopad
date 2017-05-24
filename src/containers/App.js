import React, { Component } from 'react';
import { Header } from 'components';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render(){

    let re = /(login|register)/;
    let isAuth = re.test(this.props.location);

    return (
      <div>
        { isAuth ? undefined : <Header /> }
        { this.props.children }
      </div>
    );
  }
}

export default App;

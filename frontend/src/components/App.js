import React, { Component } from 'react';
import '../styles/css/App.css';
import Strings from '../constants/strings';


class App extends Component {
  render() {
    return (
      <div>
        <header className="header-base">
          <h1 className="header-title">
            {Strings.appName}
          </h1>
          <div className="header-iconwrap">
            <a className="header-icon-item" href={'#/'}>
              <i className="material-icons header-icon">
                account_circle
              </i>
            </a>
          </div>
        </header>
        <div className="content">
          <p className="App-intro">
            To get started, edit
            <code>
              src/App.js
            </code>
            and save to reload.
          </p>
        </div>
      </div>
    );
  }
}

export default App;

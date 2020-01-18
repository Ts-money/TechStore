import React, { Component } from "react";
import logo from "./circular.gif";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row" id="header">
          <div className="row">
            <div className="col-md">
              <div className="App-header">
                <span className="logo">
                  <img src={logo} className="App-logo" alt="logo" />
                </span>
                <h1 className="App-title">TechMarket</h1>
                <div className="form-group has-search">
                  <input
                    type="text"
                    class="fa fa-search form-control"
                    placeholder="Search"
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md"></div>
          </div>
        </div>
        <div className="row">
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </div>
    );
  }
}

export default App;

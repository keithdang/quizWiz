import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import Results from "./Results";
import { connect } from "react-redux";
import * as actions from "../actions";
import "./App.less";
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/results" component={Results} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(
  null,
  actions
)(App);
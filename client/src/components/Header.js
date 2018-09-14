import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null: //tried null but doesn't work
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Log In With Google</a>
          </li>
        );
      default:
        return [
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    const { auth } = this.props;
    return (
      <nav>
        <div className="nav-wrapper quizHead">
          <Link
            //to="/"
            to={auth && auth.submitted ? "/results" : "/"}
            className="left brand-logo"
          >
            QuizWiz
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);

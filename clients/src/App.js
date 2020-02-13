import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "./redux/actions";
import { history } from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./containers/Login";
import Table from "./containers/Table";
import Settings from "./containers/Settings";

class App extends Component {
  UNSAFE_componentWillMount() {
    this.props.updateUser();
  }

  render() {
    return (
      <Router hisory={history}>
        <Switch>
          <Route path="/auth" component={Login} />
          <PrivateRoute path="/" exact component={Table} />
          <PrivateRoute path="/settings" component={Settings} />
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: () => dispatch(updateUser())
});

App.propTypes = {
  updateUser: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(App);

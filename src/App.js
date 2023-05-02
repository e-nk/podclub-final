import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Chatroom from "./components/Chatroom";
import Navbar from "./components/Navbar";
import Messaging from "./components/Messaging";
import Footer from "./components/Footer";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("https://podclub-backend.onrender.com/logged_in", { withCredentials: true })
      .then((response) => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user,
          });
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    axios
      .delete("https://podclub-backend.onrender.com/logout", { withCredentials: true })
      .then((response) => {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {},
        });
        
        // Check if history prop exists before using it
        if (this.props.history) {
          this.props.history.push("/");
        }
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  }
  

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {this.state.loggedInStatus === "LOGGED_IN" ? (
                <>
                  <Navbar
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                  <Home />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route
              exact
              path="/login"
              render={() =>
                this.state.loggedInStatus === "LOGGED_IN" ? (
                  <Redirect to="/" />
                ) : (
                  <Login handleLogin={this.handleLogin} />
                )
              }
            />
            <Route
              exact
              path="/signup"
              render={() =>
                this.state.loggedInStatus === "LOGGED_IN" ? (
                  <Redirect to="/" />
                ) : (
                  <Signup />
                )
              }
            />
            <Route
              exact
              path="/chatroom"
              render={() =>
                this.state.loggedInStatus === "LOGGED_IN" ? (
                  <>
                    <Navbar
                      handleLogin={this.handleLogin}
                      handleLogout={this.handleLogout}
                      loggedInStatus={this.state.loggedInStatus}
                    />
                    <Chatroom userId={this.state.user.id} />
                  </>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/chatroom/:id"
              render={({ match }) =>
                this.state.loggedInStatus === "LOGGED_IN" ? (
                  <>
                    <Navbar
                      handleLogin={this.handleLogin}
                      handleLogout={this.handleLogout}
                      loggedInStatus={this.state.loggedInStatus}
                    />
                    <Messaging
                      chatroomId={match.params.id}
                      userId={this.state.user.id}
                    />
                  </>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
  
}
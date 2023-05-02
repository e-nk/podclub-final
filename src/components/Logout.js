import React, { Component } from "react";
import axios from "axios";

export default class Logout extends Component {
    constructor(props) {
        super(props);
    
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/dashboard");
      }
    
      handleLogoutClick() {
        axios
          .delete("https://chat-room-ig50.onrender.com/logout", { withCredentials: true })
          .then(response => {
            this.props.handleLogout();
          })
          .catch(error => {
            console.log("logout error", error);
          });
      }
      
      render() {
        return (
          <div>
            <h1>Home</h1>
            <h1>Status: {this.props.loggedInStatus}</h1>
            <button onClick={() => this.handleLogoutClick()}>Logout</button>
            {/* <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} /> */}
          </div>
        );
      }
}



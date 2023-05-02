import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import axios from "axios";


export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }
  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
        this.props.history.push("/login");
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }
  render() {
  return (
    <nav>
      <div class="navbar-brand">
        <Link to="/">Podclub</Link>
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/chatroom">Chatroom</Link>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
      </div>
    </nav>
  );
  }
}

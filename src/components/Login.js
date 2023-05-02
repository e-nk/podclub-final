import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Login.css";
import logo from "./assets/PodClub__2_- white.png"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/");
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    axios
      .post(
        "http://localhost:3000/sessions",
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
          this.props.history.push("/");
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="logo" />
        </div>
      </nav>
      <div className="login-page">
      <h1>Login to continue</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          </div>

          <button className="btn btn-primary" onClick={() => this.handleSuccessfulAuth()}>Login</button>
        </form>
        </div>
        <div className="sign-up-container">
          Don't have an account? <Link to="/signup">Create an account</Link>.
        </div>

      </div>
    );
  }
}
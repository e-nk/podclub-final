import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Login.css";
import logo from "./assets/PodClub__2_- white.png"

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const { email, password } = this.state;

    axios
      .post(
        "https://podclub-backend.onrender.com/sessions",
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
          this.props.handleLogin(response.data);
          this.props.history.push("/");
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
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

          <button className="btn btn-primary">Login</button>
        </form>
        </div>
        <div className="sign-up-container">
          Don't have an account? <Link to="/signup">Create an account</Link>.
        </div>

      </div>
    );
  }
}
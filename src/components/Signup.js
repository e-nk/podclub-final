import React, { Component } from "react";
import axios from "axios";
import logo from "./assets/PodClub__2_- white.png";
import { Link } from "react-router-dom";
import "../css/Signup.css";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username:"",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
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
    const { username,email, password, password_confirmation } = this.state;

    axios
      .post(
        "http://localhost:3000/registrations",
        {
          user: {
            username: username,
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
          this.props.history.push("/login");
        }
      })
      .catch(error => {
        console.log("registration error", error);
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
      <div className="sign-up-page">
      <h1>Sign up for free</h1>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          </div>
          <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          </div>
          
          <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          </div>

          <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          </div>

          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        </div>
        <div className="login-container">
          Already have an account? <Link to="/login">Login</Link>.
        </div>
      </div>
    );
  }
}
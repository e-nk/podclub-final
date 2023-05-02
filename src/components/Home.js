import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Channels from "./assets/icons8-music-library-50.png";
import Logo from "./assets/PodClub__1_- black.png";
import Invite from "./assets/icons8-invite-50.png";
import Login from "./assets/icons8-name-64.png";
//import logout from "./assets/icons8-log-out-64.png";
// import Registration from "./auth/Registration";
// import Login from "./auth/Login";

import "../css/Home.css";
export default class Home extends Component {
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
      .delete("http://localhost:3000/logout", { withCredentials: true })
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
        <div className="Container">
            <div className="Sidebar">
                <div className="SidebarContent">
                <img src={Logo} className="LogoImage" alt="logo" />
                <div className="Icons">
                  <div className="Content">
                  <Link to="/login">
                        <img src={Login} className="" alt="channels" />
                        <p></p>
                    </Link>
                  </div>
                    <div className="Content">
                
                    <Link to="/channels">
                        <img src={Channels} className="" alt="channels" />
                        <p></p>
                    </Link>
                    </div>
                    <div className="Content">
                    <Link to="/invite">
                        <img src={Invite} className="" alt="invite" />
                        <p></p>
                    </Link>
                   
                    </div>
                    <div className="Content">
                    {/* <Link to="/logout">
                        <img src={logout} className="" alt="logout" onClick={handleLogoutClick} />
                        <p></p>
                    </Link> */}

                    </div>
                </div>
                </div>
            </div>
            <div className="MainContainer">
                <div className="Tint"></div>
                <div className="Quote">
                <p>
                    'People want their 15 minutes and are <br></br> willing to do anything to get it' <br></br>~ Joe Rogan
                </p>
                </div>
            </div>
            </div>
        <p>Status: {this.props.loggedInStatus}</p>
        
      </div>
    );
  }
}
// import React, { Component} from "react";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
// import axios from "axios";
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Home from './components/Home';
// import Chatroom from './components/Chatroom';
// import Navbar from './components/Navbar';
// import ChatroomPage from "./components/Chat(ignore this)";
// import Messaging from "./components/Messaging";
// import Footer from './components/Footer';

// export default class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       loggedInStatus: "NOT_LOGGED_IN",
//       user: {}
//     };

//     this.handleLogin = this.handleLogin.bind(this);
//     this.handleLogout = this.handleLogout.bind(this);
//   }

//   checkLoginStatus() {
//     axios
//       .get("https://podclub-backend.onrender.com/logged_in", { withCredentials: true })
//       .then(response => {
//         if (
//           response.data.logged_in &&
//           this.state.loggedInStatus === "NOT_LOGGED_IN"
//         ) {
//           this.setState({
//             loggedInStatus: "LOGGED_IN",
//             user: response.data.user
//           });
//         } else if (
//           !response.data.logged_in &
//           (this.state.loggedInStatus === "LOGGED_IN")
//         ) {
//           this.setState({
//             loggedInStatus: "NOT_LOGGED_IN",
//             user: {}
//           });
//         }
//       })
//       .catch(error => {
//         console.log("check login error", error);
//       });
//   }

//   componentDidMount() {
//     this.checkLoginStatus();
//   }

//   handleLogout() {
//     this.setState({
//       loggedInStatus: "NOT_LOGGED_IN",
//       user: {}
//     });
//   }

//   handleLogin(data) {
//     this.setState({
//       loggedInStatus: "LOGGED_IN",
//       user: data.user
//     });
//   }

//   render() {
//     const { loggedInStatus } = this.state;
//     return (
//       <div className="app">
//         <BrowserRouter>
//         <div>{loggedInStatus === "LOGGED_IN" ? (
//         <Navbar
//             handleLogin={this.handleLogin}
//             handleLogout={this.handleLogout}
//             loggedInStatus={this.state.loggedInStatus}
//           />): null}
//           <Switch>
//             <Route
//               exact
//               path={"/"}
//               render={props => (
//                 <Home
//                   {...props}
//                   handleLogin={this.handleLogin}
//                   handleLogout={this.handleLogout}
//                   loggedInStatus={this.state.loggedInStatus}
//                 />
//               )}
//             />
//             <Route
//               exact
//               path={"/chatroom"}
//               render={props => (
//                 <Chatroom
//                   {...props}
//                   loggedInStatus={this.state.loggedInStatus}
//                   userId={this.state.user.id}
//                 />
//               )}
//             />
//             <Route
//               exact
//               path={"/chat"}
//               render={props => (
//                 <ChatroomPage
//                   {...props}
//                   loggedInStatus={this.state.loggedInStatus}
//                 />
//               )}
//             />
//             <Route
//               exact
//               path={"/login"}
//               render={props => (
//                 <Login
//                   {...props}
//                   loggedInStatus={this.state.loggedInStatus}
//                   handleLogin={this.handleLogin}
//                 />
//               )}
//             />
//             <Route
//               exact
//               path={"/signup"}
//               render={props => (
//                 <Signup
//                   {...props}
//                   loggedInStatus={this.state.loggedInStatus}
//                 />
//               )}
//             />
//             <Route
//               path="/chatroom/:id"
//             render={({ match }) => <Messaging chatroomId={match.params.id} />}
// />

//           </Switch>
//           </div>
//           <Footer/>
//         </BrowserRouter>
//       </div>
//     );
//   }
// }


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
      .get("http://localhost:3000/logged_in", { withCredentials: true })
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
      .delete("http://localhost:3000/logout", { withCredentials: true })
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
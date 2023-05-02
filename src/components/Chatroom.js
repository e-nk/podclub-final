import React, { Component } from "react";
import axios from "axios";
import Messaging from "./Messaging";
import logo from '../components/assets/PodClub__2_- white.png';
import "../css/Chatroom.css";

export default class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatrooms: [],
      newChatroomName: "",
      newChatroomDescription: "",
      updateChatroomName: "",
      updateChatroomDescription: "",
      chatroomIdToUpdate: null,
      error: null,
      selectedChatroomId: null, // add selected chatroom id to state
    };

    // Bind event handlers
    this.handleNewChatroomNameChange = this.handleNewChatroomNameChange.bind(this);
    this.handleNewChatroomDescriptionChange = this.handleNewChatroomDescriptionChange.bind(this);
    this.handleNewChatroomSubmit = this.handleNewChatroomSubmit.bind(this);
    this.handleChatroomDelete = this.handleChatroomDelete.bind(this);
    this.handleChatroomUpdate = this.handleChatroomUpdate.bind(this);
    this.handleUpdateChatroomNameChange = this.handleUpdateChatroomNameChange.bind(this);
    this.handleUpdateChatroomDescriptionChange = this.handleUpdateChatroomDescriptionChange.bind(this);
    this.handleViewChatroom = this.handleViewChatroom.bind(this);
  }

  componentDidMount() {
    this.fetchChatrooms();
  }

  fetchChatrooms() {
    axios.get("http://localhost:3000/chatroom", { withCredentials: true })
      .then(response => {
        this.setState({
          chatrooms: response.data,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error,
        });
      });
  }

  handleNewChatroomNameChange(event) {
    this.setState({ newChatroomName: event.target.value });
  }

  handleNewChatroomDescriptionChange(event) {
    this.setState({ newChatroomDescription: event.target.value });
  }

  handleUpdateChatroomNameChange(event) {
    this.setState({ updateChatroomName: event.target.value });
  }

  handleUpdateChatroomDescriptionChange(event) {
    this.setState({ updateChatroomDescription: event.target.value });
  }

  handleNewChatroomSubmit(event) {
    event.preventDefault();
    const { newChatroomName, newChatroomDescription } = this.state;
    const chatroom = { name: newChatroomName, description: newChatroomDescription };
    axios.post("http://localhost:3000/chatroom", chatroom, { withCredentials: true })
      .then(response => {
        this.setState({
          chatrooms: [...this.state.chatrooms, response.data],
          newChatroomName: "",
          newChatroomDescription: "",
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error,
        });
      });
  }

  handleChatroomDelete(chatroomId) {
    axios.delete(`http://localhost:3000/chatroom/${chatroomId}`, { withCredentials: true })
      .then(response => {
        const updatedChatrooms = this.state.chatrooms.filter(chatroom => chatroom.id !== chatroomId);
        this.setState({
          chatrooms: updatedChatrooms,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error,
        });
      });
  }

  handleChatroomUpdate(event) {
    event.preventDefault();
    const { updateChatroomName, updateChatroomDescription, chatroomId} = this.state;
    const updatedChatroom = { name: updateChatroomName, description: updateChatroomDescription };
    axios.put(`http://localhost:3000/chatroom/${chatroomId}`, updatedChatroom, { withCredentials: true })
    .then(response => {
    const updatedChatrooms = this.state.chatrooms.map(chatroom => {
    if (chatroom.id === response.data.id) {
    return response.data;
    }
    return chatroom;
    });
    this.setState({
    chatrooms: updatedChatrooms,
    updateChatroomName: "",
    updateChatroomDescription: "",
    chatroomIdToUpdate: null,
    });
    })
    .catch(error => {
    console.log(error);
    this.setState({
    error: error,
    });
    });
    }
    
    handleViewChatroom(chatroomId) {
    this.setState({ selectedChatroomId: chatroomId });
    }
    
    render() {
    const {
    chatrooms,
    newChatroomName,
    newChatroomDescription,
    updateChatroomName,
    updateChatroomDescription,
    chatroomIdToUpdate,
    error,
    selectedChatroomId,
    } = this.state;
    if (error) {
      return <div>An error occurred: {error.message}</div>;
    }
    
    return (
      <div className="Container" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height: "100vh"}}>
        <div className="Sidebar" style={{ backgroundColor: "black", width: "20%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <div className="SidebarContent" style={{ margin: "2rem"}}>
          <img src={logo} className="LogoImage" alt="logo" style={{ width: "80%", marginBottom: "2rem"}}/>  
        </div>
        </div>
        <div className="Main" style={{ width: "80%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <h1 className="channel-heading" style={{textAlign: "center"}}>Chatrooms</h1>
        <ul className="channel-list" style={{listStyleType: "none", paddingLeft: "0"}}>
          {chatrooms.map(chatroom => (
            <li key={chatroom.id} className="channel-item" style={{margin: "1rem"}}>
              {chatroom.name} - {chatroom.description}
              <div className="channel-action-buttons">
              <button class="btn btn-danger me-md-2" onClick={() => this.handleChatroomDelete(chatroom.id)}>Delete</button>
              <button class="btn btn-info me-md-2" onClick={() => this.setState({ chatroomIdToUpdate: chatroom.id })}>Update</button>
              {/* <button class="btn btn-secondary me-md-2" onClick={() => this.handleViewChatroom(chatroom.id)}>View</button> */}
              <a href="https://podclub-frontend.onrender.com/rooms/1" class="btn btn-secondary me-md-2">View</a>


              </div>
            </li>
          ))}
        </ul>
        <h2>Create a new chatroom</h2>
        <form className="channel-form" onSubmit={this.handleNewChatroomSubmit}>
          <label  className="channel-label" htmlFor="channelName">
            Name:
            <input className="channel-input channel-name-input" id="channelName" type="text" value={newChatroomName} onChange={this.handleNewChatroomNameChange} />
          </label>
          <br />
          <label className="channel-label" htmlFor="channelDescription">
            Description:
            <input className="channel-input channel-description-input" id="channelDescription" type="text" value={newChatroomDescription} onChange={this.handleNewChatroomDescriptionChange} />
          </label>
          <br />
          <button className="channel-button channel-create-button" type="submit">Create</button>
        </form>
        {chatroomIdToUpdate && (
          <div>
            <h2>Update chatroom</h2>
            <form onSubmit={this.handleChatroomUpdate}>
              <label>
                Name:
                <input type="text" value={updateChatroomName} onChange={this.handleUpdateChatroomNameChange} />
              </label>
              <br />
              <label>
                Description:
                <input type="text" value={updateChatroomDescription} onChange={this.handleUpdateChatroomDescriptionChange} />
              </label>
              <br />
              <button type="submit">Update</button>
            </form>
            
          </div>
        )}
        {/* Render Messaging component if selectedChatroomId is not null */}
        {selectedChatroomId && <Messaging chatroomId={selectedChatroomId} />}
      </div>
      </div>
    );
        }
      }

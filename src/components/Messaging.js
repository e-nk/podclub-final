import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Messaging({ chatroomId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch messages for this chatroom
    axios
      .get(`https://podclub-backend.onrender.com/messages/${chatroomId}`, { withCredentials: true })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chatroomId]);

  const handleNewMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleNewMessageSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      content: message,
      chatroom_id: chatroomId,
    };
    axios
      .post('https://podclub-backend.onrender.com/message', newMessage, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        // Add the new message to the list of messages
        setMessages([...messages, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
    setMessage('');
  };

  return (
    <div>
      <h4>Messages</h4>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.content}</p>
        </div>
      ))}
      <form onSubmit={handleNewMessageSubmit}>
        <span>Message</span>
        <input type="text" placeholder="Type your message here" value={message} onChange={handleNewMessageChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Messaging;

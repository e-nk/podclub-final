import React, { useState, useEffect } from 'react';

function MessageList({ chatroomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/message?chatroom_id=${chatroomId}`)
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, [chatroomId]);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>{message.content}</div>
      ))}
    </div>
  );
}

function MessageForm({ chatroomId }) {
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, chatroom_id: chatroomId }),
    }).then(() => {
      setContent('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function ChatroomPage({ match }) {
  const chatroomId = match.params.id;

  return (
    <div>
      <h1>Chatroom {chatroomId}</h1>
      <MessageList chatroomId={chatroomId} />
      <MessageForm chatroomId={chatroomId} />
    </div>
  );
}

export default ChatroomPage;

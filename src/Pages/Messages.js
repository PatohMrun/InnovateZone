import React, { useState, useEffect } from "react";
import useFetch from "../Components/Fetch";
import "../styles/Messages.css"

function Messages() {
  const {data:sms, error, pending}=useFetch('https://blog-server-kohl.vercel.app/sms')
  const [mess, setMess] = useState([]);
  

  useEffect(() => {
    if (sms) {
      setMess(sms);
    }
  }, [sms]);
  if (pending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!sms || sms.length === 0) {
    return <p>No messages found.</p>;
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    const formattedTime = hours + ':' + minutes + ' ' + ampm;
    return `${formattedDate} at ${formattedTime}`;
  };
  
  console.log(sms[0].sent_at);

  const handleDelete=(messageID)=>{
    console.log("tiga wagna");
    fetch("https://blog-server-kohl.vercel.app/DeleteMessage",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({messageID})
    }).then((res)=>{
      if (res.ok) {
        console.log("message deleted successfully");
        setMess((prevSms) => prevSms.filter((message) => message.messageID !== messageID));
      }
    })

  }
  console.log(sms);
  return (
    <div className="messages-container">
      <h1 className="messages-title">Messages</h1>
      <ul className="messages-list">
        {mess.map((message, index) => (
          <li key={index} className={`message ${message.name === 'John' ? 'message-from-me' : 'message-from-them'}`}>
            <div className="message-sender">{message.name}</div>
            <div className="message-timestamp">{formatTimestamp(message.sent_at)}</div>
            <div className="message-text">{message.messages}</div>
            <button onClick={() => handleDelete(message.messageID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;

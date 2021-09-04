import React, { useState,useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  useEffect(() => {
    db.collection('messages').onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc => doc.data()))
    })
 
   } ,[])

  useEffect(() => {
   setUsername( prompt("Please Enter you Name"))

  } ,[])

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, {username: username, text: input}]);
    setInput('');

  }

  

  return (
    <div className="App">
      <h1>HEllo {username} 🔥 </h1>
      <form>
      <FormControl>
        <InputLabel >Enter a Message</InputLabel>
        <Input value={input} onChange={event=> setInput(event.target.value)} />
        <Button disabled={!input} variant = "contained" color = "primary" type = 'submit' onClick={sendMessage}>Send Message</Button>
    </FormControl>
        
      </form>
      
      {/* messages */}
      {
        messages.map(message => (
        <Message username={username} message={message} />
      )) 
      }
    </div>
  );
}

export default App;

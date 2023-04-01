import React from 'react'
import {useState} from 'react'

export default function RegisterPage() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
    
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
      );
    }
    


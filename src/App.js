import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/users")
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])
  console.log(user);
  let count = {};
  for (let i = 0; i < user.length; i++) {
    let email = user[i].email;
    if (count[email]) {
      count[email]++;
    } else {
      count[email] = 1;
    }
  }
  for (let i = 0; i < user.length; i++) {
    if (count[user[i].email] > 1) {
      console.log('email bị trùng là: ', user[i].email);
    } else if (count[user[i].email] === 1) {
      console.log('email không bị trùng là: ', user[i].email);
      break;
    }
  }

  let salary = [];
  user.map((user) => {
    salary.push(user.salary);
  })

  for (let i = 0; i < salary.length - 1; i++) {
    for (let j = i + 1; j < salary.length; j++) {
      if (salary[i] < salary[j]) {
        let temp = salary[j];
        salary[j] = salary[i];
        salary[i] = temp;
      }
    }
  }
  console.log("Mức lương cao thứ 2 là: ", salary[1]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

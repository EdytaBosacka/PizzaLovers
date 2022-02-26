import express from 'express';
import cors from 'cors';
import { addSyntheticLeadingComment } from 'typescript';

const app = express();
const port = 3001;
const registeredUsers = [{ userName: 'admin', password: 'admin' }];
const userInfo = {};

app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;
  if (registeredUsers.find(element => element.userName === username && element.password === password)) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Password or/and login is invalid. Please try again.');
  }
});

app.post('/register', (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;
  if (registeredUsers.find(element => element.userName === username)) {
    res.status(409).send('Login already exists.');
  } else {
    registeredUsers.push({ userName: username, password: password });
    userInfo[username] = { name: req.body.name, dateOfBirth: req.body.dateOfBirth, sex: req.body.sex, localization: req.body.localization };
    res.status(200).send('Registration successful');
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
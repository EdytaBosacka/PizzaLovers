import express, { response } from 'express';
import cors from 'cors';
import { addSyntheticLeadingComment } from 'typescript';

const fs = require('fs');
const app = express();
const port = 3001;
var registeredUsers = [{ login: 'admin', password: 'admin' }];
var userInfo = {};
const registeredUsersFileName = './src/resources/registeredUsers.json';
const usersDetailsFileName = './src/resources/usersDetails.json';

try {
  registeredUsers = JSON.parse(fs.readFileSync(registeredUsersFileName, 'utf8'));
  userInfo = JSON.parse(fs.readFileSync(usersDetailsFileName, 'utf8'));
} catch (err) {
  console.error(err)
}


app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
  const username = req.body.login;
  const password = req.body.password;
  if (registeredUsers.find(element => element.login === username && element.password === password)) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Password or/and login is invalid. Please try again.');
  }
});

app.post('/register', (req, res) => {
  const username = req.body.login;
  const password = req.body.password;
  if (registeredUsers.find(element => element.login === username)) {
    res.status(409).send('Login already exists.');
  } else {
    registeredUsers.push({ login: username, password: password });
    try {
      fs.writeFileSync(registeredUsersFileName, JSON.stringify(registeredUsers));
    } catch (err) {
      console.log(err);
    }

    userInfo[username] = { name: req.body.name, dateOfBirth: req.body.dateOfBirth, gender: req.body.gender, localization: req.body.localization };
    try {
      fs.writeFileSync(usersDetailsFileName, JSON.stringify(userInfo));
    } catch (err) {
      console.log(err);
    }
    res.status(200).send('Registration successful');
  }
});

app.post('/getUsers', (req,res) => {
  var userInfoArray = Object.entries(userInfo);
  userInfoArray = userInfoArray.filter((key) => {
    key != req.body.loggedUser;
  })
  var userInfoFiltered = Object.fromEntries(userInfoArray);

  res.status(200).send(userInfoFiltered);


});


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
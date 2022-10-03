import express, { response } from 'express';
import cors from 'cors';
import { addSyntheticLeadingComment } from 'typescript';

const fs = require('fs');
const app = express();
const port = 3001;
var registeredUsers = [{ login: 'admin', password: 'admin' }];
var userInfo = {};
var userImages = {};
const registeredUsersFileName = './src/resources/registeredUsers.json';
const usersDetailsFileName = './src/resources/usersDetails.json';
const usersImagesFileName = './src/resources/usersImages.json';

try {
  registeredUsers = JSON.parse(fs.readFileSync(registeredUsersFileName, 'utf8'));
  userInfo = JSON.parse(fs.readFileSync(usersDetailsFileName, 'utf8'));
  userImages = JSON.parse(fs.readFileSync(usersImagesFileName, 'utf8'));
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

app.post('/getUsers', (req, res) => {
  var userInfoArray = Object.entries(userInfo);
  userInfoArray = userInfoArray.filter(([key, value]) => {
    return key != req.body.loggedUser;
  })
  res.status(200).send(userInfoArray);

});

app.post('/uploadImage', (req, res) => {
  const loggedUser = req.body.loggedUser;
  if (!userImages[loggedUser]) {
    userImages[loggedUser] = [];
  }
  userImages[loggedUser].push(req.body.image);
  try {
    fs.writeFileSync(usersImagesFileName, JSON.stringify(userImages));
  } catch (err) {
    console.log(err);
  }
  res.status(200).send('Upload Images successful');


});

app.post('/getImages', (req, res) => {
  const user = req.body.user;
  res.status(200).send(userImages[user]);
});

app.post('/savePassword', (req, res) => {
  const username = req.body.login;
  const password = req.body.password;
  const userIndex = registeredUsers.findIndex(element => element.login === username);
  registeredUsers[userIndex].password = password;
  try {
    fs.writeFileSync(registeredUsersFileName, JSON.stringify(registeredUsers));
  } catch (err) {
    console.log(err);
  }
  res.status(200).send('Password was succesfully changed.');

});

app.post('/saveUserGeneralInformation', (req, res) => {
  const username = req.body.login;
  const userDetails = req.body.userData;
  try {
    userInfo[username].name = userDetails.name;
    userInfo[username].dateOfBirth = userDetails.dateOfBirth;
    userInfo[username].gender = userDetails.gender;
    userInfo[username].localization = userDetails.localization;
    fs.writeFileSync(usersDetailsFileName, JSON.stringify(userInfo));
  }
  catch (err) {
    console.log(err);
  }
  res.status(200).send('User information was succesfully changed.');
});

app.post('/saveUserContactInformation', (req, res) => {
  const username = req.body.login;
  const userContactInfo = req.body.userData;
  try {
    userInfo[username].phoneNumber = userContactInfo.phoneNumber;
    userInfo[username].email = userContactInfo.email;
    userInfo[username].instagram = userContactInfo.instagram;
    userInfo[username].twitter = userContactInfo.twitter;
    fs.writeFileSync(usersDetailsFileName, JSON.stringify(userInfo));
  }
  catch (err) {
    console.log(err);
  }
  res.status(200).send('User contact information was succesfully changed.');
});

app.post('/getUserDetails', (req, res) => {
  const loggedUser = req.body.loggedUser;
  res.status(200).send(userInfo[loggedUser]);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

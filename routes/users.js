const usersRoute = require('express').Router(); // создали роутер
const fs = require('fs');
const path = require('path');

users = [];
const reader = fs.createReadStream(path.join(__dirname, '../data/users.json'), { encoding: 'utf8' });
reader.on('data', (chunk) => {
  users = chunk;
  users = JSON.parse(users);
});

const sendUsers = (req, res) => {
  res.send(users);
};

const doesUserExist = (req, res, next) => {
  const realUser = users.filter((item) => item._id === req.params.id);
  if (realUser.length === 0) {
    res.send({ message: 'Нет пользователя с таким id' });
    return;
  }
  next(); // вызываем next
};

const sendUser = (req, res, next) => {
  res.send(users.filter((item) => item._id === req.params.id));
};

usersRoute.get('/', sendUsers);
usersRoute.get('/:id', doesUserExist);
usersRoute.get('/:id', sendUser);

/*
usersRoute.get('/users', (req, res) => {
  res.send(users);
});

usersRoute.get('/users/:id', (req, res) => {
  const realUser = users.filter((item) => item._id === req.params.id);
  if (realUser.length === 0) {
    res.send({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.send(realUser);
});
*/
module.exports = usersRoute; // экспортировали роутер

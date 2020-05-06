const usersRoute = require('express').Router(); // создали роутер
const fs = require('fs');

users = [];
const reader = fs.createReadStream('./data/users.json', { encoding: 'utf8' });
reader.on('data', function (chunk) {
  users = chunk;
  users = JSON.parse(users);
});

usersRoute.get('/users', (req, res) => {
  res.send(users);
});

usersRoute.get('/users/:id', (req, res) => {
  const realUser = users.filter(item => item._id === req.params.id);
  if (realUser.length === 0) {
    res.send({"message": "Нет пользователя с таким id"});
    return;
  }
  res.send(realUser);
});

module.exports = usersRoute; // экспортировали роутер
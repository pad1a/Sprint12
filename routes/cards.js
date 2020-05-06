const cardsRoute = require('express').Router(); // создали роутер
const fs = require('fs');

cards = [];
const reader = fs.createReadStream('./data/cards.json', { encoding: 'utf8' });
reader.on('data', function (chunk) {
  cards = chunk;
  cards = JSON.parse(cards);
});

cardsRoute.get('/cards', (req, res) => {
  res.send(cards);
});

module.exports = cardsRoute; // экспортировали роутер
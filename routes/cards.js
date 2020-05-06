const cardsRoute = require('express').Router(); // создали роутер
const path = require('path');
const fs = require('fs');

cards = [];
//const reader = fs.createReadStream('./data/cards.json', { encoding: 'utf8' });
const reader = fs.createReadStream(path.join(__dirname, '../data/cards.json'), { encoding: 'utf8' });
reader.on('data', (chunk) => {
  cards = chunk;
  cards = JSON.parse(cards);
});

cardsRoute.get('/', (req, res) => {
  res.send(cards);
});

module.exports = cardsRoute; // экспортировали роутер

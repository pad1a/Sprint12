const cardsRoute = require('express').Router(); // создали роутер
const path = require('path');
const fs = require('fs');


const cardsPath = path.join(__dirname, '../data/cards.json');

/* Проверяем наличие файла, если есть передаем выполнение дальше если нет возвращаем ошибку */
const doesFileExist = (req, res, next) => {
  fs.stat(cardsPath, (err) => {
    if (err == null) {
      return next();
    }
    if (err.code === 'ENOENT') {
      return res.status(500).json({ message: 'Запрашиваемый файл не найден' });
    }
    return res.status(500).json({ message: err.code });
  });
};


const getCardsAsyncAwait = async () => {
  try {
    const data = await fs.promises
      .readFile(cardsPath, { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (error) {
    // return res.status(500).json({ message: 'Запрашиваемый файл не найден' });
    return error;
  }
};

cardsRoute.get('/', doesFileExist);
cardsRoute.get('/', async (req, res) => {
  const cards = await getCardsAsyncAwait();
  res.send(cards);
});

module.exports = cardsRoute; // экспортировали роутер

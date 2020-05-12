const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');


const { PORT = 3000 } = process.env;
const app = express();

// логирование
/* const timeLog = (req, res, next) => {
  console.log(new Date(), req.method);
  next();
};
*/

// app.use(timeLog);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', users);
app.use('/cards', cards);
app.use((req, res) => res.status(404).send({ message: `Запрашиваемый ресурс: ${req.url} не найден` }));
app.use((err, req, res) => res.status(500).json({ message: `Ошибка${err}` }));


// app.use('/cards', cards);

// слушаем сервер при каждом обращении
app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});

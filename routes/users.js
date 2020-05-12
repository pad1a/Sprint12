const usersRoute = require('express').Router(); // создали роутер
const fs = require('fs');
const path = require('path');

const userPath = path.join(__dirname, '../data/users.json');

/* Проверяем наличие файла, если есть передаем выполнение дальше если нет возвращаем ошибку */
const doesFileExist = (req, res, next) => {
  fs.stat(userPath, (err, stat) => {
    if (err == null) {
      next();
    } else if (err.code === 'ENOENT') {
      return res.status(500).json({ message: 'Запрашиваемый файл не найден' });
    } else {
      console.log('Ошибка на сервере: ', err.code);
    }
  });
};

/* Получаем пользователей методом Async\Await */
const getUsersAsyncAwait = async () => {
  try {
    const data = await fs.promises
      .readFile(userPath, { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (error) {
    return console.error(error);
  }
};

/* Получаем конкретного пользователя через промисы */
const getUserPromise = () => fs.promises
  .readFile(userPath, { encoding: 'utf8' })
  .then((data) => JSON.parse(data));

usersRoute.get('/', doesFileExist);
usersRoute.get('/', async (req, res) => {
  const users = await getUsersAsyncAwait();
  res.send(users);
});

usersRoute.get('/:id', doesFileExist);
usersRoute.get('/:id', (req, res) => {
  getUserPromise()
    .then((users) => {
      const user = users.find((item) => item._id === req.params.id);
      if (!user) {
        return res.send({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    });
});

// экспортируем роутер
module.exports = usersRoute;

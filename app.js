const express = require('express');
const router = require('./router.js');
//const api = require('./api.js');
//const backoffice = require('./backoffice.js');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

const timeLog = (req, res, next) => {
    console.log(new Date(), req.method);
    next();
};

app.use(timeLog);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);
//app.use('/api', api);
//app.use('/admin', backoffice);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
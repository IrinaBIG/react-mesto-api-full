require('dotenv').config();

// const { NODE_ENV } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { celebrateSignUp, celebrateSignIn } = require('./middlewares/validation');
const handlerErrors = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

// console.log(process.env.NODE_ENV);
const { PORT = 3000 } = process.env;
const app = express();
app.use(cors);

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger); // подключаем логгер запросов
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', celebrateSignUp, createUser);
app.post('/signin', celebrateSignIn, login);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('*', require('./routes/notFound'));

app.use(errorLogger); // подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(handlerErrors); // централизованнный обработчик

app.listen(PORT, () => {
  // console.log(NODE_ENV);
  // console.log(process.env.NODE_ENV);
  console.log(`App listening on port ${PORT}`);
});

// scp -r ./build/* irinabig1103@158.160.0.17:/home/praktikum/mesto-frontend

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Импортируем модуль path

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Обслуживание статических файлов

// Обработка корневого маршрута
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Отправка HTML-страницы
});

// Обработка GET-запроса для отправки сообщения
app.get('/message', (req, res) => {
  const currentTime = new Date().toLocaleString();
  res.json({ message: `Привет! Текущее время: ${currentTime}` });
});

// Обработка POST-запроса для возврата сообщения с подписью
app.post('/echo', (req, res) => {
  const currentTime = new Date();
  const userMessage = req.body.message;
  res.json({ message: `Вы сказали: "${userMessage}". Время: ${currentTime}` });
});

// Обработка POST-запроса для математических операций
app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;
  let result;

  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: 'Неизвестная операция' });
  }

  res.json({ result, time: new Date().toLocaleString() });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

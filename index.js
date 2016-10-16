const express = require('express');

var app = express();

process.env.NODE_ENV = 'development'; // development/production

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.use(require('./routes'));

app.listen(3000, () => {
  console.log('Server started and listen on http://localhost:3000/');
});

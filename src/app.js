const express = require('express');
require('express-async-errors');
const path = require('path');
const routes = require('./routes');

require('./database');

const app = express();

app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(routes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _) => {
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3000, () => console.log('Server started'));

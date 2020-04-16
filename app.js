const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ErrorHandler } = require('./helper/error');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

require('./router/category')(app);
require('./router/costumer')(app);
require('./router/order')(app);
require('./router/order_detail')(app);
require('./router/product')(app);
require('./router/user')(app);

app.get('*', (req, res) => {
  throw new ErrorHandler(404, 'Page not found!')
});

module.exports = app;
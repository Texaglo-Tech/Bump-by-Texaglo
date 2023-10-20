const express = require('express'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    helmet = require('helmet'),
    cors = require('cors');

const indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),
    productsRouter = require('./routes/products'),
    messagesRouter = require('./routes/messages'),
    paymentRouter = require('./routes/payment'),
    nftRouter = require('./routes/nft'),
    config = require("./config");

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(config.product_images));

app.use('/', indexRouter);
app.use('/api/auth', usersRouter);
app.use('/api/product', productsRouter);
app.use('/api/message', messagesRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/nft', nftRouter);

require('./services/swagger-setup')(app);
require('./services/cron')

module.exports = app;

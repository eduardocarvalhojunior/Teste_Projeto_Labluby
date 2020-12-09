const { Router } = require('express');
const userRouter = require('./user.routes');
const tokenRouter = require('./token.routes');

const routes = Router();

routes.use('/users', userRouter);
routes.use('/tokens', tokenRouter);

module.exports = routes;

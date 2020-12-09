const { Router } = require('express');
const TokenController = require('../controllers/TokenController');

const tokenRouter = Router();

tokenRouter.post('/', TokenController.create);

module.exports = tokenRouter;

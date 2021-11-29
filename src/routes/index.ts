import express from 'express';
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../docs/swagger.json');
import authRouter from './auth';
import orderROuter from './order';
import pizzaRouter from './pizza';

const routes = () => {
  const router = express.Router();
  router.use('/auth', authRouter);
  router.use('/pizza', pizzaRouter);
  router.use('/order', orderROuter);
//   router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  return router;
};

export default routes;
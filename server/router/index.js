const Router = require('express');

const userRouter = require('./userRouter');
const productsRouter = require('./productsRouter');
const categoriesRotuter = require('./categoriesRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRotuter);

module.exports = router;
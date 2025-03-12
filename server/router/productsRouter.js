const Router = require('express');

const productsController = require('../controllers/productsController');
const checkRole = require('../middleware/checkRoleMiddleware');
const checkAuth = require('../middleware/authMiddleware');
const upload = require('../multerConfig');

const router = new Router();

router.post('/', checkRole('ADMIN'), upload.single('img'), productsController.create);
router.get('/', productsController.getAll);
router.get('/:id', checkAuth, productsController.getOne);
router.put('/:id', checkRole('ADMIN'), upload.single('img'), productsController.update);
router.delete('/:id', checkRole('ADMIN'), productsController.delete);

module.exports = router;
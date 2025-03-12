const Router = require('express');

const categoriesController = require('../controllers/categiriesController');
const checkRole = require('../middleware/checkRoleMiddleware');
const checkAuth = require('../middleware/authMiddleware');

const router = new Router();

router.post('/', checkRole('ADMIN'), categoriesController.create);
router.get('/', categoriesController.getAll);
router.get('/:id', checkAuth, categoriesController.getOne);
router.put('/:id', checkRole('ADMIN'), categoriesController.update);
router.delete('/:id', checkRole('ADMIN'), categoriesController.delete);

module.exports = router;
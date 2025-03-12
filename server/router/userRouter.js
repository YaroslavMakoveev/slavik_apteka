const Router = require('express');
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/authMiddleware');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', checkAuth, userController.auth);
router.get('/', checkAuth, userController.getAllUsers); // Новый маршрут для получения всех пользователей
router.put('/:id', checkAuth, userController.updateUser); // Новый маршрут для обновления пользователя
router.delete('/:id', checkAuth, userController.deleteUser); // Новый маршрут для удаления пользователя

module.exports = router;

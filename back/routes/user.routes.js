const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const upload = multer();

// Routes d'authentification
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

// User DB
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;

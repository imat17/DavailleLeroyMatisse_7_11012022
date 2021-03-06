const router = require('express').Router();
const postController = require('../controllers/post.controller');
const upload = require('../middlewares/multer-config.middleware');

// Routes Post
router.get('/', postController.readPost);
router.post('/', upload, postController.createPost);
router.put('/:id', upload, postController.updatePost);
router.delete('/:id', postController.deletePost);

// Routes comments
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

module.exports = router;

import express from 'express'
import * as userController from './controller/user.controller'
import * as postController from './controller/post.controller'

const router = express.Router()

router.get('/users/:id', userController.getUser)
router.get('/users', userController.getUserList)
router.post('/users', userController.createUser)
router.put('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

router.get('/posts/:id', postController.getPost)
router.get('/posts', postController.getPostList)
router.post('/posts', postController.createPost)
router.put('/posts/:id', postController.updatePost)
router.delete('/posts/:id', postController.deletePost)

export default router
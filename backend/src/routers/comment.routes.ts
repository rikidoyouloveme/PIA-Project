import express from 'express'
import { CommentController } from '../controllers/comment.controller';

const commentRouter = express.Router();

commentRouter.route('/add').post(
    (req, res)=>new CommentController().add(req, res)
)
commentRouter.route('/update').post(
    (req, res)=>new CommentController().update(req, res)
)
commentRouter.route('/findAll').get(
    (req, res)=>new CommentController().findAll(req, res)
)


export default commentRouter;
import express from 'express'
import { BookController } from '../controllers/book.controller';

const bookRouter = express.Router();

bookRouter.route('/add').post(
    (req, res)=>new BookController().add(req, res)
)
bookRouter.route('/request').post(
    (req, res)=>new BookController().request(req, res)
)
bookRouter.route('/findAll').post(
    (req, res)=>new BookController().findAll(req, res)
)
bookRouter.route('/findAllRequests').post(
    (req, res)=>new BookController().findAllRequests(req, res)
)
bookRouter.route('/update').post(
    (req, res)=>new BookController().update(req, res)
)
bookRouter.route('/delete').post(
    (req, res)=>new BookController().delete(req, res)
)
bookRouter.route('/stock').post(
    (req, res)=>new BookController().stock(req, res)
)
bookRouter.route('/deleteRequest').post(
    (req, res)=>new BookController().deleteRequest(req, res)
)

export default bookRouter;
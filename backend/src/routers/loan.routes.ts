import express from 'express'
import { LoanController } from '../controllers/loan.controller';

const loanRouter = express.Router();

loanRouter.route('/add').post(
    (req, res)=>new LoanController().add(req, res)
)
loanRouter.route('/addReserved').post(
    (req, res)=>new LoanController().addReserved(req, res)
)
loanRouter.route('/addReservedMany').post(
    (req, res)=>new LoanController().addReservedMany(req, res)
)
loanRouter.route('/findAll').get(
    (req, res)=>new LoanController().findAll(req, res)
)
loanRouter.route('/find').post(
    (req, res)=>new LoanController().find(req, res)
)
loanRouter.route('/findMany').post(
    (req, res)=>new LoanController().findMany(req, res)
)
loanRouter.route('/findByUser').post(
    (req, res)=>new LoanController().findByUser(req, res)
)
loanRouter.route('/findByBook').post(
    (req, res)=>new LoanController().findByBook(req, res)
)
loanRouter.route('/update').post(
    (req, res)=>new LoanController().update(req, res)
)
loanRouter.route('/updateAll').post(
    (req, res)=>new LoanController().updateAll(req, res)
)
loanRouter.route('/delete').post(
    (req, res)=>new LoanController().delete(req, res)
)

export default loanRouter;
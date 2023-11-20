import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/adminLogin').post(
    (req, res)=>new UserController().adminLogin(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/registerByAdmin').post(
    (req, res)=>new UserController().registerByAdmin(req, res)
)

userRouter.route('/update').post(
    (req, res)=>new UserController().update(req, res)
)

userRouter.route('/changeBlock').post(
    (req, res)=>new UserController().changeBlock(req, res)
)

userRouter.route('/notify').post(
    (req, res)=>new UserController().notify(req, res)
)
userRouter.route('/notifyMany').post(
    (req, res)=>new UserController().notifyMany(req, res)
)
userRouter.route('/unnotify').post(
    (req, res)=>new UserController().unnotify(req, res)
)

userRouter.route('/changePassword').post(
    (req, res)=>new UserController().changePassword(req, res)
)

userRouter.route('/findAllRequests').post(
    (req, res)=>new UserController().findAllRequests(req, res)
)

userRouter.route('/findAll').get(
    (req, res)=>new UserController().findAll(req, res)
)

userRouter.route('/delete').post(
    (req, res)=>new UserController().delete(req, res)
)

userRouter.route('/deleteRequest').post(
    (req, res)=>new UserController().deleteRequest(req, res)
)

export default userRouter;
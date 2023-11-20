import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import bookRouter from './routers/book.routes';
import commentRouter from './routers/comment.routes';
import loanRouter from './routers/loan.routes';

const app = express();
app.use(cors())
app.use(express.json({limit:'5000kb'}))


mongoose.connect('mongodb://localhost:27017/projekat2022')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/korisnici', userRouter)
router.use('/knjige', bookRouter)
router.use('/knjigeZahtevi', bookRouter)
router.use('/komentari', commentRouter)
router.use('/zaduzenja', loanRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));
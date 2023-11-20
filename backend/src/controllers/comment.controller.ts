import { Resolver } from 'dns';
import express from 'express'
import CommentsModel from '../models/comments'

export class CommentController{

    add = (req: express.Request, res: express.Response)=>{
        let comments = new CommentsModel({
            korisnicko_ime: req.body.korisnicko_ime,
            id: req.body.id,
            datum: new Date(),
            ocena: req.body.ocena,
            komentar: req.body.komentar,
            azuriran:false
        })

        comments.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    update = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let id = req.body.id;
        let datum = new Date();
        let ocena = req.body.ocena;
        let komentar = req.body.komentar;

        CommentsModel.updateOne({'id':id, 'korisnicko_ime':korisnicko_ime},{$set:{'datum':datum, 'ocena':ocena, komentar:komentar, 'azuriran':true}}, (err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    findAll = (req: express.Request, res: express.Response)=>{

        CommentsModel.find({}, (err, found)=>{
            if(err) console.log(err);
            else {
                res.json(found);
            }
        });

    }
}
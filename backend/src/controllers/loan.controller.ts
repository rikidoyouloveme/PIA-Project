import { Resolver } from 'dns';
import express from 'express'
import LoanModel from '../models/loan'

export class LoanController{
    
    add = (req: express.Request, res: express.Response)=>{

        let loan = new LoanModel({
            korisnicko_ime: req.body.korisnicko_ime,
            knjiga_id: req.body.knjiga_id,
            datum_zaduzenja: req.body.datum_zaduzenja,
            datum_razduzenja: req.body.datum_razduzenja,
            produzen: req.body.produzen,
            datum_rezervacije: req.body.datum_rezervacije
        })

        loan.save((err2, resp)=>{
            if(err2) {
                console.log(err2);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    addReserved = (req: express.Request, res: express.Response)=>{

        let korisnicko_ime = req.body.korisnicko_ime;
        let knjiga_id = req.body.knjiga_id;
        let datum_rezervacije = req.body.datum_rezervacije;
        let datum_zaduzenja = req.body.datum_zaduzenja;

        LoanModel.updateOne({'id':knjiga_id, 'korisnicko_ime':korisnicko_ime, 'datum_rezervacije':datum_rezervacije},{$set:{'datum_zaduzenja':datum_zaduzenja}},(err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    addReservedMany = (req: express.Request, res: express.Response)=>{

        let korisnicko_ime = req.body.korisnicko_ime;
        let knjiga_id = req.body.knjiga_id;
        let datum_rezervacije = req.body.datum_rezervacije;
        let datum_zaduzenja = req.body.datum_zaduzenja;
        
        let i = 0;
        while (i < korisnicko_ime.length) {
            let username = korisnicko_ime[i];
            let datum = datum_rezervacije[i];
            let num = i;
            LoanModel.updateOne({'id':knjiga_id[0], 'korisnicko_ime':username, 'datum_rezervacije':datum},{$set:{'datum_zaduzenja':datum_zaduzenja}},(err, resp)=>{
                if(err) {
                    console.log(err);
                    res.status(400).json({"message": "error"})
                }
                else if (num==korisnicko_ime.length) res.json({"message": "ok"})
            })

            i++;
        }
    }
    findAll = (req: express.Request, res: express.Response)=>{

        LoanModel.find({}, (err, found)=>{
            if(err) console.log(err);
            else {
                res.json(found);
            }
        });

    }
    find = (req: express.Request, res: express.Response)=>{

        let korisnicko_ime = req.body.korisnicko_ime;
        let knjiga_id = req.body.knjiga_id;

        LoanModel.findOne({'korisnicko_ime':korisnicko_ime,'knjiga_id':knjiga_id}, (err, found)=>{
            if(err) console.log(err);
            else {
                res.json(found);
            }
        });

    }
    findMany = (req: express.Request, res: express.Response)=>{

        let korisnicko_ime = req.body.korisnicko_ime;
        let knjiga_id = req.body.knjiga_id;

        LoanModel.find({'korisnicko_ime':korisnicko_ime,'knjiga_id':knjiga_id}, (err, found)=>{
            if(err) console.log(err);
            else {
                res.json(found);
            }
        });

    }
    findByUser = (req: express.Request, res: express.Response)=>{

        let korisnicko_ime = req.body.korisnicko_ime;

        LoanModel.find({'korisnicko_ime':korisnicko_ime}, (err, found)=>{
            if(err) console.log(err);
            else {
                res.json(found);
            }
        });

    }
    findByBook = (req: express.Request, res: express.Response)=>{

        let knjiga_id = req.body.knjiga_id;

        LoanModel.find({'knjiga_id':knjiga_id}, (err, found)=>{
            if(err) console.log(err);
            else {
                res.json(found);
            }
        });

    }
    update = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let knjiga_id = req.body.knjiga_id;
        let datum_razduzenja = req.body.datum_razduzenja;
        let datum_zaduzenja = req.body.datum_zaduzenja;
        let produzen = req.body.produzen;

        LoanModel.updateOne({'id':knjiga_id, 'korisnicko_ime':korisnicko_ime, 'datum_zaduzenja':datum_zaduzenja},{$set:{'datum_razduzenja':datum_razduzenja,'produzen':produzen}},(err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    updateAll = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let newkorisnicko = req.body.newkorisnicko;

        LoanModel.updateMany({'korisnicko_ime':korisnicko_ime},{$set:{'korisnicko_ime':newkorisnicko}},(err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    delete = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;

        LoanModel.deleteOne({'id': id}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}
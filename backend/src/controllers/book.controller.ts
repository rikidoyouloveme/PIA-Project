import { Resolver } from 'dns';
import express from 'express'
import BookModel from '../models/book'
import BookRequestModel from '../models/bookRequest'

export class BookController{
    
    add = (req: express.Request, res: express.Response)=>{

        let maxId = 0; 

        BookModel.find({}, (err, data)=>{
            if(err) console.log(err);
            else {
                let i = 0;
                while(true) {
                    if(i==data.length) {break;}
                    else if (data[i].id > maxId) {maxId = data[i].id}
                    i++;
                }  
                maxId++;
                
                let d = 14;
                let s = 1;

                let book = new BookModel({
                    id: maxId,
                    naziv: req.body.naziv,
                    godina: req.body.godina,
                    izdavac: req.body.izdavac,
                    autor: req.body.autor,
                    zanr: req.body.zanr,
                    jezik: req.body.jezik,
                    slika: req.body.slika,
                    dana: d,
                    stanje: s
                })
        
                book.save((err2, resp)=>{
                    if(err2) {
                        console.log(err2);
                        res.status(400).json({"message": "error"})
                    }
                    else res.json({"message": "ok"})
                })
            }
        })
    }
    request = (req: express.Request, res: express.Response)=>{
        let book = new BookRequestModel({
            naziv: req.body.naziv,
            izdavac: req.body.izdavac,
            godina: req.body.godina,
            autor: req.body.autor,
            zanr: req.body.zanr,
            jezik: req.body.jezik,
            slika: req.body.slika,
            korisnicko_ime: req.body.korisnicko_ime
        })

        book.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        BookModel.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    findAll = (req: express.Request, res: express.Response)=>{

        BookModel.find({}, (err, found)=>{
            if(err) console.log(err);
            else {
                res.json(found);
            }
        });

    }
    findAllRequests = (req: express.Request, res: express.Response)=>{

        BookRequestModel.find({}, (err, found)=>{
            if(err) console.log(err);
            else {
                res.json(found);
            }
        });

    }
    update = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let izdavac = req.body.izdavac;
        let godina = req.body.godina;
        let autor = req.body.autor;
        let zanr = req.body.zanr;
        let jezik = req.body.jezik;
        let slika = req.body.slika;
        let id = req.body.id;
        let stanje = req.body.stanje;
        let dana = req.body.dana;

        BookModel.updateOne({'id':id},{$set:{'naziv':naziv,'izdavac':izdavac,'godina':godina,'autor':autor,'zanr':zanr,'jezik':jezik,'slika':slika, 'dana':dana, 'stanje':stanje}},(err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    stock = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let number = req.body.number;
        BookModel.findOne({'id':id}, (err, found)=>{
            if(err) console.log(err);
            else {
                BookModel.updateOne({'id':id},{$set:{'stanje':found.stanje+number}},(err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": "error"})
                    }
                    else res.json({"message": "ok"})
                })
            }
        });
    }

    delete = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;

        BookModel.deleteOne({'id': id}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    deleteRequest = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let izdavac = req.body.izdavac;
        let godina = req.body.godina;
        let autor = req.body.autor;
        let zanr = req.body.zanr;
        let jezik = req.body.jezik;
        let slika = req.body.slika;
        let korisnicko_ime = req.body.korisnicko_ime;
        let stanje = req.body.stanje;
        let dana = req.body.dana;

        BookRequestModel.deleteOne({'korisnicko_ime':korisnicko_ime,'naziv':naziv,'izdavac':izdavac,'godina':godina,'autor':autor,'zanr':zanr,'jezik':jezik,'slika':slika, 'dana':dana, 'stanje':stanje}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}
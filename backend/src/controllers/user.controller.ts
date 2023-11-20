import express from 'express'
import UserModel from '../models/user'
import UserRequestModel from '../models/userRequest'

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;

        UserModel.findOne({'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka}, (err, user)=>{
            if(err || user==null) {console.log(err);res.json(null);}
            else {
                if ((user.tip!='citalac' && user.tip!='moderator')) {console.log(err);res.json(null);}
                else { res.json(user) }
            }
        })
    }

    findAllRequests = (req: express.Request, res: express.Response)=>{

        UserRequestModel.find({}, (err, found)=>{
            if(err) console.log(err);
            else {
                res.json(found);
            }
        });

    }

    adminLogin = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;

        UserModel.findOne({'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka, 'tip': 'admin'}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let user = new UserRequestModel({
            imePrezime: req.body.imePrezime,
            telefon: req.body.telefon,
            mejl: req.body.mejl,
            adresa: req.body.adresa,
            korisnicko_ime: req.body.korisnicko_ime,
            lozinka: req.body.lozinka,
            tip: req.body.tip,
            slika: req.body.slika
        })
        
        UserModel.findOne({'korisnicko_ime': user.korisnicko_ime}, (err, user1)=>{
            if(err) console.log(err);
            else {
                if (user1==null) {
                    user.save((err, resp)=>{
                        if(err) {
                            console.log(err);
                            res.status(400).json({"message": "error"})
                        }
                        else res.json({"message": "ok"})
                    })
                } else {
                    res.json({"message": "Username already exists try another one."})
                }
            }
        })
    }
    registerByAdmin = (req: express.Request, res: express.Response)=>{
        let user = new UserModel({
            imePrezime: req.body.imePrezime,
            telefon: req.body.telefon,
            mejl: req.body.mejl,
            adresa: req.body.adresa,
            korisnicko_ime: req.body.korisnicko_ime,
            lozinka: req.body.lozinka,
            tip: req.body.tip,
            slika: req.body.slika,
            blokiran: false,
            obavestenja: []
        })

        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    update = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let imePrezime = req.body.imePrezime;
        let lozinka = req.body.lozinka;
        let adresa = req.body.adresa;
        let mejl = req.body.mejl;
        let telefon = req.body.telefon;
        let slika = req.body.slika;
        let tip = req.body.tip;
        let username = req.body.username;

        UserModel.findOne({'korisnicko_ime': username}, (err, user)=>{
            if(err) console.log(err);
            else {
                if(korisnicko_ime=='')korisnicko_ime=user.korisnicko_ime;
                if(imePrezime=='')imePrezime=user.imePrezime;
                if(lozinka=='')lozinka=user.lozinka;
                if(adresa=='')adresa=user.adresa;
                if(mejl=='')mejl=user.mejl;
                if(telefon=='')telefon=user.telefon;
                if(tip=='')tip=user.tip;
                if(slika=='')slika=user.slika;

                UserModel.updateOne({ 'korisnicko_ime': username }, { $set: { 'korisnicko_ime': korisnicko_ime, 'imePrezime': imePrezime, 'lozinka': lozinka, 'adresa': adresa, 'mejl': mejl, 'telefon': telefon, 'slika': slika, 'tip': tip } }, (err, resp) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({ "message": "error" });
                    }
                    else
                        res.json({ "message": "ok" });
                });
            }
        })
    };
    changeBlock = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        UserModel.findOne({'korisnicko_ime': username}, (err, user)=>{
            if(err) console.log(err);
            else {
                UserModel.updateOne({ 'korisnicko_ime': username }, { $set: { 'blokiran':(!user.blokiran) } }, (err, resp) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({ "message": "error" });
                    }
                    else
                        res.json({ "message": "ok" });
                });
            }
        })
    };
    notify = (req: express.Request, res: express.Response)=>{
        let username = req.body.korisnicko_ime;
        let obavestenje = req.body.obavestenje;
        UserModel.findOne({'korisnicko_ime': username}, (err, user)=>{
            if(err) console.log(err);
            else {
                if(user.obavestenja==null){user.obavestenja=[]}
                user.obavestenja.push(obavestenje);
                UserModel.updateOne({ 'korisnicko_ime': username }, { $set: { 'obavestenja':user.obavestenja } }, (err, resp) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({ "message": "error" });
                    }
                    else
                        res.json({ "message": "ok" });
                });
            }
        })
    };
    notifyMany = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let obavestenje = req.body.obavestenje;
        let i = 0;
        while (i < korisnicko_ime.length) {
            let username = korisnicko_ime[i];
            let num = i;
            UserModel.findOne({'korisnicko_ime': username}, (err, user)=>{
                if(err) console.log(err);
                else {
                    if(user.obavestenja==null){user.obavestenja=[]}
                    user.obavestenja.push(obavestenje);
                    UserModel.updateOne({ 'korisnicko_ime': username }, { $set: { 'obavestenja':user.obavestenja } }, (err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "message": "error" });
                        }
                        else if (num==korisnicko_ime.length) res.json({ "message": "ok" });
                    });
                }
            })

            i++;
        }
    };
    unnotify = (req: express.Request, res: express.Response)=>{
        let username = req.body.korisnicko_ime;
        let obavestenje = req.body.obavestenje;
        UserModel.findOne({'korisnicko_ime': username}, (err, user)=>{
            if(err) console.log(err);
            else {
                if(user.obavestenja==null){user.obavestenja=[]}
                let newObavestenje = [];
                for (const o of user.obavestenja) {
                    if (!o.includes(obavestenje)) newObavestenje.push(o);
                }
                UserModel.updateOne({ 'korisnicko_ime': username }, { $set: { 'obavestenja':newObavestenje } }, (err, resp) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({ "message": "error" });
                    }
                    else
                        res.json({ "message": "ok" });
                });
            }
        })
    };
    changePassword = (req: express.Request, res: express.Response)=>{
        let username = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;
        UserModel.updateOne({ 'korisnicko_ime': username }, { $set: { 'lozinka':lozinka } }, (err, resp) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "message": "error" });
            }
            else
                res.json({ "message": "ok" });
        });
    };
    delete = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        UserModel.deleteOne({ 'korisnicko_ime': korisnicko_ime }, (err, resp) => {
            if (err)
                console.log(err);
            else
                res.json({ 'message': 'ok' });
        });
    };
    deleteRequest = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        UserRequestModel.deleteOne({ 'korisnicko_ime': korisnicko_ime }, (err, resp) => {
            if (err)
                console.log(err);
            else
                res.json({ 'message': 'ok' });
        });
    };
    findAll = (req: express.Request, res: express.Response)=>{

       UserModel.find({}, (err, found)=>{
            if(err) console.log(err);
            else {
                res.json(found);
            }
        });

    }
}
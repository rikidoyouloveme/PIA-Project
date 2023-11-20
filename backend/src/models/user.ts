import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    imePrezime: {
        type: String
    },
    adresa: {
        type: String
    },
    korisnicko_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    tip: {
        type: String
    },
    telefon: {
        type: String
    },
    mejl: {
        type: String
    },
    slika: {
        type: String
    },
    blokiran: {
        type: Boolean
    },
    obavestenja: {
        type: Array<String>
    }
})

export default mongoose.model('UserModel', User, 'korisnici')
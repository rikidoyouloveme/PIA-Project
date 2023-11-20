import mongoose from "mongoose";

const Schema = mongoose.Schema;

let UserRequest = new Schema({
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
    }
})

export default mongoose.model('UserRequestModel', UserRequest, 'zahtevi')
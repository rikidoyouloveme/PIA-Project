import mongoose from "mongoose";

const Schema = mongoose.Schema;

let BookRequest = new Schema({
    naziv: {
        type: String
    },
    autor: {
        type: Array<String>
    },
    izdavac: {
        type: String
    },
    godina: {
        type: Number
    },
    zanr: {
        type: Array<String>
    },
    id: {
        type: Number
    },
    jezik: {
        type: String
    },
    slika: {
        type: String
    },
    korisnicko_ime: {
        type: String
    }
})

export default mongoose.model('BookRequestModel', BookRequest, 'knjigeZahtevi')
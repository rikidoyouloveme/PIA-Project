import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Book = new Schema({
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
    stanje: {
        type: Number
    },
    dana: {
        type: Number
    }
})

export default mongoose.model('BookModel', Book, 'knjige')
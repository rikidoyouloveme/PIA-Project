import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Comment = new Schema({
    korisnicko_ime: {
        type: String
    },
    komentar: {
        type: String
    },
    datum: {
        type: Date
    },
    id: {
        type: Number
    },
    ocena: {
        type: Number
    },
    azuriran: {
        type: Boolean
    }
})

export default mongoose.model('CommentModel', Comment, 'komentari')
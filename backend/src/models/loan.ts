import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Loan = new Schema({
    korisnicko_ime: {
        type: String
    },
    knjiga_id: {
        type: Number
    },
    datum_zaduzenja: {
        type: Date
    },
    datum_razduzenja: {
        type: Date
    },
    produzen: {
        type: Boolean
    },
    datum_rezervacije: {
        type: Date
    }
})

export default mongoose.model('LoanModel', Loan, 'zaduzenja')
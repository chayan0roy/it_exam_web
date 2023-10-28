const mongoose = require("mongoose");
const FPSchima = new mongoose.Schema({
    Data: [
        {
            FPCardName: { type: String },
            FPCardImg: { type: String },
            id: { type: String }
        }
    ]
});

const FP_Schima = mongoose.model("fp_schimas", FPSchima);
module.exports = FP_Schima;
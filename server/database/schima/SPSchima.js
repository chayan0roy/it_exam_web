const mongoose = require("mongoose");
const SPSchima = new mongoose.Schema({
    language: [
        {
            languageName: { type: String },
            languageImage: { type: String },
            languageID: { type: String }
        }
    ]
});

const SP_Schima = mongoose.model("sp_schimas", SPSchima);
module.exports = SP_Schima;
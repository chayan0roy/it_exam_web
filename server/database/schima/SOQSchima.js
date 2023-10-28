const mongoose = require("mongoose");
const SOQSchima = new mongoose.Schema({
    languageQuestions: [
        {
            QNum: { type: String },
            Question: { type: String }
        }
    ]
});

const SOQ_Schima = mongoose.model("soq_schimas", SOQSchima);
module.exports = SOQ_Schima;








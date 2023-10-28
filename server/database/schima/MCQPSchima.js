const mongoose = require("mongoose");
const MCQPSchima = new mongoose.Schema({
    languageQuestions: [
        {
            QNum: { type: String },
            Question: { type: String },
            Option: [
                { type: String },
                { type: String },
                { type: String },
                { type: String },
            ],
            Answer: { type: String },
        }
    ]
});

const MCQP_Schima = mongoose.model("mcqp_schimas", MCQPSchima);
module.exports = MCQP_Schima;
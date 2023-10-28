const mongoose = require("mongoose");
const CQPSchima = new mongoose.Schema({
    languageQuestions: [
        {
            QNum: { type: String },
            Question: { type: String },
            QuestionSuggestion : [{ type: String }]
        }
    ]
});

const CQP_Schima = mongoose.model("cqp_schimas", CQPSchima);
module.exports = CQP_Schima;

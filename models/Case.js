const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
        required: false, 
    },
    amount: {
        type: Number,

    },
}, { timestamps: true }); 

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;

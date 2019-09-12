const mongoose = require('mongoose');

const produckSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Produck', produckSchema);
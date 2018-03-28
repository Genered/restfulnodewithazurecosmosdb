var mongoose = require("mongoose");

var schemaBuku = new mongoose.Schema({
    judul: String,
    pengarang: String,
    harga: String,
    urlGambar: String
});

module.exports = mongoose.model("Buku", schemaBuku);
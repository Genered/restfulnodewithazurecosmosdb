var express        = require("express");
var app            = express();
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var methodOverride = require("method-override");
var Buku           = require("./models/buku");

app.set("view engine", "ejs");
//mongoose.connect("mongodb://localhost/databaseBuku");
//mongoose.connect("mongodb://restfulnode:yqejIDAh8DZzrqs4vZDrFLiIBesfIwuYNqyYDDtaU1BALO4yMyy5u6fXDjAyee28AfuzCuwhsDhIcOl7qPTJtg%3D%3D@restfulnode.documents.azure.com:10255/myNodeDB?ssl=true");
mongoose.connect("mongodb://mynoderest:j6NxF4EDAanxmkVUNOqmozIHtfX4UFu3yIFFGmWA8qdXV5RdnVM8bbpRRbKV3mmkMmVw845KZq1e8FFHCRnBIw%3D%3D@mynoderest.documents.azure.com:10255/?ssl=true")
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Root route
app.get("/", function(req, res){
    res.render("landing");
});

// Index route
app.get("/buku", function(req, res){
    Buku.find({}, function(err, buku){
        if(err)
            console.log("error");
        else
            res.render("buku/index", {arrayBuku: buku}); 
    });    
});

app.get("/buku/new", function(req, res){
    res.render("buku/new"); 
});

app.post("/buku", function(req, res){
    var bukuBaru = {
        judul: req.body.judul,
        pengarang: req.body.pengarang,
        harga: req.body.harga,
        urlGambar: req.body.gambar
    };
    
    Buku.create(bukuBaru, function(err, buku){
        if(err)
            console.log("error");
        else {
            console.log(buku);
            res.redirect("/buku");
            
        }
    });
});

app.get("/buku/:id", function(req, res){
    Buku.findById(req.params.id, function(err, buku){
        if(err)
            console.log("error");
        else
            res.render("buku/show", {buku: buku});
    });
});

app.get("/buku/:id/edit", function(req, res){
    Buku.findById(req.params.id, function(err, buku){
        if(err)
            console.log("error");
        else
            res.render("buku/edit", {buku, buku}); 
    });    
});

app.put("/buku/:id", function(req, res){
    var bukuBaru = {
        judul: req.body.judul,
        pengarang: req.body.pengarang,
        harga: req.body.harga,
        urlGambar: req.body.gambar
    };
    
    Buku.findByIdAndUpdate(req.params.id, bukuBaru,function(err, buku){
        if(err)
            console.log("error");
        else
            res.redirect("/buku/" + req.params.id);
    });
});

app.delete("/buku/:id", function(req, res){
    Buku.findByIdAndRemove(req.params.id, function(err){
        if(err)
            console.log("error");
        else
            res.redirect("/buku");
    });
});

app.listen(1234, function(){
    console.log("Server berjalan di port 1234."); 
});
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://bharat24me025:bharat123@cluster0.b2mtn45.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then( ()=> console.log("db connected"))
    .catch( (err) => console.log(err))
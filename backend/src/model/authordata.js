//accessing mongoose package
const mongoose = require('mongoose');

//database connection
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.pln2z.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority', { useNewUrlParser: true });
//mongoose.connect('mongodb+srv://userone:userone@ictakfiles.il9ag.mongodb.net/LibraryApp?retryWrites=true&w=majority', { useNewUrlParser: true });

//schema definition
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    aname: String,
    books: String,
    desc: String,
    image: String  
});

//model creation
var Authordata= mongoose.model('authordata',AuthorSchema);
module.exports = Authordata;
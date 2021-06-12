//accessing mongoose package
const mongoose = require('mongoose');

//database connection
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.pln2z.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority', { useNewUrlParser: true });
//mongoose.connect('mongodb+srv://userone:userone@ictakfiles.il9ag.mongodb.net/LibraryApp?retryWrites=true&w=majority', { useNewUrlParser: true });

//schema definition
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: String,
    pwd: String,
    username: String
});

//model creation
var Userdata= mongoose.model('userdata',UserSchema);
module.exports = Userdata;
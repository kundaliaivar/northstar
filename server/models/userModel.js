const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userName : {type : String, require : true},
    password : {type : String, require : true},
});

module.exports = mongoose.model('Users', UserSchema);

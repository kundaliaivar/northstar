const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FeedSchema = new Schema({
    goalId: {type : String},
    feedId: {type : String, require : true},
    userName : {type : String, max:25},
    feedBody : {type : String, max:100},
    createdOn : {type : String},
    stars: {type : Number}
});

module.exports = mongoose.model('Feeds', FeedSchema);
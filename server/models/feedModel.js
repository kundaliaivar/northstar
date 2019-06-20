const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedSchema = new Schema({
    goalId: { type: String },
    userName: { type: String, max: 25 },
    feedBody: { type: String, max: 100 },
    createdOn: { type: Date, default: Date.now },
    stars: { type: Array, default: [] }
},
{
    timestamps: {
        createdAt: 'createdOn'
    }
});

module.exports = mongoose.model('Feeds', FeedSchema);

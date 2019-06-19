const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GoalSchema = new Schema({
    name: {
        type: String,
        require: true,
        max: 25
    },
    description: {
        type: String,
        require: true,
        max: 100
    },
    createdBy: {
        type: Object,
        required: true
    },
    createdFor: {
        type: Object,
        required: true
    },
    taskType: {
        type: String,
        required: true,
        enum: ['Project Goals', 'Org Initiatives', 'Personal Development'],
        default: 'Project Goals'
    },
    isHighImpact: {
        type: Boolean
    },
    isPublic: {
        type: Boolean
    },
    dueOn: {
        type: String,
        required: true
    },
    lastUpdateOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    isCompleted: {
        type: Boolean
    },
    percentage: {
        type: Number
    }
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'lastUpdateOn'
    }
});


module.exports = mongoose.model('Goals', GoalSchema);
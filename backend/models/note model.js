const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    enterprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issueType: {
        type: String,
        enum : ['technical issue', 'sync issue', 'generate issue','transaction issue', 'other'],
        required: true
    },
    description:{
        type: String,
        required: [true, 'please provide details of the issue'],
        trim: true

    },
    resolved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);


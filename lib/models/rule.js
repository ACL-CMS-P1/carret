const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true,
        enum: ['rule1', 'rule2']
    },
    status: {
        type: String,
        required: true,
        enum: ['on', 'off']
    },
    description: {
        type: String,
        required: true,
        maxlength: 250
    }
});

module.exports = mongoose.model('Rule', schema);

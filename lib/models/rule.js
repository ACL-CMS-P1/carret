const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true,
        enum: ['rule1', 'rule2']
    },
    active: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 250
    },
    
});

module.exports = mongoose.model('Rule', schema);
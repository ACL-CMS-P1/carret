const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    // TODO MAYBE? dynamically determine enum values from keys?
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

schema.static('checkRules', function() {
    // TODO: think about this
});

module.exports = mongoose.model('RuleConfig', schema);
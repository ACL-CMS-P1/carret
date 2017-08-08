const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    email: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    sqreen: String,
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Blacklist', schema);

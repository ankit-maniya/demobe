const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const partySchema = mongoose.Schema({
    partyName: {
        type: String
    },
    contact: {
        type: String
    },
    createdBy: {
        type: ObjectId,
        ref: 'users'
    },
    updatedBy: {
        type: ObjectId,
        ref: 'users'
    },
    orgId: {
        type: ObjectId,
        ref: 'organization'
    }
}, { strict: false, timestamps: true })

const Party = mongoose.model('party', partySchema);

module.exports = Party

const mongoose = require('mongoose');

const enterpriseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true},
    bank: {
        type: String,
        required: true,
        trim: true,
    },
currentSupporter:{
    type: String,
    required: true,
    trim: true, 
},
previuosSupporter:{
    type: String,
    trim: true, 
},
EnterpriseSideCommunicator:{
    type: String,
    trim: true, 
},
currentstatus:{
    type: String,
    trim: true,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
},
joindate:{
    type: Date,
    default: Date.now  
},
isSchool: { 
    type: Boolean, 
    default: false

},
isWaterBilling:{
    type: Boolean,
    default: false
},
urltype:{
    type: String,
    enum: ['single-tenant', 'multi-tenant', 'lite', 'unknown'],
    default: 'unknown'
}
},

{ timestamps: true});
    module.exports = mongoose.model( 'Enterprise', enterpriseSchema)


;
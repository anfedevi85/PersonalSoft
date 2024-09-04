const {Schema, model} = require('mongoose');

const optionSchema = Schema({
    name: { type: String,  required: [true, 'contact name is required'] },
    type: { type: String},
    company: { type: Schema.Types.ObjectId, ref: 'Company'},
    status: { type: String, default: 'Active', enum:['Active', 'Delete', 'Suspended'] },
    userCreated: { type: Schema.Types.ObjectId, ref: 'User' },
    userEdit: { type: Schema.Types.ObjectId, ref: 'User' }    
}, {
    timestamps: true
});

module.exports = model('Option', optionSchema);
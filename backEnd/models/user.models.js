const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: { type: String,  required: [true, 'User name is required'] },
    lastname: { type: String},
    birthdate: { type: String},
    age: { type: String},
    socialSecurity: { type: String},
    education: { type: String},
    degree: { type: String},
    contactName: { type: String},
    contactLastname: { type: String},
    contactPhone: { type: String},
    email: { type: String, lowercase: true, required: true },
    phone: { type: String},
    unit: { type: String},
    address: { type: String},
    position: { type: String},
    permissions: { type: String},
    compansationType: { type: String},
    compansationValue: { type: String},
    commission: { type: String},
    commissionPercentage: { type: String},
    hired: { type: String},
    terminated: { type: String},
    duration: { type: String},
    reason: { type: String},
    certificates:[{
       name: { type: String},
       code: { type: String},
       expiryDate: { type: String},
       imagePath: { type: String},
       status: { type: String, default: 'Active'}
    }],
    rol: { type: String},
    attachments:[{
        lastModified:{type: Number},
        name:{type: String},
        size:{type: Number},
        type:{type: String},
        url:{type: String}
    }],
    company: { type: Schema.Types.ObjectId, ref: 'Company'},
    password: { type: String, required: [true, 'Password is required'] },
    status: { type: String, default: 'Active', enum:['Active', 'Delete', 'Suspended','Inactive'] },
    imagePath: { type: String, default: 'usuarios/noUser.png'},
    userType: { type: String},
    signature: { type: String},
    OTP: { type: String},
    fechaOTP: { type: Date},
    notification:{type: Boolean},
    subscribe:{type: Boolean},
    verificationCode:{type: Boolean, default: false},
    resetPassword:{type: Boolean, default: false},
    userCreated: { type: Schema.Types.ObjectId, ref: 'User' },
    userEdit: { type: Schema.Types.ObjectId, ref: 'User' }    
}, {
    timestamps: true
});

userSchema.method('toJSON', function(){
    const {_v, password, ...object}= this.toObject();
    return object;
});
module.exports = model('User', userSchema);
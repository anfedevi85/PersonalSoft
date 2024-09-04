const {Schema, model} = require('mongoose');

const companySchema = Schema({
    name: { type: String, required: [true, 'Company name is Required'] },
    address: { type: String},
    unit: { type: String},//Owner
    street: { type: String},//Owner
    city: { type: String},//Owner
    province: { type: String},//Owner
    postalCode: { type: String},//Owner
    country: { type: String},
    legalName: { type: String},
    legalAddress: { type: String},
    billingAddress: { type: String},
    billingUnit: { type: String},
    billingStreet: { type: String},
    billingCity: { type: String},
    billingProvince: { type: String},
    billingPostalCode: { type: String},
    billingCountry: { type: String},
    province: { type: String},
    city: { type: String},
    website: { type: String},
    officeEmail: { type: String},
    officePhone: { type: String},
    billingEmail: { type: String},
    billingPhone: { type: String},
    language: { type: String},
    currency: { type: String},
    timeZone: { type: String},
    lengthUnit: { type: String},
    temperatureScale: { type: String},
    humidityScale: { type: String},
    jobNumberFormat: { type: String},
    contact: { type: String},
    numContact: { type: String},
    phone: { type: String},
    contract: { type: String},
    xactimate: { type: String},
    finalDate: { type: String},
    teamSize: { type: String},
    acountPlan: { type: String},
    startPlan: { type: String},
    imagePath: { type: String, default: 'companies/noLogo.jpg'},
    status: { type: String, default: 'Active'},
    userCreated: { type: Schema.Types.ObjectId, ref: 'User' },
    userEdit: { type: Schema.Types.ObjectId, ref: 'User' },   
    userDelete: { type: Schema.Types.ObjectId, ref: 'User' },
       
}, {
    timestamps: true
});

module.exports = model('Company', companySchema);
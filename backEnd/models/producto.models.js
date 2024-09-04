const {Schema, model} = require('mongoose');

const productoSchema = Schema({
    name: { type: String, uppercase: true, required: [true, 'El nombre del Producto es Obligatorio'] },
    code: { type: String, uppercase: true},
    clasificacion: { type: String, uppercase: true},
    type: { type: String, uppercase: true},
    description: { type: String, uppercase: true},
    status: { type: String, default: 'Activo', enum:['Activo', 'Eliminado', 'Suspendido', 'Entregado'] },
    imagePath: { type: String, default: 'noimage.png'},
    empresa : { type: Schema.Types.ObjectId, ref: 'Empresa'} ,
    userCreated: { type: Schema.Types.ObjectId, ref: 'User' },
    userEdit: { type: Schema.Types.ObjectId, ref: 'User' } ,  
}, {
    timestamps: true
});

module.exports = model('Producto', productoSchema);
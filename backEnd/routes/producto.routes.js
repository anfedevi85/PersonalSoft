const { Router} = require('express');
const { validarJWT } = require('../middlewares/validarJWT');
const {check}= require('express-validator');
const {validarCampos}= require('../middlewares/validar-campos');

const Producto = require('../models/producto.models');

const router = Router();

//===============================================
// Get Productos
//===============================================
router.get('/',validarJWT, async(req, res, next) => {

    try {
        const productos = await Producto.find({status: ['Activo' , 'Suspendido','Entregado']})
        .exec();

    res.json({
        ok: true,
        productos,
        msg:'Producto Creado'
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error cargando Productoes '
        });
    }
});

//===============================================
// Get Producto
//===============================================
router.get('/:id', validarJWT,async(req, res) => {
    const id = req.params.id;
    try {
        const producto = await Producto.findById(id)
        .exec();
    res.json({
        ok: true,
        producto
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error cargando Producto: '
        });
    }
});
//===============================================
// Create Producto
//===============================================
router.post('/',[ 
    validarJWT,
    check('name', 'El nombre de la Producto es Obligatorio').not().isEmpty(),
    validarCampos
], async(req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save(); 
        res.status(201).json({
            ok: true,
            producto,
            msg:'Producto Creado'
        });
        
    } catch (error) {
        console.log(error);
    res.status(500).json({
        ok: false,
        msg: ' Error al crear Producto ',
    });
    }

});

//===============================================
// Update Producto
//===============================================
router.put('/:id',[  
    validarJWT,
    check('name', 'El nombre de la Producto es Obligatorio').not().isEmpty(),
    validarCampos
], async (req, res) => {
    const id = req.params.id;
   try{
    const productoDB = await Producto.findById(id);
    if ( !productoDB ) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe una Producto por ese id'
        });
    }
    // Actualizaciones
    const productoActualizado = await Producto.findByIdAndUpdate( id, req.body, { new: true } );
    res.json({
        ok: true,
        producto: productoActualizado,
        msg:'Producto actualizado'
    });  
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error Actualizando Producto'
    })
}
});


// ===============================================
// delete Producto
// ===============================================
router.put('/delete/:id',validarJWT, async (req, res) => {
    const id = req.params.id;
   try{
    const productoDB = await Producto.findById(id);
    if ( !productoDB ) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id'
        });
    }
    // Actualizaciones
    const status = req.body.status;
    
    const productoActualizado = await Producto.findByIdAndUpdate( id, {status}, { new: true } );
    res.json({
        ok: true,
        producto: productoActualizado,
        msg:'Producto  actualizado'
    });  
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error Actualizando Producto'
    })
}
});



//===============================================
// Get Productos de la empresa
//===============================================
router.get('/empresa/:id',validarJWT, async(req, res, next) => {

    const empresa = req.params.id
    try {
        const productos = await Producto.find({status: ['Activo' , 'Suspendido',"Entregado"], empresa})
        .exec();

    res.json({
        ok: true,
        productos,
        msg:'Producto Creado'
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error cargando Productoes '
        });
    }
});


module.exports = router;
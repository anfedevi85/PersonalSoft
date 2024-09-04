const { Router} = require('express');
const { validarJWT } = require('../middlewares/validarJWT');
const {check}= require('express-validator');
const {validarCampos}= require('../middlewares/validar-campos');
const sendGeneralMail = require('../middlewares/sendMail');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const Option = require('../models/option.models');
const { populate } = require('../models/option.models');

const router = Router();

//===============================================
// obtener todos las opciones
//===============================================
router.get('/',validarJWT, async(req, res, next) => {

    try {
        const options = await Option.find({status: ['Active' , 'Inactive']})
        .populate('company')
        .exec();
    res.json({
        ok: true,
        users,
        msg:'Options loaded'
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error loading options'
        });
    }
});

//===============================================
// obtener una opcion
//===============================================
router.get('/:id',validarJWT,async(req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const option = await Option.findById(id)
        .populate('company')
        .exec();
    res.json({
        ok: true,
        option
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error cargando options: '
        });
    }
});
//===============================================
// Crear nueva opcion 
//===============================================
router.post('/',[ 
    validarJWT,check('name', 'option name is required').not().isEmpty(),
    validarJWT,check('type', 'type is required').not().isEmpty(),
    validarCampos
], async(req, res) => {
    const  { name, type, ...campos} = req.body;
    console.log(req.body);
    try {
        const existeOption = await Option.findOne({ name, type , status: ['Active', 'Inactive']});

        if ( existeOption ) {
            return res.status(400).json({
                ok: false,
                msg: `${type}:${name}  is currently registered`
            });
        }else{
            const option = new Option(req.body);

       
        await option.save();
        
        
        res.status(201).json({
            ok: true,
            option,
            msg:`option Has Been Created`
        });
        
        }
        
    } catch (error) {
        console.log(error);
    res.status(500).json({
        ok: false,
        msg: ' Error al crear option ',
    });
    }

});

//===============================================
// Actualizar usuario
//===============================================
router.put('/:id',[  
    validarJWT,
    check('name', 'UserName is required').not().isEmpty()
], async (req, res) => {
    const id = req.params.id;
   try{
    const userDB = await User.findById(id);
    if ( !userDB ) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id'
        });
    }
    console.log(req.body);

    // Actualizaciones
    const userActualizado = await User.findByIdAndUpdate( id, req.body, { new: true } );
    res.json({
        ok: true,
        user: userActualizado,
        msg:'Usuario actualizado'
    });  
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error Actualizando Usuario'
    })
}
});




// ===============================================
// eliminar usuario
// ===============================================
router.put('/delete/:id',validarJWT, async (req, res) => {
    const id = req.params.id;
   try{
    const userDB = await User.findById(id);
    if ( !userDB ) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id'
        });
    }
    // Actualizaciones
    const status = req.body.status;
    const userEdit = req.body.userEdit;
    
    const userActualizado = await User.findByIdAndUpdate( id, {status, userEdit}, { new: true } );
    res.json({
        ok: true,
        user: userActualizado,
        msg:'Usuario '+ userActualizado.nombre + ' actualizado'
    });  
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error Actualizando Usuario'
    })
}
});


//===============================================
// obtener todos los usuarios de una company
//===============================================
router.get('/company/:companyID',validarJWT, async(req, res, next) => {
    const company = req.params.companyID;
    console.log({company});
    try {
        const options = await Option.find({company, status:['Active' , 'Inactive']});

    res.json({
        ok: true,
        options,
        msg:'Options loaded'
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error loading options '
        });
    }
});


//===============================================
// obtener todos las opciones de una company por tipo
//===============================================
router.get('/company/:companyID/:type',validarJWT, async(req, res, next) => {
    const company = req.params.companyID;
    const type = req.params.type;

    console.log({company});
    try {
        const options = await Option.find({company, status:['Active' , 'Inactive'], type});

    res.json({
        ok: true,
        options,
        msg:'Options loaded'
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error loading options '
        });
    }
});


module.exports = router;
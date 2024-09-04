const { Router} = require('express');
const { validarJWT } = require('../middlewares/validarJWT');
const {check}= require('express-validator');
const {validarCampos}= require('../middlewares/validar-campos');

const Company = require('../models/company.models');

const router = Router();

//===============================================
// get Companies
//===============================================
router.get('/',validarJWT, async(req, res, next) => {

    try {
        const companies = await Company.find({status: ['Active']})
        .exec();

    res.json({
        ok: true,
        companies,
        msg:'Company Created'
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error Company '
        });
    }
});

//===============================================
// get company
//===============================================
router.get('/:id', validarJWT,async(req, res) => {
    const id = req.params.id;
    try {
        const company = await Company.findById(id)
        .exec();
    res.json({
        ok: true,
        company
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error get company: '
        });
    }
});
//===============================================
// Create company
//===============================================
router.post('/',[ 
    check('name', 'Company name is required').not().isEmpty(),
    validarCampos
], async(req, res) => {
    try {
        const company = new Company(req.body);
        await company.save(); 
        res.status(201).json({
            ok: true,
            company,
            msg:`Company ${company.name} has been Created`
        });
        
    } catch (error) {
        console.log(error);
    res.status(500).json({
        ok: false,
        msg: ' Error created company ',
    });
    }

});

//===============================================
// Actualizar company
//===============================================
router.put('/:id',[  
    validarJWT,
    check('name', 'Company name is required').not().isEmpty(),
    validarCampos
], async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
   try{
    const companyDB = await Company.findById(id);
    if ( !companyDB ) {
        return res.status(404).json({
            ok: false,
            msg: 'Company ID not found'
        });
    }
    // Actualizaciones
    const companyUpdated = await Company.findByIdAndUpdate( id, req.body, { new: true } );
    res.json({
        ok: true,
        company: companyUpdated,
        msg:`company ${companyUpdated.nname} hes been Update'`
    });  
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error updated Company'
    })
}
});


// ===============================================
// Update company status
// ===============================================
router.put('/delete/:id',validarJWT, async (req, res) => {
    const id = req.params.id;
   try{
    const companyDB = await Company.findById(id);
    if ( !companyDB ) {
        return res.status(404).json({
            ok: false,
            msg: 'Company ID not Found'
        });
    }
    // Actualizaciones
    const status = req.body.status;
    const userEdit = req.body.userEdit;
    
    const companyUpdated = await Company.findByIdAndUpdate( id, {status, userEdit}, { new: true } );
    res.json({
        ok: true,
        company: companyUpdated,
        msg:`Company ${companyUpdated.name} updated `
    });  
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error updated company'
    })
}
});




//===============================================
// obtener todas las Ciudades
//===============================================
router.get('/city/:province',validarJWT, async(req, res, next) => {

    const province = req.params.province;
    try {
        const cities = await City.find({province})
        .exec();

    res.json({
        ok: true,
        cities,
        msg:'provinces ok'
    });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error provinces '
        });
    }
});



module.exports = router;
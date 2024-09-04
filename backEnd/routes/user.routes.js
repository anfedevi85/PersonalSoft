const { Router} = require('express');
const { validarJWT } = require('../middlewares/validarJWT');
const {check}= require('express-validator');
const {validarCampos}= require('../middlewares/validar-campos');
const sendGeneralMail = require('../middlewares/sendMail');
const jwt = require('jsonwebtoken');
const { generarJWT } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const User = require('../models/user.models');
const { populate } = require('../models/user.models');
// const newOTP = require('../middlewares/sns');
const accountSid = "AC5d280018b2bb89c7a804d02267ddbd79";
const authToken = "dccdaf7c5c0edc5c61620277ccfc256e";
const verifySid = "VA501e470354a724cddf808215743c81c7";
const client = require("twilio")(accountSid, authToken);
const router = Router();

let OTP

//===============================================
// obtener todos los usuarios
//===============================================
router.get('/',validarJWT, async(req, res, next) => {

    try {
        const users = await User.find({status: ['Active' , 'Inactive']})
        .populate('company')
        .exec();
    res.json({
        ok: true,
        users,
        msg:'Usuarios Cargados'
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error cargando usuarios '
        });
    }
});

//===============================================
// obtener Un usuario
//===============================================
router.get('/:id',validarJWT,async(req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const user = await User.findById(id)
        .populate('company')
        .exec();
    res.json({
        ok: true,
        user
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error cargando usuario: '
        });
    }
});
//===============================================
// Crear nuevo usuario
//===============================================
router.post('/',[ 
    check('name', 'User name is required').not().isEmpty(),
    check('email','Email is required').isEmail(),
    validarCampos
], async(req, res) => {
    const  { email, password,phone, ...campos} = req.body;
    console.log(req.body);
    try {
        const existeEmail = await User.findOne({ email , status: ['Active', 'Inactive']});
        const existePhone = await User.findOne({ phone , status: ['Active', 'Inactive']});

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: `${email}  is currently registered`
            });
        }else if ( existePhone ) {
            return res.status(400).json({
                ok: false,
                msg: `${phone}  is currently registered`
            });
        }else{
            const user = new User(req.body);

         // ===============================================
        // Generar Contraseña Aleatoria
        // ===============================================
        let newPassword = generator.generate({
            length: 16,
            numbers: true
        });

        // ===============================================}
        //  Encriptar Contraseña 
        // ===============================================
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(newPassword, salt);

        // ===============================================
        //  Guardar y generar email con contraseña nueva
        // ===============================================
        await user.save();
        const dataemail= {
           to: user.email,
           //to: 'delgadovillate@gmail.com',
            subject: "Nuevo Usuario PersonalSoft ",
            // text: 'la contraseña del usuario es:'+ newPassword,
            newpassword: newPassword,
            name: user.name,
            link: `localhost:4200`,
        }
        if (user.notification) {
            
            sendGeneralMail(dataemail);
        }    
        res.status(201).json({
            ok: true,
            user,
            msg:`User ${user.nombre} Has Been Created`
        });
        
        }
        
    } catch (error) {
        console.log(error);
    res.status(500).json({
        ok: false,
        msg: ' Error user created, please contact support',
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


//===============================================
// Actualizar telefono usuario
//===============================================
router.put('/active/:id',[  
    validarJWT,
    check('phone', 'Phone is required').not().isEmpty()
], async (req, res) => {
    const id = req.params.id;
    const phone = req.body.phone;
   try{
    const userDB = await User.findOne({phone});
    if ( userDB ) {
        return res.status(404).json({
            ok: false,
            msg: `Phone Number Alredy asigned to ${userDB.name}`
        });
    }else{

    
    console.log(req.body);

    // Actualizaciones
    const userActualizado = await User.findByIdAndUpdate( id, req.body, { new: true } );
    res.json({
        ok: true,
        user: userActualizado,
        msg:'Usuario actualizado'
    });
}  
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error Actualizando Usuario'
    })
}
});



//===============================================
// Actualizar usuario password
//===============================================
router.put('/password/:id',[  
    validarJWT,
    check('name', 'UserName is required').not().isEmpty()
], async (req, res) => {
    const id = req.params.id;
    const{email, password , name, lastname, phone, position} = req.body;
   try{
    const userDB = await User.findById(id);
    if ( !userDB ) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id'
        });
    }else{
        let newPassword
        if (password.length>=8) {
            const salt = bcrypt.genSaltSync();
            newPassword = bcrypt.hashSync(password, salt);    
        }else{
            newPassword = userDB.password;
        }
        
    
    // Actualizaciones
    const resetPassword= true;
    const userActualizado = await User.findByIdAndUpdate( id, {name, lastname,phone, position , password: newPassword, resetPassword}, { new: true } );
    res.json({
        ok: true,
        user: userActualizado,
        msg:'Usuario actualizado'
    });          
    }

} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error Actualizando Usuario'
    })
}
});

//===============================================
// Actualizar password usuario
//===============================================
router.put('/forgot/newpassword', async (req, res) => {
    console.log(req.body);
    const newPassword = req.body.password;
    const token = req.body.token;
    if (!token){
        return res.status(401).json({
            ok: false,
            msg : 'No hay token en la peticion'
        });
    }

    try {
        const {name, _id}= jwt.verify( token , process.env.JWT_SECRET);
        req._id= _id;
        // next();
        const userDB = await User.findById(_id);
        console.log(userDB);
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
         // Actualizaciones
    // ===============================================
    //  Encriptar Contraseña 
    // ===============================================
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(newPassword, salt);

    const userActualizado = await User.findByIdAndUpdate( _id, {password}, { new: true } );
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
        const users = await User.find({company, status:['Active' , 'Inactive']});

    res.json({
        ok: true,
        users,
        msg:'Usuarios Cargados de la company'
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error cargando usuarios '
        });
    }
});


//===============================================
// obtener todos los usuarios de una company
//===============================================
router.get('/company/status/:companyID/:status',validarJWT, async(req, res, next) => {
    const company = req.params.companyID;
    const status = req.params.status;
    console.log({company});
    try {
        const users = await User.find({company, status});

    res.json({
        ok: true,
        users,
        msg:'Usuarios Cargados de la company'
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error cargando usuarios '
        });
    }
});



//===============================================
// obtener todos los proveedores de una company
//===============================================
router.get('/company/:company/:rol',validarJWT, async(req, res, next) => {
    const company = req.params.company;
    const rol= req.params.rol;
    console.log({company,rol});
    try {
        const users = await User.find({company, status: 'Active', rol});

    res.json({
        ok: true,
        users,
        msg:'Usuarios Cargados de la company'
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error cargando usuarios '
        });
    }
});




//===============================================
// obtener todos los proveedores de una company
//===============================================
router.get('/position/:company/:position',validarJWT, async(req, res, next) => {
    const company = req.params.company;
    const position= req.params.position;
    console.log({company,position});
    try {
        const users = await User.find({company, status: 'Active', position});

    res.json({
        ok: true,
        users,
        msg:'Usuarios Cargados de la company'
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error cargando usuarios '
        });
    }
});



//===============================================
// obtener todos los Clientes de una company
//===============================================
router.get('/clientes/:company',validarJWT, async(req, res, next) => {
    const company = req.params.company;
    console.log({company});
    try {
        const users = await User.find({company, status: 'Activo', userType: 'Cliente'});

    res.json({
        ok: true,
        users,
        msg:'Usuarios Cargados de la company'
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error cargando usuarios '
        });
    }
});


// ===============================================
// Eliminar certificado de un Usurio
// ===============================================
router.put('/certificates/:id/:certificateID',async (req, res) => {
    const id = req.params.id;
    const certificateID = req.params.certificateID;
   try{
    const userDB = await User.findById(id);
    if ( !userDB ) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id'
        });
    }else{
        console.log(userDB);
        const userActualizado = await User.findByIdAndUpdate( id, {$pull:{certificates:{_id: certificateID}}}, { new: true } );
        res.json({
            ok: true,
            user: userActualizado,
            msg:'Usuario actualizado'
        });    
    }

} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error Actualizando Usuario'
    })
}
});



// ===============================================
// Eliminar attachment de un Usurio
// ===============================================
router.put('/attachments/:id/:attachmentID',async (req, res) => {
    const id = req.params.id;
    const attachmentID = req.params.attachmentID;
   try{
    const userDB = await User.findById(id);
    if ( !userDB ) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id'
        });
    }else{
        console.log(userDB);
        const userActualizado = await User.findByIdAndUpdate( id, {$pull:{attachments:{_id: attachmentID}}}, { new: true } );
        res.json({
            ok: true,
            user: userActualizado,
            msg:'Usuario actualizado'
        });    
    }

} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error Actualizando Usuario'
    })
}
});

//===============================================
// obtener Un usuario + enviar OTP
//===============================================
router.get('/otp/:id',async(req, res) => {
    const id = req.params.id;
    const ramdom= Math.floor(Math.random() * 900000) + 100000;
    OTP= ramdom.toString();
    console.log(OTP);
    try {
        const user = await User.findById(id)
        .populate('company')
        .exec();
    res.json({
        ok: true,
        user,
        OTP
    });
   
    const texto= user.phone;
    let numeros='';
    for (var i = 0; i < texto.length; i++) {
        if (!isNaN(texto.charAt(i))) {
          numeros += texto.charAt(i);
        }
      }
    await client.messages.create(
        {
            body: `Preferred RS: Your user verification code is: ${OTP} This code expires in 5 minutes.  Please don't reply. `,
            messagingServiceSid: "MG8c2cb9f08f641001bc2c9832a7791a09",
            to:`+1${numeros}`
        }
    );
    
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error cargando usuario: '
        });
    }
});



// ===============================================
// cambiar OTP status usuario
// ===============================================
router.put('/verificationcode/:id', async (req, res) => {
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
    const verificationCode = true;
    // const userEdit = req.body.userEdit;
    
    const userActualizado = await User.findByIdAndUpdate( id, {verificationCode}, { new: true } );
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


// ===============================================
// add signature
// ===============================================
router.put('/signature/:id', async (req, res) => {
    const id = req.params.id;
    const signature= req.body.signature;
   try{
    const userDB = await User.findById(id);
    if ( !userDB ) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id'
        });
    }
    
    const userActualizado = await User.findByIdAndUpdate( id, {signature}, { new: true } );
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

module.exports = router;
const { Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const forgotMail = require('../middlewares/forgotMail');


const User = require('../models/user.models');
const { generarJWT } = require('../helpers/jwt');
const { validarJWT } = require('../middlewares/validarJWT');

const {check}= require('express-validator');
const {validarCampos}= require('../middlewares/validar-campos');
const accountSid = "AC5d280018b2bb89c7a804d02267ddbd79";
const authToken = "dccdaf7c5c0edc5c61620277ccfc256e";
const verifySid = "VA501e470354a724cddf808215743c81c7";
const client = require("twilio")(accountSid, authToken);

let OTP;
let diferencia;
// ===============================================
// Sign In Normal
// ===============================================
router.post('/', [
    check('email','El Correo Electronico es Obligatorio').isEmail(),
    check('password','La contraseña es Obligatoria').not().isEmpty(),
    validarCampos
], async(req, res, next ) => {

    const {email, password}= req.body;
    try {
        const userDB = await User.findOne({email,  status: 'Active'});
        
        if (!userDB){
           return  res.status(404).json({
                ok: false,
                msg: `We can't find a user with that email address.`
            });
        }

        const validarPassword = bcrypt.compareSync(password, userDB.password);
        if(!validarPassword){
            return  res.status(400).json({
                ok: false,
                msg: 'These credentials do not match our records.'
            });
        }else{
            
            const token = await generarJWT(userDB.id, userDB.name);
        res.json({
            ok: true,
            token,
            userDB
        })
        }

        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error login'
        })
    }

});

//===============================================
// olvido contraseña
//===============================================
router.post('/forgot',
[ check('email','email is required').isEmail(),], 
validarCampos,
async(req, res) => {
    const email= req.body;
    try {   
        const user = await User.findOne(email);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'We can\'t find a user with that email address.'
            }); 
        }else {
            console.log(user);
            const token = await generarJWT(user.id, user.name);
        // res.json({
        //     ok: true,
        //     token,
        //     user
        // })
        console.log(token);
            const dataemail= {
                to: user.email,
                //to: 'delgadovillate@gmail.com',
                 subject: "Reset Password Notification",
                //  text: 'Recuperar contraseña',
                 email: user.email,
                 name: user.name,
                 //link: `localhost:4200/#/newpassword/${token}`
                 link: `https://app.get-preferred.com/#/newpassword/${token}`
             }
             forgotMail(dataemail);
        }
    res.json({
        ok: true,
        user
    }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error users'
        });
    }
});

// ===============================================
// Verificar token 
// ===============================================

router.get('/renew', validarJWT, async(req, res ) => {
  
    try { 
        const id = req._id;
        const token = await generarJWT(id);

        const user = await User.findById(id);
        res.json({
            ok: true,
            token,
            user,
            id
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error login'
        })
    }

});

//===============================================
// obtener Un usuario + enviar OTP + agregar fecha y OTP 
//===============================================
router.get('/:id',async(req, res) => {
    const id = req.params.id;
    const fecha= new Date;
    const ramdom= Math.floor(Math.random() * 900000) + 100000;
    OTP= ramdom.toString();
    console.log('el Codigo OTP es'+OTP);
    try {
        const user = await User.findById(id);   
        const texto= user.phone;
        let numeros='';
        for (var i = 0; i < texto.length; i++) {
            if (!isNaN(texto.charAt(i))) {
            numeros += texto.charAt(i);
            }
        }

   if (user.verificationCode) {
    res.json({
        ok: true,
        user: user,
        msg:'verified OTP'
    });
   }else if (!user.fechaOTP && !user.verificationCode )   {
        console.log('Creando nuevo OTP');
        const fechaOTP = new Date();
        const userActualizado = await User.findByIdAndUpdate( id, {OTP, fechaOTP}, { new: true } );
        res.json({
            ok: true,
            user: userActualizado,
            msg:'Sent new OTP'
        });

        await client.messages.create(
            {
                body: `Preferred RS: Your user verification code is: ${OTP} This code expires in 5 minutes.  Please don't reply. `,
                messagingServiceSid: "MG8c2cb9f08f641001bc2c9832a7791a09",
                to:`+1${numeros}`
            }
        );
        
    }else if (user.fechaOTP && !user.verificationCode) {
        diferencia = Math.floor((fecha - user.fechaOTP)/(1000*60));
        console.log('la diferencia de fechas es :'+diferencia);
        if (diferencia<=5) {
            res.json({
                ok: true,
                user ,
                msg:'User have otp'
            });
        }else if(!user.verificationCode) {
            console.log('Generando OTP por tiempo expirado');
            const fechaOTP = new Date();
            const userActualizado = await User.findByIdAndUpdate( id, {OTP, fechaOTP}, { new: true } );
            res.json({
                ok: true,
                user: userActualizado,
                msg:'Sent new OTP'
            }); 
            await client.messages.create(
            {
                body: `Preferred RS: Your user verification code is: ${OTP} This code expires in 5 minutes.  Please don't reply. `,
                messagingServiceSid: "MG8c2cb9f08f641001bc2c9832a7791a09",
                to:`+1${numeros}`
            }
        );
        }
        
        
    }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: ' Error Users verification: '
        });
    }
});

// ===============================================
// verificar OTP
// ===============================================
router.post('/otp/verify', async(req, res, next ) => {

    const {id,OTP}= req.body;
    console.log(id);
    try {
        const userDB = await User.findById(id);
        console.log(userDB.OTP);
        if (!userDB){
           return  res.status(404).json({
                ok: false,
                msg: `We can't find a user with that email address.`
            });
        }else{
            const fechaVerify= new Date();
            const diferenciaVerify = Math.floor((fechaVerify-userDB.fechaOTP)/(1000*60));
            console.log('la diferencia Verify de fechas es :'+diferenciaVerify+'OTP:'+ OTP+' userdb otp:'+userDB.OTP);
            if(userDB.OTP === OTP && diferenciaVerify<=5){
                const token = await generarJWT(userDB.id, userDB.name);
                // console.log(token);
                const userActualizado= await User.findByIdAndUpdate(id, {verificationCode: true} ,{new: true})
               console.log(userActualizado);
                return  res.json({
                    ok: true,
                    userDB,
                    diferenciaVerify,
                    token,
                    msg: 'Provided verification code ok .'
                });
            }
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error login'
        })
    }

});


module.exports = router;
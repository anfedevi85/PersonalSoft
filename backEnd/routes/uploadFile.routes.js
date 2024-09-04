const { Router} = require('express');
const { validarJWT } = require('../middlewares/validarJWT');
const {check}= require('express-validator');
const {validarCampos}= require('../middlewares/validar-campos');
const formidable = require('formidable');
const multer = require('multer');
const IncomingForm = require('formidable').IncomingForm;
const { actualizarArchivo } = require('../helpers/actualizarArchivo');

const router = Router();

// ===============================================
// Actualizar imagen del Usuario
// ===============================================

router.put('/:tipo/:id',validarJWT, (req, res, next) => {
    const tipo= req.params.tipo;
    const id= req.params.id ;
    console.log({tipo, id})

    var form = new formidable.IncomingForm()
    form.parse(req)
    form.on('fileBegin', function(name, file){
        const nombre = `${tipo}/${Date.now()}_${file.name}`
        file.path= `uploads/imagenes/${nombre}`
        actualizarArchivo(tipo,id, nombre);
        return res.json({
            ok: true,
            nombre
        });
    });
    form.on('file', function(name, file){
    })
    
});



// ===============================================
// Subir imagen
// ===============================================


router.post('/:tipo', async (req, res, next)  => {
    const tipo= req.params.tipo;

    var form =  new formidable.IncomingForm({
        maxFileSize: 20 * 1024 * 1024, // 10 MB (ajusta este valor según tus necesidades)
        maxFieldsSize: 20 * 1024 * 1024 // 20 MB (ajusta este valor según tus necesidades)
    })
    form.parse(req)
    form.on('fileBegin', function(name, file){
        const archivo = file.name.replace(/[ /#?]/g, '').trim();
        const nombre =`${tipo}/${Date.now()}_${archivo}`
        file.path= `uploads/imagenes/${nombre}`
        return res.json({
            ok: true,
            nombre
        });
    });
    form.on('file', function(name, file){
    console.log("uploaded file "+ file.name)
    })
    
});




const storage =multer.diskStorage({
    filename: function(res, file, cb){
        const ext = file.originalname.split('.').pop()
        const fileName= Date.now();
        cb(null, `${fileName}.${ext}`)
    },
    destination: function(res, file, cb){
        cb(null, `./uploads/imagenes/companies`)
    }
});

const upload = multer({storage ,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB
    },})


    const storage2 =multer.diskStorage({
        filename: function(res, file, cb){
            const ext = file.originalname.split('.').pop()
            const fileName= Date.now();
            cb(null, `${fileName}.${ext}`)
        },
        destination: function(res, file, cb){
            cb(null, `./uploads/imagenes/jobfile`)
        }
    });
    
    const upload2 = multer({storage: storage2 ,
        limits: {
          fileSize: 50 * 1024 * 1024, // 50MB
        },})
    
    

  

router.post('/upload/companies' , upload.single('myFile'), (req,res)=>{
    const file = req.file;
    const carpeta= req.params.tipo;
    console.log('--------------------------------------');
   
    console.log(file);
    res.send({
        data: "ok",
        url : file
    })
})




router.post('/upload/jobfile' , upload2.single('myFile'), (req,res)=>{
    const file = req.file;
    const carpeta= req.params.tipo;
    console.log('--------------------------------------');
    console.log(file);
    res.send({
        data: "ok",
        url : file
    })
})


module.exports = router;
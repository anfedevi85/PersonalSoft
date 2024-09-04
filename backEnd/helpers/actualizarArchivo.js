const fs = require('fs');

const User = require('../models/user.models');

const actualizarArchivo= async (tipo,id, nombre)=>{

console.log(tipo);
    switch (tipo) {
        case 'user':
            const user = await  User.findById(id)
    
            if (!user) {
                console.log('no se encontro el id del usuario para cambiar la imagen')
                return false;
            }
            const pathViejo = `./uploads/imagenes/${user.imagePath}`
        
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }
            user.imagePath= nombre;
            await user.save();
            return true ;
            
            break;
    }
    
   
}


module.exports={
    actualizarArchivo
} 
const mongoose= require('mongoose');

var configDB = { 

    // ===============================================
    // Url Base de Datos de Produccion 
    // ===============================================

    
    //'url' : 'mongodb://13.58.108.223:27017/AppsGroV2'

    // ===============================================
    // Url Base de Datos de Pruebas.
    // ===============================================
    
   // 'url' : 'mongodb://localhost:27017/preferredTest'
   // "url":'mongodb://admin:0&Cqm.4-22@ec2-3-141-106-205.us-east-2.compute.amazonaws.com/prueba?authSource=admin&retryWrites=true&w=majority'
    "url":'mongodb://admin:0&Cqm.4-22@ec2-3-17-61-28.us-east-2.compute.amazonaws.com/prueba?authSource=admin&retryWrites=true&w=majority'
}

// ===============================================
// Mongoose Connection
// ===============================================

const dbConnection = async() => {
    try { await mongoose.connect(
        configDB.url, { 
                    });
            console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online');                                    
    }catch (error){ console.log(error);
                        throw new Error('Error al intentar conectar la base de Datos');
                    }   
}

module.exports = {
    dbConnection
}
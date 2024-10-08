const jwt = require('jsonwebtoken');

const validarJWT = (req , res , next) => {

    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            ok: false,
            msg : 'No hay token en la peticion'
        });
    }

    try {
        const {name, _id}= jwt.verify( token , process.env.JWT_SECRET);
        req._id= _id;
        next();
    
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'token incorrecto'
        })
    }
}


module.exports = {
    validarJWT
}
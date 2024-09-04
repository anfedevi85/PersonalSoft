const jwt = require('jsonwebtoken');

const generarJWT= (_id, name) => {

return new Promise((res, rej) =>{

    const payload= {
        _id,
        name
    };

    jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '4h'
    }, (err, token) => {
        if (err){
            console.log(err);
            rej('No se genero el JWT')

        }else{
            res(token);
        }
    });
});

    
}

module.exports= {
    generarJWT,
}
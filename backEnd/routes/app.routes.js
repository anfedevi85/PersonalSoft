// ===============================================
// Ruta:  '/'
// ===============================================

const { Router} = require('express');
const app =Router();

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

module.exports = app;
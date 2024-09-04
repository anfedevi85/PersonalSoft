// Requires
const { dbConnection } = require('./config/database');
const { REFUSED } = require('dns');

const express = require('express');
const path = require('path');
const helmet = require('helmet')
const bodyParser = require('body-parser')

require('dotenv').config()

// ===============================================
// Inicializar variables
// ===============================================
const app = express();
const cors = require('cors');

// ===============================================
// Base de Datos
// ===============================================

dbConnection();

// ===============================================
//  Middlewares
// ===============================================
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());

app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))
// Directorio publico 
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.static('./uploads'));

// app.use(bodyParser.urlencoded({ extended: false }));
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use((req, res, next) => {
    req.setTimeout(10000); // 10 segundos
  
    next();
  });

app.use(express.json());



// ===============================================
// Rutas
// ===============================================
app.use('/', require('./routes/app.routes'));
app.use('/login', require('./routes/auth.routes'));
app.use('/company', require('./routes/company.routes')); 
app.use('/file', require('./routes/uploadFile.routes')); 
app.use('/user', require('./routes/user.routes')); 
app.use('/option', require('./routes/option.routes')); 
app.use('/producto', require('./routes/producto.routes')); 

app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../frontend/src/index.html'));
})
// ===============================================
// Server listening
// ===============================================

app.listen(process.env.PORT, () => console.log(`Express server puerto: ${ process.env.PORT }` + ' \x1b[32m%s\x1b[0m', ' Online'));
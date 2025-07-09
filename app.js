const express = require('express');
const dotenv = require('dotenv').config(); // Para cargar variables de entorno
const connectDB = require('./config/db'); // Importa la funci�n de conexi�n a DB

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Middleware para parsear datos de formularios (si los usaras)
app.use(express.urlencoded({ extended: false }));

// Ruta base
app.get('/', (req, res) => {
    res.send('API RESTful con Node.js, Express y MongoDB');
});

// Rutas de la API de Productos
app.use('/api/productos', require('./routes/productos'));

// Puerto del servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));

// Prueba de branch!!
import express from 'express';

const app = express();

// Ruta principal
app.get('/', (req, res) => {
    res.send('Prueba de API version 2');
});

// Escuchar en el puerto 3000
app.listen(3000, () => {
    console.log('El servido esta listo http://localhost:3000');
});

export default app;

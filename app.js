import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import subRouter from './routes/sub.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();

// Ruta de Usuarios

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/sub', subRouter);
app.use('/api/v1/user', userRouter);

// Ruta principal
app.get('/', (req, res) => {
    res.send('Prueba de API version 2');
});

// Encontrar el puerto
app.listen(PORT, () => {
    console.log(`El servidor esta listo: http://localhost:${PORT}`);
});

export default app;

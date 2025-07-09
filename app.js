import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import subRouter from './routes/sub.routes.js';
import authRouter from './routes/auth.routes.js';
import connectionToDatabase from './database/mongodb.js';   

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
app.listen(PORT, async () => {
    console.log(`El servidor está listo: http://localhost:${PORT}`);
    await connectionToDatabase();
});

export default app;


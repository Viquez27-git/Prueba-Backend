import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => res.send({ title: 'OBTENER todos los usuarios' }));

userRouter.get('/:id', (req, res) => res.send({ title: 'OBTENER todos los id' }));

userRouter.post('/', (req, res) => res.send({ title: 'Crear usuario' }));

userRouter.put('/:id', (req, res) => res.send({ title: 'Actualizar usuarios' }));

userRouter.delete('/:id', (req, res) => res.send({ title: 'ELIMINAR todos los usuarios' }));

export default userRouter;
import { Router } from "express";   

const subRouter = Router();

subRouter.get('/', (req, res) => res.send({ title: 'OBTENER suscripciones ' }));

subRouter.get('/:id', (req, res) => res.send({ title: 'OBTENER suscripciones por id ' }));

subRouter.post('/', (req, res) => res.send({ title: 'CREAR suscripciones ' }));

subRouter.put('/', (req, res) => res.send({ title: 'ACTUALIZAR suscripciones ' }));

subRouter.delete('/', (req, res) => res.send({ title: 'ELIMINAR suscripciones ' }));

subRouter.get('/user/:id', (req, res) => res.send({ title: 'OBTENER todos los usuarios con suscripciones ' }));

subRouter.put('/:id/cancel', (req, res) => res.send({ title: 'Cancelar suscripciones ' }));

subRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'OBTENER proximas renovaciones ' }));

export default subRouter;
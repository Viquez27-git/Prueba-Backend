const express = require('express');
const router = express.Router();
const {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto
} = require('../controllers/productos');

// Rutas para /api/productos
router.route('/').get(getProductos).post(createProducto);

// Rutas para /api/productos/:id
router.route('/:id').get(getProducto).put(updateProducto).delete(deleteProducto);

module.exports = router;
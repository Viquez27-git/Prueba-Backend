const Producto = require('../models/Producto');

// @desc    Obtener todos los productos
// @route   GET /api/productos
// @access  Public
const getProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        // En caso de error del servidor (ej. problema de conexión con DB)
        res.status(500).json({ message: error.message });
    }
};

// @desc    Obtener un solo producto por ID
// @route   GET /api/productos/:id
// @access  Public
const getProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            // Si el producto no se encuentra, devuelve un 404 Not Found
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        // Si se encuentra, devuelve el producto con un 200 OK
        res.status(200).json(producto);
    } catch (error) {
        // En caso de que el ID no tenga el formato correcto o error del servidor
        res.status(500).json({ message: error.message });
    }
};

// @desc    Crear un nuevo producto
// @route   POST /api/productos
// @access  Public
const createProducto = async (req, res) => {
    const { nombre, descripcion, precio, disponible } = req.body;

    // Validación básica de campos requeridos antes de intentar crear
    if (!nombre || !descripcion || !precio) {
        // Si falta algún campo esencial, devuelve un 400 Bad Request
        return res.status(400).json({ message: 'Por favor, complete todos los campos requeridos: nombre, descripción y precio.' });
    }

    try {
        const producto = await Producto.create({
            nombre,
            descripcion,
            precio,
            // 'disponible' es opcional y tiene un valor por defecto en el esquema
            disponible,
        });
        // Si se crea correctamente, devuelve el producto creado con un 201 Created
        res.status(201).json(producto);
    } catch (error) {
        // Si hay un error (ej. nombre duplicado por 'unique: true' en el schema, o error de validación de Mongoose)
        res.status(400).json({ message: error.message }); // 400 Bad Request para errores de validación
    }
};

// @desc    Actualizar un producto
// @route   PUT /api/productos/:id
// @access  Public
const updateProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            // Si el producto no se encuentra, devuelve un 404 Not Found
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Busca y actualiza el documento.
        // { new: true } devuelve el documento después de la actualización.
        // { runValidators: true } ejecuta las validaciones del esquema durante la actualización.
        const updatedProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        // Si se actualiza correctamente, devuelve el producto actualizado con un 200 OK
        res.status(200).json(updatedProducto);
    } catch (error) {
        // En caso de error de validación o del servidor
        res.status(400).json({ message: error.message });
    }
};

// @desc    Eliminar un producto
// @route   DELETE /api/productos/:id
// @access  Public
const deleteProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            // Si el producto no se encuentra, devuelve un 404 Not Found
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Elimina el documento.
        // Para Mongoose 6+, se recomienda usar deleteOne o deleteMany.
        // Nota: Para versiones muy antiguas (antes de Mongoose 5), se usaba `producto.remove()`.
        await Producto.deleteOne({ _id: req.params.id });

        // Si se elimina correctamente, devuelve un 200 OK con un mensaje
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        // En caso de error del servidor
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto,
};
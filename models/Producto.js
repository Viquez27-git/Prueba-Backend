const mongoose = require('mongoose');

const productoSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'Por favor añade un nombre'],
            unique: true, // Asegura que no haya productos con el mismo nombre
        },
        descripcion: {
            type: String,
            required: [true, 'Por favor añade una descripción'],
        },
        precio: {
            type: Number,
            required: [true, 'Por favor añade un precio'],
        },
        disponible: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // Añade campos createdAt y updatedAt automáticamente
    }
);

module.exports = mongoose.model('Producto', productoSchema);
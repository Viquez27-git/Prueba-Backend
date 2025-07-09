const mongoose = require('mongoose');

const productoSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'Por favor a�ade un nombre'],
            unique: true, // Asegura que no haya productos con el mismo nombre
        },
        descripcion: {
            type: String,
            required: [true, 'Por favor a�ade una descripci�n'],
        },
        precio: {
            type: Number,
            required: [true, 'Por favor a�ade un precio'],
        },
        disponible: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // A�ade campos createdAt y updatedAt autom�ticamente
    }
);

module.exports = mongoose.model('Producto', productoSchema);
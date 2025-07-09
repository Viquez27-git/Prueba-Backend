const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    console.error(err);

    // ID inválido
    if (err.name === 'CastError') {
      const message = "Recurso no encontrado";
      error = new Error(message);
      error.statusCode = 404;
    }

    // Clave duplicada
    if (err.code === 11000) {
      const message = "Campo duplicado";
      error = new Error(message);
      error.statusCode = 400;
    }

    // Error de validación
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      error = new Error(message.join(', '));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });

  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;

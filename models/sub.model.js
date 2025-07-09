import mongoose from "mongoose";

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nombre de suscripción requerido"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Precio de la suscripción requerido"],
      min: [0, "Debe ser mayor a 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD"
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["sports", "news", "entertaiment", "lifestyle"],
      required: true,
    },
    paymentMethod: { 
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ["Activo", "Cancelado", "Expirado"],
      default: "Activo"
    },
    startDate: {  
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "La fecha debe ser antes de hoy"
      }
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
            return value > this.startDate;
        },
        message: "La renovación debe ser después de la fecha de inicio"
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware para calcular renovación automáticamente
subSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // Cambiar estado si la renovación ya expiró
  if (this.renewalDate < new Date()) {
    this.status = "Expirado";  
  }

  next();
});

const Suscripciones = mongoose.model("Subscription", subSchema);

export default Suscripciones;

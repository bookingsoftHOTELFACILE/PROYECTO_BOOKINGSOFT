import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import healthRoutes from './routes/healthRoutes';
import serviceRoutes from './routes/serviceRoutes';
import bookingRoutes from './routes/bookingRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

// Middlewares de seguridad y utilidad
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Prefijo global de API
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// Definición de Rutas
app.use(API_PREFIX, healthRoutes);
app.use(API_PREFIX, serviceRoutes);
app.use(API_PREFIX, bookingRoutes);

// Manejo de rutas no encontradas (404)
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    timestamp: new Date().toISOString(),
  });
});

// Middleware global de errores
app.use(errorHandler);

export default app;

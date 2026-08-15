import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Servidor BookingSoft iniciado en puerto: ${PORT}`);
  console.log(`🌐 Healthcheck disponible en: http://localhost:${PORT}/api/v1/health`);
  console.log(`==================================================`);
});

// Manejo elegante de apagado
const gracefulShutdown = (signal: string) => {
  console.log(`Se recibió la señal ${signal}. Cerrando servidor HTTP...`);
  server.close(() => {
    console.log('Servidor HTTP cerrado exitosamente.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

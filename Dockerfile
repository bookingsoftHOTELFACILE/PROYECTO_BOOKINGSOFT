# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar configuración de dependencias
COPY package.json ./
COPY tsconfig.json ./

# Instalar dependencias exactas
RUN npm ci --only=production && cp -R node_modules prod_node_modules
RUN npm ci

# Copiar código fuente y compilar
COPY src ./src
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Copiar archivos compilados y dependencias de producción
COPY --from=builder /app/prod_node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

# Exponer el puerto de la aplicación
EXPOSE 3000

# Healthcheck interno del contenedor
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/v1/health || exit 1

# Comando de arranque
CMD ["node", "dist/server.js"]

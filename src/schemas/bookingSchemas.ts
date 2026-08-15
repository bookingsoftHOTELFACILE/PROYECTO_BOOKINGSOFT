import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(3, 'El nombre del servicio debe tener al menos 3 caracteres'),
  description: z.string().min(5, 'La descripción debe tener al menos 5 caracteres'),
  durationMinutes: z.number().int().positive('La duración debe ser un número entero positivo en minutos'),
  price: z.number().nonnegative('El precio debe ser un número no negativo'),
});

export const createBookingSchema = z.object({
  serviceId: z.string().min(1, 'El ID del servicio es obligatorio'),
  customerName: z.string().min(2, 'El nombre del cliente es obligatorio'),
  customerEmail: z.string().email('El correo electrónico del cliente no es válido'),
  customerPhone: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener el formato YYYY-MM-DD'),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'La hora de inicio debe tener el formato HH:mm'),
  notes: z.string().optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'], {
    errorMap: () => ({ message: 'El estado debe ser PENDING, CONFIRMED, CANCELLED o COMPLETED' }),
  }),
});

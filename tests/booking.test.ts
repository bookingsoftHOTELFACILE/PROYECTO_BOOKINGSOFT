import request from 'supertest';
import app from '../src/app';
import { bookingRepo } from '../src/repositories/bookingRepository';

describe('BookingSoft API - Automated Integration Tests', () => {
  beforeEach(async () => {
    await bookingRepo.clearAll();
  });

  describe('GET /api/v1/health', () => {
    it('debe retornar HTTP 200 OK con el estado UP del sistema', async () => {
      const response = await request(app).get('/api/v1/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('UP');
      expect(response.body.name).toBe('BookingSoft API');
    });
  });

  describe('GET /api/v1/services', () => {
    it('debe retornar la lista de servicios activos predeterminados', async () => {
      const response = await request(app).get('/api/v1/services');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/v1/bookings & Prevención de Traslapes', () => {
    it('debe permitir crear una reserva válida cuando la franja horaria está libre', async () => {
      const bookingData = {
        serviceId: 'srv-001',
        customerName: 'Carlos Mendoza',
        customerEmail: 'carlos@ejemplo.com',
        customerPhone: '+573001234567',
        date: '2026-09-01',
        startTime: '09:00',
        notes: 'Reserva inicial para prueba de software',
      };

      const response = await request(app)
        .post('/api/v1/bookings')
        .send(bookingData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.serviceId).toBe('srv-001');
      expect(response.body.data.startTime).toBe('09:00');
      expect(response.body.data.endTime).toBe('10:00'); // srv-001 dura 60 mins
      expect(response.body.data.status).toBe('CONFIRMED');
    });

    it('debe RECHAZAR con HTTP 409 Conflict una reserva que se traslape con una existente', async () => {
      // 1. Crear primera reserva 09:00 - 10:00
      await request(app).post('/api/v1/bookings').send({
        serviceId: 'srv-001',
        customerName: 'Usuario A',
        customerEmail: 'usuarioa@ejemplo.com',
        date: '2026-09-01',
        startTime: '09:00',
      });

      // 2. Intentar crear reserva traslapada 09:30 - 10:30 para el mismo servicio y fecha
      const response = await request(app).post('/api/v1/bookings').send({
        serviceId: 'srv-001',
        customerName: 'Usuario B (Conflicto)',
        customerEmail: 'usuariob@ejemplo.com',
        date: '2026-09-01',
        startTime: '09:30',
      });

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('traslapa');
    });
  });

  describe('GET /api/v1/bookings/availability', () => {
    it('debe calcular correctamente los bloques disponibles y ocupados', async () => {
      // Crear una reserva de 08:00 a 09:00
      await request(app).post('/api/v1/bookings').send({
        serviceId: 'srv-001',
        customerName: 'Cliente 1',
        customerEmail: 'cliente1@ejemplo.com',
        date: '2026-09-02',
        startTime: '08:00',
      });

      const response = await request(app)
        .get('/api/v1/bookings/availability')
        .query({ serviceId: 'srv-001', date: '2026-09-02' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const slots = response.body.data.slots;
      expect(slots.length).toBeGreaterThan(0);

      // El primer slot 08:00-09:00 debe estar ocupado (available: false)
      const slot8 = slots.find((s: any) => s.startTime === '08:00');
      expect(slot8.available).toBe(false);

      // El slot de las 09:00-10:00 debe estar libre (available: true)
      const slot9 = slots.find((s: any) => s.startTime === '09:00');
      expect(slot9.available).toBe(true);
    });
  });
});

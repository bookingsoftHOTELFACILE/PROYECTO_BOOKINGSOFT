import { bookingRepo } from '../repositories/bookingRepository';
import { Booking, BookingStatus, Service, TimeSlot } from '../types';

export class BookingService {
  /**
   * Convierte una hora en formato HH:mm a minutos desde las 00:00
   */
  private timeToMinutes(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Convierte minutos desde las 00:00 a formato HH:mm
   */
  private minutesToTime(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}`;
  }

  /**
   * Comprueba matemáticamente si dos intervalos de tiempo se traslapan.
   * Traslape <=> (InicioA < FinB) y (FinA > InicioB)
   */
  public isOverlapping(startA: string, endA: string, startB: string, endB: string): boolean {
    const aStart = this.timeToMinutes(startA);
    const aEnd = this.timeToMinutes(endA);
    const bStart = this.timeToMinutes(startB);
    const bEnd = this.timeToMinutes(endB);

    return aStart < bEnd && aEnd > bStart;
  }

  /**
   * Calcula la hora de fin a partir de la hora de inicio y la duración en minutos.
   */
  public calculateEndTime(startTime: string, durationMinutes: number): string {
    const startMins = this.timeToMinutes(startTime);
    const endMins = startMins + durationMinutes;
    return this.minutesToTime(endMins);
  }

  /**
   * Crea una nueva reserva previa verificación de traslape y existencia del servicio.
   */
  public async createBooking(params: {
    serviceId: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    date: string;
    startTime: string;
    notes?: string;
  }): Promise<Booking> {
    // 1. Obtener el servicio
    const service = await bookingRepo.getServiceById(params.serviceId);
    if (!service) {
      throw new Error(`El servicio especificado no existe (ID: ${params.serviceId})`);
    }

    if (!service.isActive) {
      throw new Error('El servicio seleccionado se encuentra actualmente inactivo');
    }

    // 2. Calcular hora de fin
    const endTime = this.calculateEndTime(params.startTime, service.durationMinutes);

    // 3. Obtener reservas existentes activas para ese servicio y fecha
    const existingBookings = await bookingRepo.getActiveBookingsForServiceAndDate(
      params.serviceId,
      params.date
    );

    // 4. Validar traslape
    for (const existing of existingBookings) {
      const overlap = this.isOverlapping(
        params.startTime,
        endTime,
        existing.startTime,
        existing.endTime
      );

      if (overlap) {
        throw new Error(
          `La franja horaria ${params.startTime} - ${endTime} se traslapa con una reserva existente (${existing.startTime} - ${existing.endTime})`
        );
      }
    }

    // 5. Guardar la reserva
    const newBooking = await bookingRepo.createBooking({
      serviceId: service.id,
      serviceName: service.name,
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      customerPhone: params.customerPhone,
      date: params.date,
      startTime: params.startTime,
      endTime,
      status: 'CONFIRMED',
      notes: params.notes,
    });

    return newBooking;
  }

  /**
   * Obtiene la lista de bloques de tiempo y su estado de disponibilidad para una fecha dada.
   */
  public async getAvailableSlots(
    serviceId: string,
    date: string,
    dayStart: string = '08:00',
    dayEnd: string = '18:00'
  ): Promise<{ service: Service; slots: TimeSlot[] }> {
    const service = await bookingRepo.getServiceById(serviceId);
    if (!service) {
      throw new Error(`Servicio no encontrado (ID: ${serviceId})`);
    }

    const existingBookings = await bookingRepo.getActiveBookingsForServiceAndDate(serviceId, date);
    const slots: TimeSlot[] = [];

    let currentMinutes = this.timeToMinutes(dayStart);
    const endMinutes = this.timeToMinutes(dayEnd);

    while (currentMinutes + service.durationMinutes <= endMinutes) {
      const slotStart = this.minutesToTime(currentMinutes);
      const slotEnd = this.minutesToTime(currentMinutes + service.durationMinutes);

      const activeBooking = existingBookings.find((b) =>
        this.isOverlapping(slotStart, slotEnd, b.startTime, b.endTime)
      );

      slots.push({
        startTime: slotStart,
        endTime: slotEnd,
        available: !activeBooking,
        bookingId: activeBooking?.id,
      });

      currentMinutes += service.durationMinutes;
    }

    return { service, slots };
  }

  /**
   * Actualiza el estado de una reserva.
   */
  public async updateStatus(bookingId: string, status: BookingStatus): Promise<Booking> {
    const booking = await bookingRepo.getBookingById(bookingId);
    if (!booking) {
      throw new Error(`Reserva no encontrada (ID: ${bookingId})`);
    }

    if (booking.status === 'COMPLETED' && status === 'CANCELLED') {
      throw new Error('No es posible cancelar una reserva en estado COMPLETED');
    }

    const updated = await bookingRepo.updateBookingStatus(bookingId, status);
    if (!updated) {
      throw new Error('Error al actualizar el estado de la reserva');
    }

    return updated;
  }
}

export const bookingService = new BookingService();

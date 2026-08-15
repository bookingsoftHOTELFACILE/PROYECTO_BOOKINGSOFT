import { Service, Booking, BookingStatus } from '../types';

export class BookingRepository {
  private services: Service[] = [
    {
      id: 'srv-001',
      name: 'Asesoría Técnica Especializada',
      description: 'Sesión de consultoría técnica de software de 60 minutos',
      durationMinutes: 60,
      price: 50.0,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'srv-002',
      name: 'Auditoría de Código y Arquitectura',
      description: 'Revisión técnica de repositorio y reporte de calidad de 120 minutos',
      durationMinutes: 120,
      price: 120.0,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ];

  private bookings: Booking[] = [];

  // Métodos de Servicios
  public async getAllServices(): Promise<Service[]> {
    return this.services.filter((s) => s.isActive);
  }

  public async getServiceById(id: string): Promise<Service | undefined> {
    return this.services.find((s) => s.id === id);
  }

  public async createService(serviceData: Omit<Service, 'id' | 'createdAt'>): Promise<Service> {
    const newService: Service = {
      ...serviceData,
      id: `srv-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
    };
    this.services.push(newService);
    return newService;
  }

  public async updateService(id: string, updates: Partial<Omit<Service, 'id' | 'createdAt'>>): Promise<Service | null> {
    const index = this.services.findIndex((s) => s.id === id);
    if (index === -1) return null;

    this.services[index] = {
      ...this.services[index],
      ...updates,
    };
    return this.services[index];
  }

  // Métodos de Reservas
  public async getAllBookings(filters?: { serviceId?: string; date?: string; customerEmail?: string; status?: BookingStatus }): Promise<Booking[]> {
    let result = [...this.bookings];

    if (filters) {
      if (filters.serviceId) {
        result = result.filter((b) => b.serviceId === filters.serviceId);
      }
      if (filters.date) {
        result = result.filter((b) => b.date === filters.date);
      }
      if (filters.customerEmail) {
        result = result.filter((b) => b.customerEmail.toLowerCase() === filters.customerEmail!.toLowerCase());
      }
      if (filters.status) {
        result = result.filter((b) => b.status === filters.status);
      }
    }

    return result;
  }

  public async getBookingById(id: string): Promise<Booking | undefined> {
    return this.bookings.find((b) => b.id === id);
  }

  public async getActiveBookingsForServiceAndDate(serviceId: string, date: string): Promise<Booking[]> {
    return this.bookings.filter(
      (b) => b.serviceId === serviceId && b.date === date && b.status !== 'CANCELLED'
    );
  }

  public async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`,
      createdAt: new Date().toISOString(),
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  public async updateBookingStatus(id: string, status: BookingStatus): Promise<Booking | null> {
    const booking = this.bookings.find((b) => b.id === id);
    if (!booking) return null;

    booking.status = status;
    return booking;
  }

  public async clearAll(): Promise<void> {
    this.bookings = [];
  }
}

export const bookingRepo = new BookingRepository();

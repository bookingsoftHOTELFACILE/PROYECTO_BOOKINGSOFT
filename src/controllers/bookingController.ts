import { Request, Response, NextFunction } from 'express';
import { bookingService } from '../services/bookingService';
import { bookingRepo } from '../repositories/bookingRepository';
import { ApiResponse, BookingStatus } from '../types';

export class BookingController {
  public async getBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { serviceId, date, customerEmail, status } = req.query;

      const bookings = await bookingRepo.getAllBookings({
        serviceId: serviceId as string,
        date: date as string,
        customerEmail: customerEmail as string,
        status: status as BookingStatus,
      });

      res.status(200).json({
        success: true,
        data: bookings,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  public async getBookingById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const booking = await bookingRepo.getBookingById(id);

      if (!booking) {
        res.status(404).json({
          success: false,
          error: `Reserva con ID '${id}' no encontrada`,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: booking,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  public async createBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newBooking = await bookingService.createBooking(req.body);

      const response: ApiResponse = {
        success: true,
        message: 'Reserva creada y confirmada exitosamente',
        data: newBooking,
        timestamp: new Date().toISOString(),
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getAvailability(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { serviceId, date } = req.query;

      if (!serviceId || !date) {
        res.status(400).json({
          success: false,
          error: 'Parámetros obligatorios faltantes: serviceId y date (YYYY-MM-DD)',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const result = await bookingService.getAvailableSlots(
        serviceId as string,
        date as string
      );

      res.status(200).json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await bookingService.updateStatus(id, status);

      res.status(200).json({
        success: true,
        message: `Estado de la reserva actualizado a ${status}`,
        data: updated,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  public async cancelBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const updated = await bookingService.updateStatus(id, 'CANCELLED');

      res.status(200).json({
        success: true,
        message: 'Reserva cancelada exitosamente',
        data: updated,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
}

export const bookingController = new BookingController();

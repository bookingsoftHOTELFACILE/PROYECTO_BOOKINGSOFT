import { Request, Response, NextFunction } from 'express';
import { bookingRepo } from '../repositories/bookingRepository';
import { ApiResponse } from '../types';

export class ServiceController {
  public async getServices(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const services = await bookingRepo.getAllServices();
      const response: ApiResponse = {
        success: true,
        data: services,
        timestamp: new Date().toISOString(),
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getServiceById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const service = await bookingRepo.getServiceById(id);

      if (!service) {
        res.status(404).json({
          success: false,
          error: `Servicio con ID '${id}' no encontrado`,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: service,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  public async createService(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, description, durationMinutes, price } = req.body;

      const newService = await bookingRepo.createService({
        name,
        description,
        durationMinutes,
        price,
        isActive: true,
      });

      res.status(201).json({
        success: true,
        message: 'Servicio creado exitosamente',
        data: newService,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
}

export const serviceController = new ServiceController();

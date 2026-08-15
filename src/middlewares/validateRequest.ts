import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: 'Error de validación en los datos enviados',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
          timestamp: new Date().toISOString(),
        });
        return;
      }
      next(error);
    }
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: 'Error de validación en los parámetros de consulta',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
          timestamp: new Date().toISOString(),
        });
        return;
      }
      next(error);
    }
  };
};

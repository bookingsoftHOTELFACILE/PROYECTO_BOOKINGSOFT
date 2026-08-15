import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('[Error Handler]:', err);

  const statusCode = err.statusCode || (err.message.includes('traslapa') ? 409 : 400);

  const response: ApiResponse = {
    success: false,
    error: err.message || 'Error interno del servidor',
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
};

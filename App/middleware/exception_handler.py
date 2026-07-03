# MANEJO GLOBAL DE EXCEPCIONES

from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from sqlalchemy.exc import IntegrityError


# Excepciones personalizadas

class HotelException(Exception):
    def __init__(self, mensaje: str, status_code: int = 400):
        self.mensaje = mensaje
        self.status_code = status_code


class RecursoNoEncontrado(HotelException):
    def __init__(self, recurso: str):
        super().__init__(mensaje=f"{recurso} no encontrado", status_code=404)


class DatosInvalidos(HotelException):
    def __init__(self, detalle: str):
        super().__init__(mensaje=f"Datos invalidos: {detalle}", status_code=422)


class ConflictoRegistro(HotelException):
    def __init__(self, detalle: str):
        super().__init__(mensaje=f"Conflicto en el registro: {detalle}", status_code=409)


# Manejador de excepcion personalizada

async def hotel_exception_handler(request: Request, exc: HotelException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "mensaje": exc.mensaje
        }
    )


# Error de Integridad de Base de Datos (Claves duplicadas o foraneas invalidas)

async def integrity_exception_handler(request: Request, exc: IntegrityError):
    # Intentamos extraer un mensaje limpio del error de base de datos
    error_orig = str(exc.orig) if exc.orig else str(exc)
    mensaje = "Error de integridad en base de datos (registro duplicado o relacion inexistente)"
    if "already exists" in error_orig or "duplicate key" in error_orig:
        mensaje = "El registro ya existe (Llave duplicada)"
    elif "is not present in table" in error_orig or "violates foreign key" in error_orig:
        mensaje = "La relacion especificada no existe (Llave foranea invalida)"

    return JSONResponse(
        status_code=409,
        content={
            "success": False,
            "mensaje": mensaje
        }
    )


# Error HTTP (404, 400, etc.)

async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "mensaje": exc.detail
        }
    )


# Error de validacion de Pydantic

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "mensaje": "Error de validacion",
            "detalle": exc.errors()
        }
    )


# Error interno del servidor

async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "mensaje": "Error interno del servidor"
        }
    )
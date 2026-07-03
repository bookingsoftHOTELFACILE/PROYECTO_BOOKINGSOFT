from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from sqlalchemy.exc import IntegrityError

from App.database import Base, engine
from App.models import *
from App.middleware.logger import log_requests
from App.middleware.cors import configurar_cors

from App.middleware.exception_handler import (
    HotelException,
    hotel_exception_handler,
    integrity_exception_handler,
    http_exception_handler,
    validation_exception_handler,
    general_exception_handler
)

from App.routes import (
    roles,
    usuarios,
    clientes,
    habitaciones,
    reservas,
    facturas,
    pagos,
    servicios,
    eventos
)

app = FastAPI(
    title="Hotel API",
    version="1.0.0",
    description="API para la gestión hotelera"
)

# Configurar CORS
configurar_cors(app)

# Crear tablas al arrancar
Base.metadata.create_all(bind=engine)

@app.middleware("http")
async def logger_middleware(request, call_next):
    return await log_requests(request, call_next)

app.add_exception_handler(HotelException, hotel_exception_handler)
app.add_exception_handler(IntegrityError, integrity_exception_handler)
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, general_exception_handler)

# ROUTES
app.include_router(roles.router)
app.include_router(usuarios.router)
app.include_router(clientes.router)
app.include_router(habitaciones.router)
app.include_router(reservas.router)
app.include_router(facturas.router)
app.include_router(pagos.router)
app.include_router(servicios.router)
app.include_router(eventos.router)

@app.get("/")
def home():
    return {
        "mensaje": "Hotel Facile funcionando correctamente",
        "docs": "/docs"
    }
# MIDDLEWARE
# Intercepta cada petición HTTP

import time
from fastapi import Request

async def log_requests(request: Request, call_next):
    """
    Middleware que registra información de cada petición.
    """

    inicio = time.time()

    response = await call_next(request)

    tiempo = round((time.time() - inicio) * 1000, 2)

    print("=" * 60)
    print("PETICIÓN RECIBIDA")
    print(f"Método      : {request.method}")
    print(f"Ruta        : {request.url.path}")
    print(f"Cliente IP  : {request.client.host}")
    print(f"Tiempo      : {tiempo} ms")
    print(f"Estado HTTP : {response.status_code}")
    print("=" * 60)

    return response
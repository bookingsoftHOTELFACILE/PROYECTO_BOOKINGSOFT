from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, declarative_base

# Cadena de conexion a PostgreSQL
DATABASE_URL = "postgresql+psycopg2://facile:123456@localhost:5432/facile"

# Crear motor
engine = create_engine(
    DATABASE_URL,
    echo=True
)

# Configurar el search_path al schema hotel en cada conexion nueva
@event.listens_for(engine, "connect")
def set_search_path(dbapi_conn, connection_record):
    cursor = dbapi_conn.cursor()
    cursor.execute("SET search_path TO hotel")
    cursor.close()

# Crear sesiones
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base para los modelos
Base = declarative_base()


# Dependencia para FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
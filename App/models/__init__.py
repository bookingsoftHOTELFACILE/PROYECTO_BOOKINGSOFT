import os
import importlib

# Importar dinámicamente todos los módulos de este directorio para registrarlos en SQLAlchemy
pkg_dir = os.path.dirname(__file__)
for filename in os.listdir(pkg_dir):
    if filename.endswith(".py") and filename != "__init__.py":
        module_name = filename[:-3]
        importlib.import_module(f".{module_name}", package=__name__)

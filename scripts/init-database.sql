-- Crear la base de datos (ejecutar como superusuario)
CREATE DATABASE auth_db;

-- Crear usuario para la aplicación (opcional)
CREATE USER auth_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE auth_db TO auth_user;

-- Conectarse a la base de datos auth_db y ejecutar:
GRANT ALL ON SCHEMA public TO auth_user;

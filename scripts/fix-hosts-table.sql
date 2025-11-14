-- Script para corregir la tabla hosts
-- Si la columna principal se llama 'id', la renombramos a 'host_id'

USE `data-monitoring`;

-- Verificar la estructura actual
SHOW COLUMNS FROM hosts;

-- Opción 1: Si la tabla tiene una columna 'id', renombrarla a 'host_id'
ALTER TABLE hosts CHANGE COLUMN id host_id INT AUTO_INCREMENT;

-- Opción 2: Si la tabla NO tiene ninguna columna AUTO_INCREMENT, crearla
-- Solo ejecutar esta línea si la tabla está completamente vacía de claves primarias
-- ALTER TABLE hosts ADD COLUMN host_id INT AUTO_INCREMENT PRIMARY KEY FIRST;

-- Verificar la estructura final
DESCRIBE hosts;

-- Script de prueba de conexión
-- Ejecuta esto después de crear la base de datos

USE `data-monitoring`;

-- Insertar un host de prueba
INSERT INTO hosts (hostname, ip_address, description, status)
VALUES ('test-server', '192.168.1.100', 'Servidor de prueba', 'active');

-- Generar un token de prueba
INSERT INTO api_tokens (host_id, token, active)
VALUES (
  LAST_INSERT_ID(),
  SHA2(CONCAT('test-', NOW(), RAND()), 256),
  1
);

-- Verificar que todo funciona
SELECT 
  h.hostname,
  h.ip_address,
  t.token,
  t.created_at
FROM hosts h
JOIN api_tokens t ON h.host_id = t.host_id
WHERE h.hostname = 'test-server';

-- Limpiar datos de prueba
DELETE FROM hosts WHERE hostname = 'test-server';

SELECT 'Test completado exitosamente' AS Status;

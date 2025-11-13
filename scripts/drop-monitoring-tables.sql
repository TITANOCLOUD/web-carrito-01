-- Script para limpiar tablas de monitoreo antes de recrearlas
-- Ejecuta este script primero si tienes errores de foreign key

DROP TABLE IF EXISTS api_tokens;
DROP TABLE IF EXISTS metrics;
DROP TABLE IF EXISTS hosts;

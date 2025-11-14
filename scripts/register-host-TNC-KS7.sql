-- Registrar el servidor TNC-KS7-BAY-NRE-01 en el sistema de monitoreo

-- 1. Insertar el host
INSERT INTO hosts (
  hostname,
  ip_address,
  location,
  environment,
  status,
  last_seen
) VALUES (
  'TNC-KS7-BAY-NRE-01',
  '158.69.43.200',
  'OVH - Baie',
  'production',
  'active',
  NOW()
);

-- 2. Obtener el host_id que se acaba de crear
SET @host_id = LAST_INSERT_ID();

-- 3. Insertar el token de API asociado al host
INSERT INTO api_tokens (
  host_id,
  token,
  active,
  created_at
) VALUES (
  @host_id,
  '8782e947471589f2adca72cfab8408a50c7935675b50d1a17c85e1e04db29bf8',
  1,
  NOW()
);

-- 4. Verificar que se insertó correctamente
SELECT 
  h.host_id,
  h.hostname,
  h.ip_address,
  a.token,
  a.active,
  a.created_at
FROM hosts h
JOIN api_tokens a ON h.host_id = a.host_id
WHERE h.hostname = 'TNC-KS7-BAY-NRE-01';

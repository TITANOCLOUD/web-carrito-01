-- =====================================================
-- SCRIPT MAESTRO DE INSTALACIÓN
-- Sistema de Monitoreo TITANO CLOUD
-- saturn-o-cloud.com
-- =====================================================

-- PASO 1: Eliminar base de datos si existe (CUIDADO: Borra todo)
DROP DATABASE IF EXISTS `data-monitoring`;

-- PASO 2: Crear base de datos
CREATE DATABASE `data-monitoring` 
  DEFAULT CHARACTER SET utf8mb4 
  DEFAULT COLLATE utf8mb4_unicode_ci;

-- PASO 3: Usar la base de datos
USE `data-monitoring`;

-- PASO 4: Crear usuario (cambia la contraseña por la tuya)
-- Si el usuario ya existe, primero elimínalo
DROP USER IF EXISTS 'monitor_user'@'%';

CREATE USER 'monitor_user'@'%' IDENTIFIED BY 'TU_CONTRASEÑA_AQUI';

-- PASO 5: Otorgar todos los permisos
GRANT ALL PRIVILEGES ON `data-monitoring`.* TO 'monitor_user'@'%';
FLUSH PRIVILEGES;

-- =====================================================
-- CREACIÓN DE TABLAS
-- =====================================================

-- Tabla 1: Hosts monitoreados
CREATE TABLE hosts (
  host_id INT AUTO_INCREMENT PRIMARY KEY,
  hostname VARCHAR(255) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  description TEXT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_hostname (hostname),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla 2: Tokens de API (depende de hosts)
CREATE TABLE api_tokens (
  token_id INT AUTO_INCREMENT PRIMARY KEY,
  host_id INT NOT NULL,
  token VARCHAR(64) NOT NULL UNIQUE,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used TIMESTAMP NULL,
  FOREIGN KEY (host_id) REFERENCES hosts(host_id) ON DELETE CASCADE,
  INDEX idx_token (token),
  INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla 3: Métricas del sistema (depende de hosts)
CREATE TABLE metrics (
  metric_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  host_id INT NOT NULL,
  cpu_usage DECIMAL(5,2),
  memory_total BIGINT,
  memory_used BIGINT,
  memory_free BIGINT,
  disk_total BIGINT,
  disk_used BIGINT,
  disk_free BIGINT,
  network_rx BIGINT,
  network_tx BIGINT,
  load_avg VARCHAR(50),
  uptime BIGINT,
  processes INT,
  cpu_model VARCHAR(255),
  os_version VARCHAR(255),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (host_id) REFERENCES hosts(host_id) ON DELETE CASCADE,
  INDEX idx_host_timestamp (host_id, timestamp),
  INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla 4: Procesos (depende de hosts)
CREATE TABLE processes (
  process_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  host_id INT NOT NULL,
  pid INT NOT NULL,
  name VARCHAR(255),
  cpu_percent DECIMAL(5,2),
  memory_percent DECIMAL(5,2),
  status VARCHAR(50),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (host_id) REFERENCES hosts(host_id) ON DELETE CASCADE,
  INDEX idx_host_timestamp (host_id, timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla 5: Interfaces de red (depende de hosts)
CREATE TABLE network_interfaces (
  interface_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  host_id INT NOT NULL,
  interface_name VARCHAR(50) NOT NULL,
  bytes_sent BIGINT,
  bytes_recv BIGINT,
  packets_sent BIGINT,
  packets_recv BIGINT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (host_id) REFERENCES hosts(host_id) ON DELETE CASCADE,
  INDEX idx_host_timestamp (host_id, timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla 6: Alertas (depende de hosts)
CREATE TABLE alerts (
  alert_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  host_id INT NOT NULL,
  alert_type ENUM('cpu', 'memory', 'disk', 'network', 'process', 'custom') NOT NULL,
  severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
  message TEXT NOT NULL,
  threshold_value DECIMAL(10,2),
  current_value DECIMAL(10,2),
  status ENUM('active', 'acknowledged', 'resolved') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  FOREIGN KEY (host_id) REFERENCES hosts(host_id) ON DELETE CASCADE,
  INDEX idx_host_status (host_id, status),
  INDEX idx_severity (severity),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================

-- Mostrar todas las tablas creadas
SHOW TABLES;

-- Verificar el usuario
SELECT User, Host FROM mysql.user WHERE User = 'monitor_user';

-- Mensaje de confirmación
SELECT 'Base de datos de monitoreo creada exitosamente' AS Status;

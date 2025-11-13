-- Agregando ENGINE=InnoDB para soportar foreign keys correctamente
-- Tabla de hosts monitoreados
CREATE TABLE IF NOT EXISTS hosts (
  host_id INT AUTO_INCREMENT PRIMARY KEY,
  hostname VARCHAR(255) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  description TEXT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de tokens de API
CREATE TABLE IF NOT EXISTS api_tokens (
  token_id INT AUTO_INCREMENT PRIMARY KEY,
  host_id INT NOT NULL,
  token VARCHAR(64) NOT NULL UNIQUE,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used TIMESTAMP NULL,
  FOREIGN KEY (host_id) REFERENCES hosts(host_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de métricas
CREATE TABLE IF NOT EXISTS metrics (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

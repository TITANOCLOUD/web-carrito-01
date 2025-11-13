# Instalación Base de Datos de Monitoreo

## Paso 1: Editar la contraseña

Abre el archivo `scripts/setup-monitoring-complete.sql` y busca la línea:

\`\`\`sql
CREATE USER 'monitor_user'@'%' IDENTIFIED BY 'TU_CONTRASEÑA_AQUI';
\`\`\`

Reemplaza `TU_CONTRASEÑA_AQUI` con la contraseña que está en tu variable de entorno `MONITORING_DB_PASSWORD`.

## Paso 2: Ejecutar el script

Conéctate a MySQL como root y ejecuta:

\`\`\`bash
mysql -u root -p < scripts/setup-monitoring-complete.sql
\`\`\`

O desde phpMyAdmin:
1. Ir a la pestaña SQL
2. Copiar y pegar todo el contenido de `setup-monitoring-complete.sql`
3. Hacer clic en "Continuar"

## Paso 3: Verificar variables de entorno

Asegúrate de que tienes estas variables en Vercel:

\`\`\`
MONITORING_DB_HOST=158.69.43.200
MONITORING_DB_PORT=3306
MONITORING_DB_USER=monitor_user
MONITORING_DB_PASSWORD=tu_contraseña
MONITORING_DB_NAME=data-monitoring
\`\`\`

## Paso 4: Probar conexión

Ejecuta el script de prueba:

\`\`\`bash
mysql -u monitor_user -p data-monitoring < scripts/test-connection.sql
\`\`\`

## Paso 5: Registrar el primer servidor

1. Ve a `/dashboard/monitoring/hosts`
2. Haz clic en "Registrar Nuevo Host"
3. Ingresa los datos de TNC-KS7-BAY-NRE-01
4. Copia el API token generado
5. Úsalo en el instalador del agente

## Tablas creadas

- **hosts**: Servidores monitoreados
- **api_tokens**: Tokens de autenticación
- **metrics**: Métricas del sistema (CPU, RAM, disco)
- **processes**: Procesos en ejecución
- **network_interfaces**: Estadísticas de red
- **alerts**: Sistema de alertas

## Notas importantes

- El script ELIMINA la base de datos si existe (DROP DATABASE)
- Cambia la contraseña antes de ejecutar
- El usuario se crea con acceso desde cualquier IP (%)
- Todas las tablas usan InnoDB con UTF8MB4

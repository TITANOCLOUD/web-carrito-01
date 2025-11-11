#!/bin/bash

# Script rápido para descargar e instalar desde el servidor

echo "Descargando e instalando archivos de monitoreo..."

# Descargar el script de instalación
curl -o /tmp/install-monitoring.sh https://saturn-o.cloud/scripts/install-monitoring-files.sh

# Ejecutar
chmod +x /tmp/install-monitoring.sh
bash /tmp/install-monitoring.sh

# Limpiar
rm /tmp/install-monitoring.sh

echo ""
echo "Instalación completada. Próximos pasos:"
echo ""
echo "1. Editar /home/saturnoocloud/nodeapp/.env.local con el password correcto de MySQL"
echo "2. Instalar mysql2: cd /home/saturnoocloud/nodeapp && npm install mysql2 --legacy-peer-deps"
echo "3. Reiniciar la aplicación Next.js: pm2 restart nodeapp (o el método que uses)"
echo ""

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
echo "Instalación completada. Recuerda editar:"
echo "  /home/saturnoocloud/nodeapp/.env.local"

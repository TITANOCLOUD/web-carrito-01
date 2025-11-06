#!/bin/bash

echo "🔄 Actualizando Saturn-O Cloud con Passenger..."

# Navegar al directorio del proyecto
cd /home/saturnoocloud/nodeapp

# Crear directorio tmp si no existe
mkdir -p tmp

# Hacer backup
echo "💾 Creando backup..."
if [ -d ".next" ]; then
    cp -r .next .next.backup.$(date +%Y%m%d_%H%M%S)
fi

# Actualizar código
echo "📥 Descargando últimos cambios..."
git pull origin main

# Instalar dependencias nuevas
echo "📦 Instalando dependencias..."
npm install

# Construir proyecto
echo "🔨 Construyendo proyecto..."
npm run build

# Copiar archivos necesarios
echo "📋 Copiando archivos..."
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# Reiniciar aplicación con Passenger
echo "🚀 Reiniciando aplicación..."
touch tmp/restart.txt

# Limpiar backups antiguos (mantener últimos 5)
echo "🧹 Limpiando backups antiguos..."
ls -t .next.backup.* 2>/dev/null | tail -n +6 | xargs rm -rf 2>/dev/null

echo "✅ Actualización completada!"
echo ""
echo "📊 Estado de Passenger:"
sudo passenger-status 2>/dev/null || echo "Ejecuta 'sudo passenger-status' para ver el estado"

echo ""
echo "🌐 Visita: https://saturn-o.cloud"

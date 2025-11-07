#!/bin/bash

# Script para limpiar rutas duplicadas
echo "Limpiando rutas duplicadas..."

# Eliminar carpetas duplicadas si existen
rm -rf app/bare-metal
rm -rf app/clusters  
rm -rf app/vps
rm -rf app/contacto

# Limpiar caché de Next.js
rm -rf .next
rm -rf node_modules/.cache

echo "Limpieza completada. Por favor ejecuta 'npm run dev' nuevamente."

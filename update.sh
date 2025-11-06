#!/bin/bash
# Script de Actualización Automática desde GitHub
# Uso: ./update.sh

set -e  # Salir si hay errores

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

APP_DIR="/home/saturnoocloud/nodeapp"
REPO_URL="https://github.com/TITANOCLOUD/web-carrito-01/archive/refs/heads/main.zip"
USERNAME="saturnoocloud"

cd "$APP_DIR"

echo -e "${CYAN}=== Actualizando Aplicación ===${NC}"
echo ""

# Limpiar archivos anteriores
echo -e "${YELLOW}[1/7] Limpiando archivos temporales...${NC}"
rm -f main.zip
rm -rf web-carrito-01-main

# Descargar última versión
echo -e "${YELLOW}[2/7] Descargando última versión desde GitHub...${NC}"
wget -q "$REPO_URL" -O main.zip

if [ ! -f main.zip ]; then
    echo -e "${RED}Error: No se pudo descargar el archivo${NC}"
    exit 1
fi

# Extraer archivos
echo -e "${YELLOW}[3/7] Extrayendo archivos...${NC}"
unzip -oq main.zip

# Copiar archivos
echo -e "${YELLOW}[4/7] Copiando archivos al directorio de aplicación...${NC}"
cp -rf web-carrito-01-main/* .
cp -rf web-carrito-01-main/.* . 2>/dev/null || true

# Limpiar archivos temporales
rm -rf web-carrito-01-main main.zip

# Instalar dependencias
echo -e "${YELLOW}[5/7] Instalando dependencias...${NC}"
npm install --silent

# Compilar proyecto
echo -e "${YELLOW}[6/7] Compilando proyecto...${NC}"
rm -rf .next
npm run build

# Arreglar permisos
echo -e "${YELLOW}[7/7] Arreglando permisos y reiniciando...${NC}"
chown -R ${USERNAME}:${USERNAME} "$APP_DIR"

# Crear directorio tmp si no existe
mkdir -p tmp

# Reiniciar aplicación
touch tmp/restart.txt
systemctl restart httpd

echo ""
echo -e "${GREEN}✓ Actualización completada exitosamente${NC}"
echo ""
echo -e "${CYAN}Verificando procesos Node.js:${NC}"
ps aux | grep node | grep -v grep || echo "No hay procesos Node.js visibles (normal con Passenger)"
echo ""
echo -e "${GREEN}La aplicación se ha actualizado y reiniciado${NC}"

# Despliegue con Passenger en WHM/cPanel

## Requisitos Previos
- ✅ Apache con Passenger instalado
- ✅ Node.js instalado
- ✅ Acceso SSH
- ✅ Git instalado

## Paso 1: Clonar el Repositorio

\`\`\`bash
# Conectar por SSH
ssh saturnoocloud@saturn-o.cloud

# Navegar al directorio
cd /home/saturnoocloud

# Clonar el repositorio
git clone https://github.com/TU-USUARIO/web-carrito-01.git nodeapp

# Entrar al directorio
cd nodeapp
\`\`\`

## Paso 2: Instalar Dependencias y Construir

\`\`\`bash
# Instalar dependencias
npm install

# Construir el proyecto
npm run build

# Copiar archivos necesarios para standalone
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
\`\`\`

## Paso 3: Crear Archivo de Entrada para Passenger

Passenger necesita un archivo `app.js` en la raíz del proyecto:

\`\`\`bash
# Ya está incluido en el proyecto como passenger.js
# Solo necesitas verificar que existe
ls -la passenger.js
\`\`\`

## Paso 4: Configurar Apache Virtual Host

Crear o editar el archivo de configuración de Apache:

\`\`\`bash
sudo nano /etc/apache2/sites-available/saturn-o.cloud.conf
\`\`\`

Agregar esta configuración:

```apache
<VirtualHost *:80>
    ServerName saturn-o.cloud
    ServerAlias www.saturn-o.cloud
    
    DocumentRoot /home/saturnoocloud/nodeapp
    
    # Passenger configuration
    PassengerEnabled on
    PassengerAppRoot /home/saturnoocloud/nodeapp
    PassengerAppType node
    PassengerStartupFile passenger.js
    PassengerNodejs /usr/bin/node
    
    # Environment
    PassengerAppEnv production
    SetEnv NODE_ENV production
    
    # Logs
    ErrorLog ${APACHE_LOG_DIR}/saturn-o-error.log
    CustomLog ${APACHE_LOG_DIR}/saturn-o-access.log combined
    
    <Directory /home/saturnoocloud/nodeapp>
        Allow from all
        Options -MultiViews
        Require all granted
    </Directory>
</VirtualHost>

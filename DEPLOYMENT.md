# Deployment Instructions for Titanocloud

## Quick Fix for Current Error

The error shows the app needs to be built. Run these commands on the server:

\`\`\`bash
cd /home/saturnoocloud/nodeapp
rm -rf .next
rm -rf app/bare-metal app/clusters app/vps app/contacto
npm run build
\`\`\`

## Alternative: Use the build script

\`\`\`bash
chmod +x build.sh
./build.sh
\`\`\`

## After Building

Restart the application:
\`\`\`bash
# If using PM2
pm2 restart all

# If using Passenger (as shown in logs)
touch tmp/restart.txt

# Or restart Apache
systemctl restart httpd
\`\`\`

## Credentials

- Usuario: **Admin**
- Contraseña: **Admin*2021**

## Important Notes

1. The app is configured for `/home/saturnoocloud/nodeapp` as root directory
2. ESLint configuration has been removed from next.config.mjs (no longer supported)
3. Turbopack root is now explicitly set to avoid workspace detection warnings
4. Remove the extra lockfile at `/home/saturnoocloud/package-lock.json` if not needed

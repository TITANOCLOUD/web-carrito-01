#!/bin/bash
# Script to build the Next.js application for production

echo "Building Titanocloud application..."

# Navigate to the app directory
cd /home/saturnoocloud/nodeapp

# Remove old build
rm -rf .next

# Clean any duplicate route folders
rm -rf app/bare-metal app/clusters app/vps app/contacto

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build the application
echo "Running Next.js build..."
npm run build

echo "Build complete! You can now start the application with 'npm start'"

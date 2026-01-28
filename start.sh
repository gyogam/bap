#!/bin/bash

echo "Starting Korean Hangul Practice App..."
echo ""
echo "The app will open at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

cd "$(dirname "$0")"

# Set environment variables
export BROWSER=none
export PORT=3000

# Start the development server
npm start

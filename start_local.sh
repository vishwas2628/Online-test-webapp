#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Online Test Web Application Locally...${NC}"

# Function to check and install dependencies
install_deps() {
    DIR=$1
    echo -e "${BLUE}Checking dependencies for $DIR...${NC}"
    cd $DIR
    if [ ! -d "node_modules" ]; then
        echo -e "${BLUE}Installing dependencies in $DIR...${NC}"
        npm install
    else
        echo -e "${GREEN}Dependencies found in $DIR.${NC}"
    fi
    cd ..
}

# Check and install dependencies
install_deps "backend"
install_deps "client"

echo -e "${BLUE}Starting Backend and Frontend concurrently...${NC}"
echo -e "${BLUE}Backend will be at http://localhost:5000 (default)${NC}"
echo -e "${BLUE}Frontend will be at http://localhost:5173 (default)${NC}"

# Start Backend
cd backend
npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}Backend started with PID $BACKEND_PID${NC}"

# Start Frontend
cd ../client
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend started with PID $FRONTEND_PID${NC}"

# Handle shutdown
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

# Wait for processes
wait

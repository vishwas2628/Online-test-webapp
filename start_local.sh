#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Online Test Web Application Locally...${NC}"

MONGO_CONTAINER_NAME="mongodb"
MONGO_URI="mongodb://admin:password@localhost:27017/online-test-app?authSource=admin"

# Start local MongoDB with Docker
start_mongo() {
    echo -e "${BLUE}Checking local MongoDB container...${NC}"

    if ! command -v docker >/dev/null 2>&1; then
        echo -e "${YELLOW}Docker is not installed or not available in PATH. Please start MongoDB manually.${NC}"
        exit 1
    fi

    if docker ps --format '{{.Names}}' | grep -q "^${MONGO_CONTAINER_NAME}$"; then
        echo -e "${GREEN}MongoDB container is already running.${NC}"
    elif docker ps -a --format '{{.Names}}' | grep -q "^${MONGO_CONTAINER_NAME}$"; then
        echo -e "${BLUE}Starting existing MongoDB container...${NC}"
        docker start "$MONGO_CONTAINER_NAME" >/dev/null
        echo -e "${GREEN}MongoDB container started.${NC}"
    else
        echo -e "${BLUE}Creating and starting MongoDB container...${NC}"
        docker run -d \
            --name "$MONGO_CONTAINER_NAME" \
            -p 27017:27017 \
            -e MONGO_INITDB_ROOT_USERNAME=admin \
            -e MONGO_INITDB_ROOT_PASSWORD=password \
            mongo:latest >/dev/null
        echo -e "${GREEN}MongoDB container created and started.${NC}"
    fi

    export MONGO_URI
    echo -e "${GREEN}MongoDB URI: $MONGO_URI${NC}"
}

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
start_mongo
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

#!/bin/bash

docker-compose down -v
docker-compose up -d

echo "Waiting for PostgreSQL to start..."
sleep 5

docker-compose exec postgres pg_isready -U ${DB_USER}

echo "Database is ready!"
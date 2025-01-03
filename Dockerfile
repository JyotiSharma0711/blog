FROM node:18-alpine

WORKDIR /app

# Add postgresql-client for database connectivity
RUN apk add --no-cache postgresql-client

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Install Prisma globally for runtime access
RUN npm install -g prisma

# Generate Prisma Client
RUN prisma generate

# Build the application
RUN npm run build

EXPOSE 5000

# Add wait-for-it script or similar to ensure database is ready
CMD ["npm", "start"]

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including devDependencies for build)
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /usr/src/app

# Install OpenSSL for Prisma runtime
RUN apk add --no-cache openssl

# Copy package files and install only production dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install --only=production
RUN npx prisma generate

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the API port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]

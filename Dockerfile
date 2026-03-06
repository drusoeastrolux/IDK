# Multi-stage build for production optimization
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Build the React application
FROM base AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install all dependencies
RUN npm ci

# Copy source code
COPY server/ ./server/
COPY client/ ./client/

# Build the React app
WORKDIR /app/client
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy built React app
COPY --from=builder --chown=nodejs:nodejs /app/client/build ./client/build

# Copy server source and install dependencies
COPY --from=builder --chown=nodejs:nodejs /app/server ./server
COPY --from=builder --chown=nodejs:nodejs /app/server/package*.json ./server/

# Install production dependencies only
RUN cd server && npm ci --only=production && npm cache clean --force

# Copy root package.json for scripts
COPY --chown=nodejs:nodejs package*.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node server/healthcheck.js || exit 1

# Start the application
CMD ["npm", "start"]

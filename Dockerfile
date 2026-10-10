FROM node:20-slim

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies required for tsc and vite build)
RUN npm install

# Copy source code (respecting .dockerignore)
COPY . .

# Build production React/TypeScript assets to dist/
RUN npm run build

# Render binds to PORT (defaults to 10000)
ENV PORT=10000
ENV NODE_ENV=production
EXPOSE 10000

# Start Express server that serves dist/
CMD ["node", "server.js"]

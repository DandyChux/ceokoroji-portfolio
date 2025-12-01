# Build stage with Node.js (more stable with Vite)
FROM node:20-alpine AS builder

WORKDIR /app

# Set Node options for more memory
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package files
COPY package.json bun.lockb ./

# Install Bun in the Node container (we'll use it for install)
RUN npm install -g bun

# Install dependencies with Bun
RUN bun install --frozen-lockfile --ignore-scripts

# Copy source code
COPY . .

# Run svelte-kit sync
RUN bun run prepare

# Build with Node (more stable than Bun for Vite builds)
RUN bunx --bun vite build

# Production stage - use nginx to serve static files
FROM nginx:alpine AS runner

# Copy the built static files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config for SPA routing
RUN echo 'server { \
	listen 80; \
	listen [::]:80; \
	root /usr/share/nginx/html; \
	index index.html; \
	location / { \
	try_files $uri $uri/ /200.html; \
	} \
	gzip on; \
	gzip_vary on; \
	gzip_min_length 1024; \
	gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json; \
	location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
	expires 1y; \
	add_header Cache-Control "public, immutable"; \
	} \
	}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
	CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

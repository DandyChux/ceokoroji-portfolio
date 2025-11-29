# Use Bun's official image
FROM oven/bun:1 AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies (skip the prepare script for now)
RUN bun install --frozen-lockfile --ignore-scripts

# Copy source code and config files
COPY . .

# Now run svelte-kit sync to generate the .svelte-kit directory
RUN bun run prepare

# Build the SvelteKit app with verbose output
RUN bun run build

# Production stage - use nginx to serve the static files
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
	# Enable gzip compression \
	gzip on; \
	gzip_vary on; \
	gzip_min_length 1024; \
	gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json; \
	# Cache static assets \
	location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
	expires 1y; \
	add_header Cache-Control "public, immutable"; \
	} \
	}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
	CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

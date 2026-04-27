# Variables
BINARY_NAME=ceokoroji-api
UI_DIR=ui
BUILD_DIR=$(UI_DIR)/build

.PHONY: all ui backend release clean start-server shadcn-add migrate-up migrate-down add-migration

# Default task
all: ui backend

# Build the SvelteKit UI with Bun
ui:
	@echo "🍞 Building SvelteKit Frontend with Bun..."
	cd $(UI_DIR) && bun install && bun run build

# Build the Rust Backend (Debug)
backend:
	@echo "🦀 Building Rust Backend (Debug)..."
	cargo build
	@echo "✅ Done! Binary at target/debug/$(BINARY_NAME)"

# Production Build (Optimized)
release:
	@echo "🚀 Starting Production Build (Bun + Rust)..."
	# --frozen-lockfile ensures production builds are reproducible
	cd $(UI_DIR) && bun install --frozen-lockfile && bun run build
	cargo build --release
	@echo "✅ Production binary ready at target/release/$(BINARY_NAME)"

clean:
	rm -rf $(BUILD_DIR)
	cargo clean

start-server:
	@cargo watch -q -c -w src/ -x run

# Usage: make shadcn-add COMPONENT=Button
shadcn-add:
	@bun x shadcn-svelte@latest add $(component)

migrate-up:
	@sqlx migrate run

migrate-down:
	@sqlx migrate revert

add-migration:
	@sqlx migrate add -r $(name)

start-server:
	@cargo watch -q -c -w src/ -x run

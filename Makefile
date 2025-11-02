# Usage: make shadcn-add COMPONENT=Button
shadcn-add:
	@bun x shadcn-svelte@latest add $(COMPONENT)

migrate-up:
	@cd api && sqlx migrate run

migrate-down:
	@cd api && sqlx migrate revert

add-migration:
	@cd api && sqlx migrate add -r $(name)

start-server:
	@cd api && cargo watch -q -c -w src/ -x run

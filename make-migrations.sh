#!/bin/zsh

# Run the migration generate command
pnpm migration:generate

# Get the latest file in the /drizzle folder
latest_drizzle_file=$(ls -t ./drizzle | head -n 1)

# Generate a unique migration name based on the current date and time
# This will generate two random strings, each of 6 characters, separated by a hyphen
migration_name=$(openssl rand -base64 12 | tr -d '/+=' | cut -c1-6)-$(openssl rand -base64 12 | tr -d '/+=' | cut -c1-6)

# Run the supabase migration generate command
supabase migration new $migration_name

# Get the latest file in the /supabase folder
latest_supabase_file=$(ls -t ./supabase/migrations | head -n 1)

# Copy the contents of the first generated file to the second generated file
cp ./drizzle/$latest_drizzle_file ./supabase/migrations/$latest_supabase_file
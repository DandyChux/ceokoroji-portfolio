// Run this once: cargo run --bin generate_hash -- "your-secure-password"
use argon2::password_hash::{SaltString, rand_core::OsRng};
use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let password = args.get(1).expect("Provide password as argument");

    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let password_hash = argon2
        .hash_password(password.as_bytes(), &salt)
        .unwrap()
        .to_string();

    println!("Add this to your .env file:");
    println!("ADMIN_PASSWORD_HASH={}", password_hash);
}

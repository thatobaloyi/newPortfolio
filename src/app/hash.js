// You would run this file separately (e.g., node hash_utility.js) to generate the hash.
// NOTE: You would need to install bcryptjs if you don't have it already: npm install bcryptjs

const bcrypt = require('bcryptjs');

const plaintextPassword = '';
const saltRounds = 10;

bcrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error("Error hashing password:", err);
        return;
    }
    console.log("--- Use this hash in your MongoDB Admin User Record ---");
    console.log("Plaintext Secret:", plaintextPassword);
    console.log("Hashed Secret:", hash);
    console.log("-------------------------------------------------------");
    
    // Example: $2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    // You would then manually insert this hash into your MongoDB admin user record.
});
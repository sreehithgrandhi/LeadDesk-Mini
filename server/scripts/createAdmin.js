const bcrypt = require("bcrypt");
const pool = require("../config/db");

async function createAdmin() {
  try {
    const email = "admin@gmail.com";
    const password = "password123";

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO admins (email, password_hash)
       VALUES ($1, $2)`,
      [email, hashedPassword]
    );

    console.log("✅ Admin created successfully");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

createAdmin();
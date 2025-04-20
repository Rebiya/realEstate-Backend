const { query } = require("../DB/dbconfig.js");
const fs = require("fs");
const path = require("path");

async function migrate() {
  const queryfile = path.join(__dirname, "sql", "db.sql");
  console.log(`Reading SQL file from: ${queryfile}`);

  // Verify file exists
  if (!fs.existsSync(queryfile)) {
    throw new Error(`SQL file not found at ${queryfile}`);
  }

  // Read and clean the SQL file
  const sqlContent = fs.readFileSync(queryfile, 'utf-8')
    .replace(/^\s*--.*$/gm, '') // Remove comments
    .trim();

  // Split into individual queries
  const queries = sqlContent.split(';')
    .map(q => q.trim())
    .filter(q => q.length > 0);

  console.log(`Found ${queries.length} queries to execute`);

  try {
    // Temporarily disable foreign key checks
    await query("SET FOREIGN_KEY_CHECKS = 0");

    // Execute each query
    for (let i = 0; i < queries.length; i++) {
      try {
        console.log(`Executing query ${i + 1}: ${queries[i].substring(0, 50)}...`);
        await query(queries[i] + ';'); // Add back the semicolon
        console.log(`✅ Query ${i + 1} executed successfully`);
      } catch (err) {
        console.error(`❌ Error executing query ${i + 1}:`, err);
        throw err; // Stop execution on first error
      }
    }

    // Re-enable foreign key checks
    await query("SET FOREIGN_KEY_CHECKS = 1");

    return {
      message: "✅ Database tables created successfully",
      status: 200
    };
  } catch (error) {
    return {
      message: "❌ Database tables creation failed",
      status: 500,
      error: error.message
    };
  }
}

module.exports = { migrate };
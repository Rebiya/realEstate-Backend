const migrateService = require("../services/migrate.service.js");

async function migrate(req, res) {
  try {
    const migrateMessage = await migrateService.migrate();
    res.status(migrateMessage.status).json({ message: migrateMessage.message });
  } catch (error) {
    console.error("❌ migration error:", error);
    res.status(500).json({ message: "migration failed" });
  }
}

module.exports = { migrate };

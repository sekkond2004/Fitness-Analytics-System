const fs = require('fs/promises');

async function readHealth() {
  try {
    const data = await fs.readFile('data/health-metrics.json', 'utf8');
    const healthData = JSON.parse(data);

    const totalEntries = healthData.metrics.length;

    console.log("Success! Found your health data!");
    console.log("Total health entries:", totalEntries);

    return totalEntries; // ✅ return value

  } catch (error) {
    console.log("Something went wrong:", error.message);
    throw error; // ✅ REQUIRED for Jest
  }
}

module.exports = { readHealth };

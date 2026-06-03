const fs = require('fs');
const path = require('path');

function getServiceCatalog() {
  try {
    const filePath = path.join(__dirname, '../../../../shared/technology-catalog/service-ownership-map.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error('Failed to read service-ownership-map.json', err);
    return { services: [] };
  }
}

module.exports = {
  getServiceCatalog
};

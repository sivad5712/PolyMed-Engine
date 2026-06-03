const fs = require('fs');
const path = require('path');

function getWorkflowMap() {
  try {
    const filePath = path.join(__dirname, '../../../../shared/technology-catalog/workflow-technology-map.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    return { workflows: [] };
  }
}

module.exports = {
  getWorkflowMap
};

const { writeFileSync, unlinkSync } = require('fs');
const { resolve } = require('path');

function createEnvFile(fileName, content) {
  const path = resolve(__dirname, fileName);
  writeFileSync(path, content);

  return {
    removeFile() {
      unlinkSync(path);
    },
  };
}

module.exports = createEnvFile;

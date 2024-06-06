const crypto = require('crypto')

function generateRandomId() {
  const id = crypto.randomBytes(16).toString('hex');
  return id;
};

console.log(generateRandomId());

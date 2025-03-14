const crypto = require('crypto');
const secratekey = crypto.randomBytes(64).toString("ascii")
console.log(secratekey);
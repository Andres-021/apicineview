const { trusted } = require("mongoose");

const cors_config = {
  application: {
    cors: {
      server: [
        {
          origin: "http://localhost:3000",
          credentials: true
        }
      ]
    }
  }
}

module.exports = cors_config;
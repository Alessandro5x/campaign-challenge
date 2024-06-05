const express = require('express');
const setupSwagger = require('./swagger');

module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const app = express();
      setupSwagger(app);

      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.done.tap('NextjsSwaggerPlugin', () => {
            app.listen(3001, () => {
              console.log(`Swagger docs available at http://localhost:3001/api-docs`);
            });
          });
        },
      });
    }

    return config;
  },
};
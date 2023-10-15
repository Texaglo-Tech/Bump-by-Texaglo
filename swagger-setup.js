/**
 * Swagger config
 */
const swaggerDefinition = {
  info: {
    title: "API Texaglo Service",
    description: "Texaglo",
  },
  servers: ["http://localhost:7000"],
  tags: [
    {
      name: 'User',
      description: 'User API',
    },
    {
      name: 'Product',
      description: 'Product API',
    },
    {
      name: 'Payment',
      description: 'Payment API',
    },
  ],
  schemes: ['http', 'https'],
}

var options = {
  customCss: '.topbar-wrapper img { content: url(http://127.0.0.1:7000/1696471224420-profile-head.png;}'
};

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./routes/*.js"]
};

/**
 * @param {express} app  express
 */
const setup = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions, options)));
}

module.exports = setup;
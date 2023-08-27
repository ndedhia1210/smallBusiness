const { generateApiPathList } = require("./swaggerPathBuilder");

module.exports = {
  apiDocumentation : {
    openapi: '3.0.1',
    info: {
      version: '1.3.0',
      title: 'SMALL BUSINESS API - Documentation',
      description: 'Description of my API here',
      termsOfService: 'https://mysite.com/terms',
      contact: {
        name: 'TBD',
        email: 'ndedhia1210@gmail.com',
        url: 'https://ourwebsite.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    tags: [
      { name: 'Auth' },
      { name: 'User' }
    ],
    paths: generateApiPathList()
  }
}

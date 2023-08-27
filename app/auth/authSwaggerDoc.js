module.exports = {
  authApis: {
      '/v1/auth': {
          method: 'post',
          name: 'User authentication',
          description: 'This service is used for login!',
          tags: ['Auth'],
          header: {
              deviceId: {
                  type: 'string',
                  description: 'This is device id!'
              }
          },
          request: {
              username: {
                  type: 'string', 
                  example: 'niraj4590', 
                  description: 'User username',
                  required: true
              },
              password: {
                  type: 'string', 
                  example: 'abcd234', 
                  description: 'Unencrypted user\'s password',
                  required: true
              }
          },
          response: {
              '200': {
                  code: {
                      type: 'number', 
                      example: '200'
                  },
                  accessToken: {
                      type: 'string', 
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRiNmRlMzZiMjBmNzcxNDQ0Mjc2MmUwIiwiaWF0IjoxNjkxMzYyOTg1fQ.9eUpAXKCxoS9RqGJ-VAA-cOcD8but1Rv_f_kHz06CZ8'
                  }
              },
              '500': {
                  code: {
                      type: 'number', 
                      example: '500'
                  },
                  errorMessage: {
                      type: 'string', 
                      example: 'Server side error'
                  }
              },
          }
      }
  }
}
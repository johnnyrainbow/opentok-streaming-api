const { body } = require('express-validator')

export default (method) => {
  switch (method) {
    case 'create':
      return [
        body('bio').exists()
      ]
  }
}
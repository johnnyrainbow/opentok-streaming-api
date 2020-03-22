const { body } = require('express-validator')

export default (method) => {
  switch (method) {
    case 'create':
      return [
        body('maxOccupancy').isNumeric(),
        body('cost').isNumeric(),
        body('title').isLength({ min: 5, max: 500 }),
        body('estDuration').isNumeric(),
      ]
  }
}
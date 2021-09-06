var jwt = require('jsonwebtoken')
var message = require('../constants/message')
var code = require('../constants/code')
var key = require('../config/key-config')

function checkToken(req, res, next) {
  let token = req.headers['authorization']

  if (token !== undefined) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length)
    }

    jwt.verify(token, key.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          code: code.UNAUTHORIZED,
          message: message.INVALID_AUTH_TOKEN,
          data: {}
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.json({
      code: code.UNAUTHORIZED,
      message: message.INVALID_AUTH_TOKEN,
      data: {}
    })
  }
}


module.exports = {
  checkToken: checkToken
}

const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]

  if (token) {
    jwt.verify(token, "name", function (err, decoded) {
      if (err) {
        res.status(401).send({ message: "Login First" })
      } else {
        req.body.userId = decoded.userId
        next()
      }
    })
  } else {
    res.status(401).send({ message: "Login First" })
  }
}

module.exports = { auth }

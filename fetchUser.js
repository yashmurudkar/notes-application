var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Secret!@#$%^&*()Key'

const fetchUser = (req, res, next) => {

    const token = req.header('auth-token')

    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        //next is function which next to middleware function i.e. fetchUser where ever applied
        next()
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchUser
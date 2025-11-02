
const jwt = require('jsonwebtoken')
const tokenJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer '))
        return res.status(401).json({ message: 'Unauthorized' })
    const token = authHeader.split(' ')[1]
    console.log("SECRET LOADED:", process.env.ACCESS_TOKEN_SECRET);
console.log("TOKEN RECEIVED:", token);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.user = decoded
            console.log("DECODED USER:", decoded);
            next()
        }
    )
}
module.exports = tokenJWT
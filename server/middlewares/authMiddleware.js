const jwt = require('jsonwebtoken')
const requireAuth = async (req, res, next) => {
    token = req.headers.token
    // console.log(token);
    if (token) {
        jwt.verify(token, process.env.TOKENSECRETKEY, (err, decoded) => {
            if (err) {
                res.status(400).json({message: "Forbidden"})
            }
            else{
                req.user = decoded
                next()
            }
        })
    }
    else{
        res.status(200).json({error: "no token"})
    }
}

module.exports = requireAuth
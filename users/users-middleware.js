const jwt = require("jsonwebtoken")

const roles = ["basic", "admin"]

function restrict() {
	return async (req, res, next) => {
		try {
			// get the token value from a cookie, which is automatically sent from the client
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json({
					message: "You shall not pass!",
				})
			}

			// make sure the signature on the token is valid and still matches the payload
			// (we need to use the same secret string that was used to sign the token)
			jwt.verify(token, process.env.SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json({
						message: "You shall not pass!",
					})
				}

			

				// make the token's decoded payload available to other middleware
				// functions or route handlers, in case we want to use it for something
				req.token = decoded

				// at this point, we know the token is valid and the user is authorized
				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
}
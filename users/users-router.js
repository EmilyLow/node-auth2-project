const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const { restrict } = require("./users-middleware")

const router = express.Router()

router.get("/users", restrict(), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.post("/register", async (req, res, next) => {
	try {
		const { username, password, department } = req.body
		const user = await Users.findByUsername(username)

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.add({
			username,
			// hash the password with a time complexity of "14"
			password: await bcrypt.hash(password, 14),
			department
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		console.log("password in login", password);
        const user = await Users.findByUsername(username)
        console.log("user in login", user);
		
		if (!user) {
			return res.status(401).json({
				message: "You shall not pass!",
			})
		}

		// hash the password again and see if it matches what we have in the database
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "You shall not pass!",
			})
		}

		// generate and sign a new JSON web token with some user details
		const token = jwt.sign({
			userID: user.id,
		}, process.env.SECRET)

		// tell the client to save this token in its cookie jar
		res.cookie("token", token)

		res.json({
			message: `Welcome ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})



module.exports = router
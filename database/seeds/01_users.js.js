//!! Figure this out again
// pre-hashed password for "abc12345"
const hashedPassword = "$2a$14$qHqCbXUImiBOgXlFNX47wuA7uFWNGNAZutYLvOeye9eotewGlfYV6"

exports.seed = async function(knex) {
	await knex("users").insert([
		{ id: 1, username: "eharris", password: hashedPassword, department: "Math"},
		{ id: 2, username: "lmarian", password: hashedPassword, department: "History"},
	])
}

// exports.seed =  function(knex, Promise) {
// 	return knex("users").insert([
// 		{ id: 1, username: "eharris", password: hashedPassword, department: "Math"},
// 		{ id: 2, username: "lmarian", password: hashedPassword, department: "History"},
// 	])
// }
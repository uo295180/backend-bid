let express = require("express")
let routerUsers = express.Router()
let users = require("../data/users")
let jwt = require("jsonwebtoken")

routerUsers.post("/login", (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if(email==undefined){
        return res.status(400).json({error: "not email"})
    }
    if(password==undefined){
        return res.status(400).json({error: "not password provided"})
    }
    let user = users.find(u => u.email == email && u.password==password)
    if(user==undefined){
        return res.status(401).json({error: "not valid user or password"})
    }
    let apiKey = jwt.sign({
        email: user.email,
        id: user.id
    }, "secret")
    res.json({apiKey: apiKey})
})

module.exports = routerUsers
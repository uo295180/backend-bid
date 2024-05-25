let express = require("express")
let app = express()
let port = 8081
let jwt = require("jsonwebtoken")

app.use(express.json())

app.use(["/items", "/bids"], (req, res, next) => {
    console.log("middleware")
    let apiKey = req.query.apiKey
    if(apiKey == undefined){
        return res.status(401).json({error: "not apiKey"})
    }
    let infoApiKey = undefined
    try{
        infoApiKey = jwt.verify(apiKey, "secret")
    } catch (error){
        return res.status(401).json({error: "Invalid apiKey"})
    }
    if(infoApiKey == undefined){
        return res.status(401).json({error: "Invalid apiKey"})
    }
    req.infoApiKey = infoApiKey
    next()
})

let routerItems = require("./routers/routerItems")
let routerBids = require("./routers/routerBids")
let routerUsers = require("./routers/routerUsers")
app.use("/items", routerItems)
app.use("/bids", routerBids)
app.use("/users", routerUsers)

app.listen(port, () => {
    console.log("Servidor activo en "+port)
})

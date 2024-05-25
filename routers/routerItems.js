let express = require("express")
let routerItems = express.Router()

let items = require("../data/items")

routerItems.post("/", (req, res) => {
    let description = req.body.description
    if( description == undefined){
        return res.status(400).json({error: "no description in body"})
    }
    let infoApiKey = req.infoApiKey
    let lastId = items[items.length-1].id
    items.push({
        id: lastId+1,
        userId: infoApiKey.id,
        description: description
    })
    res.json({added: lastId+1})
})

routerItems.get("/", (req, res) => {
    res.json(items)
})

routerItems.get("/:id", (req, res) => {
    let currentItem = items.find( i => i.id == req.params.id)
    if(currentItem == undefined){
        return res.status(400).json({error: "Item does not exist"})
    }
    res.json(currentItem)
})

module.exports = routerItems
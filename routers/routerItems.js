let express = require("express")
let routerItems = express.Router()

let items = require("../data/items")

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
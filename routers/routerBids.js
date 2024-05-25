let express = require("express")
let routerBids = express.Router()
let bids = require("../data/bids")
let items = require("../data/items")

routerBids.post("/", (req, res) => {
    let amount = req.body.amount
    let itemId = req.body.itemId
    if( amount == undefined || isNaN(amount)){
        return res.status(400).json({error: "Invalid amount"})
    } 
    if( itemId == undefined){
        return res.status(400).json({error: "No item"})
    }
    let item = items.find(i => i.id == itemId)
    if(item == undefined){
        return res.status(400).json({error: "This item does not exist"})
    }
    let lastId = bids[bids.length-1].id
    bids.push({
        id: lastId+1,
        userId: req.infoApiKey.id,
        itemId: itemId,
        amount: parseFloat(amount)
    })
    res.json({added: lastId+1})
})

routerBids.get("/", (req, res) => {
    res.json(bids)
})

routerBids.get("/:id", (req, res) => {
    let currentBid = bids.find( b => b.id == req.params.id)
    if(currentBid == undefined){
        return res.status(400).json({error: "No bid with that id"})
    }
    res.json(currentBid)
})

module.exports = routerBids
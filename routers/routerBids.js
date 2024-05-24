let express = require("express")
let routerBids = express.Router()
let bids = require("../data/bids")

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
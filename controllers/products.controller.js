const express = require("express")
const router =  express.Router()

const service = require("../services/products.service")

router.get("/", async (req,res) => {
    const products = await service.getAllProducts()
    res.send(products)
   
})

router.get("/:id", async (req,res) => {
    const product = await service.getProductById(req.params.id)
    if(product.length == 0)
        res.status(404).json("no record with given id : " + req.params.id)
    else
    res.send(product)
   
})


module.exports = router;
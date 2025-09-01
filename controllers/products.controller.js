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
    res.send(product[0])
   
})

router.delete("/:id", async (req,res) => {
    const affectedRows = await service.deleteProduct(req.params.id)
    if(affectedRows == 0)
        res.status(404).json("no record with given id : " + req.params.id)
    else
    res.send("Deleted successfully.")
   
})

router.post("/", async (req,res) => {
    const affectedRows = await service.addOrEditProduct(req.body)
    res.status(201).send("created successfully")
})

router.put("/:id", async (req,res) => {
    const affectedRows = await service.addOrEditProduct(req.body, req.params.id)
    if(affectedRows == 0)
        res.status(404).json("no record with given id : " + req.params.id)
    else
    res.send("Updated successfully.")
})

module.exports = router;
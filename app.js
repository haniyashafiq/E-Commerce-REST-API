const express = require("express")
const app = express()

const db = require("./db")
const productRoutes = require("./controllers/products.controller")


//middleware
app.use("/api/products", productRoutes)

app.use((err,req,res,next) => {
    console.log(err)
    res.status(err.status || 500).send("something went wrong.")
})


db.query("SELECT 1")
.then(data => {console.log("db connection succeeded.")
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

})
.catch(err => console.log("db connection failed. \n" + err))



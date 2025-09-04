const express = require("express")
const app = express()
const bodyparser = require("body-parser")

const db = require("./db")
const productRoutes = require("./controllers/products.controller")
const userRoutes = require("./controllers/users.controller");
const orderRoutes = require("./controllers/orders.controller");

//middleware
app.use(bodyparser.json())
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

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



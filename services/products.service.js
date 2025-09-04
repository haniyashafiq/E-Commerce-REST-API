const db = require("../db")

module.exports.getAllProducts = async () => {
    const [records] = await db.query ("SELECT * FROM products")
    return records;
}

module.exports.getProductById = async (id) => {
    const [record] = await db.query("SELECT * FROM products WHERE id = ?", [id])
    return record;
}

module.exports.deleteProduct = async (id) => {
    const [{affectedRows}] = await db.query("DELETE FROM products WHERE id = ?", [id])
    return affectedRows;
}

module.exports.addOrEditProduct = async (obj,id=0) => {
    const [[[{affectedRows}]]] = await db.query("CALL usp_product_add_or_edit(?,?,?,?,?)", [id , obj.name, obj.price, obj.category, obj.stock])
    return affectedRows;
    
}
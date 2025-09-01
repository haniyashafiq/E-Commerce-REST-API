const db = require("../db")

module.exports.getAllProducts = async () => {
    const [records] = await db.query ("SELECT * FROM products")
    return records;
}

module.exports.getProductById = async (id) => {
    const [record] = await db.query("SELECT * FROM products WHERE id = ?", [id])
    return record;
}


const db = require("../db");

module.exports.placeOrder = async (userId, items) => {
    const conn = await db.getConnection();
    await conn.beginTransaction();

    try {
        let total = 0;

        // Calculate total and reduce stock
        for (const item of items) {
            const [[product]] = await conn.query("SELECT * FROM products WHERE id=?", [item.product_id]);
            if (!product) throw new Error("Product not found");
            if (product.stock < item.quantity) throw new Error(`Not enough stock for ${product.name}`);

            total += product.price * item.quantity;
            await conn.query("UPDATE products SET stock=stock-? WHERE id=?", [item.quantity, item.product_id]);

        }

        const [orderResult] = await conn.query("INSERT INTO orders(user_id, total_amount) VALUES(?,?)", [userId, total]);
        const orderId = orderResult.insertId;

        for (const item of items) {
            await conn.query("INSERT INTO order_items(order_id, product_id, quantity) VALUES(?,?,?)", [orderId, item.product_id, item.quantity]);
        }

        await conn.commit();
        conn.release();
        return orderId;

    } catch (err) {
        await conn.rollback();
        conn.release();
        throw err;
    }
}

module.exports.getOrdersByUser = async (userId) => {
    const [orders] = await db.query("SELECT * FROM orders WHERE user_id=?", [userId]);
    for (const order of orders) {
        const [items] = await db.query("SELECT p.id, p.name, p.price, oi.quantity FROM order_items oi JOIN products p ON oi.product_id=p.id WHERE oi.order_id=?", [order.id]);
        order.items = items;
    }
    return orders;
}

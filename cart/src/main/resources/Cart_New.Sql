
CREATE TABLE cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

# To caluclate total cost of items in the cart

SELECT SUM(product.price * cart.quantity) AS total_cost
FROM cart
JOIN product ON cart.product_id = product.id
WHERE cart.user_id = ?
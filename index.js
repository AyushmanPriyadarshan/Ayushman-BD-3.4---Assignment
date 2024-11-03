const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

/** Endpoint: 1 */
function addNewItemToCart(productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let result = addNewItemToCart(productId, name, price, quantity);
  res.json({ cartItems: result });
});

/** Endpoint: 2 */
function updateQuantity(productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  let result = updateQuantity(productId, quantity);
  res.json({ cartItems: result });
});

/** Endpoint: 3 */
function deleteItem(cart, productId) {
  return (cart = cart.filter((item) => item.productId !== productId));
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);

  let result = deleteItem(cart, productId);
  res.json({ cartItems: result });
});

/** Endpoint: 4 */
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

/** Endpoint: 5 */
function checkItemQuantity(cart) {
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count = count + cart[i].quantity;
  }
  return count;
}
app.get('/cart/total-quantity', (req, res) => {
  let ItemQuantity = checkItemQuantity(cart);
  res.json({ totalQuantity: ItemQuantity });
});

/** Endpoint: 6 */
function checkTotalPrice(cart) {
  let price = 0;
  for (let i = 0; i < cart.length; i++) {
    price = price + cart[i].quantity * cart[i].price;
  }
  return price;
}
app.get('/cart/total-price', (req, res) => {
  let totalPrice = checkTotalPrice(cart);
  res.json({ totalPrice: totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

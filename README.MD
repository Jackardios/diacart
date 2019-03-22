Diacart
-
[![npm version](https://badge.fury.io/js/diacart.svg)](https://badge.fury.io/js/diacart)
Diacart is a shopping cart based on localStorage. It provides a declarative interface that allows you to fully customize the cart.

## Features
- Easy and fast integration into your frontend
- Simple customization of templates (based on lit-html)
- lit-html provides quick template redrawing (lit-html only ever updates the parts of templates that actually change - it doesn’t re-render the entire view.)
- Multi-tab sync
- Compatible with all major browsers

## Installation
```bash
npm install diacart -S
````

## Usage
### Insert the container diacart html-code on the cart page:
```html
<div data-diacart-container></div>
```

### Insert add to cart button to your products catalog:
Add two attributes to the button:
**data-diacart-add-to-cart** - Defines the function of the button.
**data-diacart-item-json** - Defines JSON with the following product properties:
- id - product ID
- name - product name
- price - product price as number
- image - product thumb as image link
- quantity (default: 1) - selected quantity of product
> **Escape quotes in JSON before inserting it into the data-diacart-item-json attribute.**
```html
<button
  type="button"
  data-diacart-add-to-cart
  data-diacart-item-json='{"id": 46, "name": "Aliquam vehicula dui purus (id46)", "price": 1300, "image": "https://picsum.photos/300/200?image=513"}'
>Add to cart</button>
```

### Insert JS
```js
import Diacart from "diacart";
import { html } from "lit-html"; // in case you want to change the standard templates

// All parameters are optional. You can omit the option parameter in Diacart, then the default options will be used.
const diacart = new Diacart({
  name: "diacart",
  title: "Shopping cart",
  totalPriceText: "Total amount",
  totalQuantityText: "Total quantity",
  removeFromCartBtnText: "",
  emptyCartText: "Your shopping cart is empty",
  orderBtnText: "Checkout",
  clearBtnText: "Clear cart",

  currency: "$",
  groupBy: "id", // 'null', 'undefined' or false to not group

  itemHasQuantity: true, // 'true' or 'false'
  itemHasPrice: true, // 'true' or 'false'

  // selectors
  containerSelector: "[data-diacart-container]",
  miniContainerSelector: "[data-diacart-mini-container]",
  totalPriceContainerSelector: "[data-diacart-total-price-container]",
  totalQuantityContainerSelector: "[data-diacart-total-quantity-container]",

  addToCartBtnSelector: "[data-diacart-add-to-cart]",
  removeFromCartBtnSelector: "[data-diacart-remove-from-cart]",
  quantityInputSelector: "[data-diacart-quantity-input]",
  orderBtnSelector: "[data-diacart-order]",
  clearBtnSelector: "[data-diacart-clear]",

  // templates
  template: ({ options, storage, totalPrice }) => html``, // cart template
  miniTemplate: ({ options, storage, totalPrice }) => html``, // mini cart template as a function
  itemTemplate: ({ id, item, options }) => html``, // cart item template as a function
  totalPriceTemplate: ({ options, totalPrice }) =>
    parseFloat(totalPrice).toFixed(2) + (options.currency || ""),
  totalQuantityTemplate: ({ totalQuantity }) => parseInt(totalQuantity)
});

// then you can use the imperative style to add, update, remove, order products.
// example:
diacart.add({"id": 46, "name": "Aliquam vehicula dui purus (id46)", "price": 1300, "image": "https://picsum.photos/300/200?image=513"}); // add product
diacart.update(46, {"name": "New name"}); // update product by id
diacart.hasItem({"name": "New name"}); // check on whether a product exists on a specific query 
diacart.remove(46); // remove product by id

function onOrder(data) {}
function onClear() {}

// events
diacart.on('order', onOrder);
diacart.removeListener('order', onOrder);
diacart.once('clear', onClear);

diacart.order(); // order cart, trigger event of ordering goods
diacart.clear(); // clear cart
```
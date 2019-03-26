import "./common.scss";
import { html, render } from "lit-html";

import template from "./templates/diacart";
import itemTemplate from "./templates/diacart-item";
import miniTemplate from "./templates/diacart-mini";

import Diacart from "../lib/diacart";
window.diacart = new Diacart({
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

  // template render function
  render: render,

  // templates
  template: ({ options, storage, totalPrice }) => html`
    <div class="test">ok</div>
  `, // cart template
  miniTemplate: ({ options, storage, totalPrice }) => html``,
  itemTemplate: ({ id, item, options }) => html``,
  totalPriceTemplate: ({ options, totalPrice }) =>
    (options.currency + " " || "") + parseFloat(totalPrice).toFixed(2),
  totalQuantityTemplate: ({ totalQuantity }) => parseInt(totalQuantity)
});

import "./common.scss";
import { html, render } from "lit-html";

import Diacart from "../lib/diacart";
const diacart = (window.diacart = new Diacart({
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
  containerSelector: "[data-diacart-container]", // here will be rendered template
  miniContainerSelector: "[data-diacart-mini-container]", // here will be rendered miniTemplate
  totalPriceContainerSelector: "[data-diacart-total-price-container]", // here will be rendered totalPriceTemplate
  totalQuantityContainerSelector: "[data-diacart-total-quantity-container]", // here will be rendered totalQuantityTemplate

  addToCartBtnSelector: "[data-diacart-add-to-cart]", // the 'add' function will be attached to them
  removeFromCartBtnSelector: "[data-diacart-remove-from-cart]", // the 'remove' function will be attached to them
  quantityInputSelector: "[data-diacart-quantity-input]",
  orderBtnSelector: "[data-diacart-order]", // the 'order' function will be attached to them
  clearBtnSelector: "[data-diacart-clear]", // the 'clear' function will be attached to them

  // template rendering functions
  templateTagFunction: html, // MUST specify these parameters if you want to override templates!
  templateRenderFunction: render, // MUST specify these parameters if you want to override templates!

  // template functions
  template: diacartObject => {
    const { options, storage, totalPrice } = diacartObject;
    return html`
      <div class="diacart-wrapper">
        <section class="diacart">
          <div class="diacart__header">
            <div class="diacart-grid">
              <div
                class="diacart-grid-col diacart-grid-col--flex diacart__header-col"
              >
                <div class="diacart__title">${options.title || ""}</div>
              </div>
              <div
                class="diacart-grid-col diacart-grid-col--auto diacart__header-col${!storage.length
                  ? " diacart-hidden"
                  : ""}"
              >
                <button
                  class="diacart__clear-btn diacart-btn diacart-btn--default diacart-btn--medium"
                  data-diacart-clear
                >
                  ${options.clearBtnText || ""}
                </button>
              </div>
            </div>
          </div>
          <div class="diacart__items">
            ${!storage.length
              ? html`
                  <div class="diacart-empty">
                    <h2 class="diacart-empty__title">
                      ${options.emptyCartText}
                    </h2>
                  </div>
                `
              : storage.map((item, id) =>
                  options.itemTemplate({ id, item, options })
                )}

            <div
              class="diacart__footer${!storage.length ? " diacart-hidden" : ""}"
            >
              <div class="diacart__footer-container">
                <div class="diacart__total-price">
                  ${options.totalPriceText
                    ? options.totalPriceText + ": "
                    : ""}<span class="diacart__total-price-accent"
                    >${options.totalPriceTemplate({
                      options,
                      totalPrice
                    })}</span
                  >
                </div>
                <button
                  class="diacart__order-btn diacart-btn diacart-btn--primary diacart-btn--medium"
                  data-diacart-order
                >
                  ${options.orderBtnText || ""}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }, // cart template as a function
  itemTemplate: ({ id, item, options }) => {
    return html`
      <div
        class="diacart-item"
        data-diamodal-item
        data-diacart-item-id="${id || ""}"
      >
        <div class="diacart-grid">
          ${!item.image
            ? ""
            : html`
                <div
                  class="diacart-grid-col diacart-grid-col--v-gutter diacart-grid-col--auto diacart-item__image-col"
                >
                  <a
                    href="${item.link || ""}"
                    title="${item.name || ""}"
                    class="diacart-item__image"
                    style="background-image: url('${item.image || ""}');"
                  ></a>
                </div>
              `}
          <div
            class="diacart-grid-col diacart-grid-col--v-gutter diacart-grid-col--flex diacart-item__text-col"
          >
            <div class="diacart-grid">
              <div class="diacart-grid-col diacart-grid-col--flex">
                <a href="${item.link || ""}" class="diacart-item__title"
                  >${item.name || ""}</a
                >
              </div>

              <div class="diacart-grid-col diacart-grid-col--auto">
                <button
                  class="diacart-item__remove-btn"
                  data-diacart-remove-from-cart
                  data-diacart-item-id="${id || ""}"
                >
                  ${options.removeFromCartBtnText || ""}
                </button>
              </div>
            </div>
            <div class="diacart-item__options diacart-grid diacart-grid--v-end">
              ${options.itemHasQuantity && item.quantity
                ? html`
                    <div
                      class="diacart-grid-col diacart-grid-col--auto diacart-item-option"
                    >
                      <div class="diacart-item__quantity diacart-counter">
                        <div class="diacart-item-option__title">
                          ${options.totalQuantityText}:
                        </div>
                        <div
                          class="diacart-item-option__value diacart-counter__container diacart-grid diacart-grid--no-gutter"
                        >
                          <button
                            class="diacart-grid__col diacart-grid__col--auto diacart-counter__btn diacart-counter__plus-btn"
                          >
                            +
                          </button>
                          <input
                            class="diacart-grid__col diacart-grid__col--flex diacart-counter__input"
                            type="number"
                            name="quantity"
                            data-diacart-quantity-input
                            data-diacart-item-id="${id || ""}"
                            .value="${item.quantity || 1}"
                          />
                          <button
                            class="diacart-grid__col diacart-grid__col--auto diacart-counter__btn diacart-counter__minus-btn"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  `
                : ""}
              <div class="diacart-grid-col diacart-grid-col--flex">
                ${options.itemHasPrice && item.price
                  ? html`
                      <div class="diacart-item__price">
                        ${options.currency || ""} ${item.price || ""}
                      </div>
                    `
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }, // cart item template as a function, used in 'template' function
  miniTemplate: diacartObject => html``, // mini cart template as a function
  totalPriceTemplate: diacartObject => {
    const { options, totalPrice } = diacartObject;
    return (options.currency + " " || "") + parseFloat(totalPrice).toFixed(2);
  }, // total price template as a function
  totalQuantityTemplate: diacartObject => {
    const { totalQuantity } = diacartObject;
    return parseInt(totalQuantity);
  } // total quantity template as a function
}));

function onAdd(addedItemId) {
  console.log("onAdd arguments: ", addedItemId);
}
function onUpdate(updatedItemId, updateObj) {
  console.log("onUpdate arguments: ", updatedItemId, updateObj);
}
function onStorageUpdate(newValue, prevValue) {
  console.log("onStorageUpdate arguments: ", newValue, prevValue);
}
function onRemove(removedItemObj) {
  console.log("onRemove arguments: ", removedItemObj);
}
function onOrder(items) {
  console.log("onOrder arguments:", items);
}
function onClear() {
  console.log("onClear has no arguments");
}
function onRender() {
  console.log("onRender has no arguments");
}

// events
diacart.on("add", onAdd); // will be called at every product adding
diacart.on("update", onUpdate); // will be called at every product updating
diacart.on("storageUpdate", onStorageUpdate); // will be called at every storage updating
diacart.on("remove", onRemove); // will be called at every removing product from cart
diacart.on("order", onOrder); // will be called at every ordering
diacart.once("clear", onClear); // will be called only once when clearing the cart
diacart.on("render", onRender); // will be called at every rerendering

const productData = {
  id: 46,
  name: "Aliquam vehicula dui purus (id46)",
  price: 1300,
  image: "https://picsum.photos/300/200?image=513"
};
const cartItemId = diacart.add(productData); // add product, triggers 'add' event
diacart.update(cartItemId, { name: "New name" }); // update product by id, triggers 'update' event
console.log(diacart.hasItem({ name: "New name" })); // check on whether a product exists on a specific query
diacart.remove(cartItemId); // remove product by id, triggers 'remove' event

console.log(diacart.hasItem({ name: "New name" }));
diacart.add(productData); // add product, triggers 'add' event

diacart.order(); // order cart, triggers 'order' event
diacart.clear(); // clear cart, triggers 'clear' event

diacart.removeListener("order", onOrder); // remove event listener

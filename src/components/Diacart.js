import { html, render } from "lit-html";
// import { render } from "lit-html/lib/lit-extended";
import EventEmitter from "eventemitter3";
import template from "../templates/diacart";
import itemTemplate from "../templates/diacart-item";
import miniTemplate from "../templates/diacart-mini";

import ObjectsStorage from "./ObjectsStorage";
import {
  addDelegatedEventListener
  // addClass,
  // removeClass
} from "../utils/helpers";
import diacartCounterInit from "../components/diacartCounterInit";

const defaultOptions = {
  name: "diacart",
  title: "Корзина покупок",
  totalPriceText: "Итоговая сумма",
  totalQuantityText: "Количество",
  removeFromCartBtnText: "",
  emptyCartText: "Ваша корзина пуста",
  orderBtnText: "Оформить заказ",
  clearBtnText: "Очистить корзину",

  currency: "р.",
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
  template: template,
  itemTemplate: itemTemplate,
  miniTemplate: miniTemplate,
  totalPriceTemplate: ({ options, totalPrice }) =>
    parseFloat(totalPrice).toFixed(2) + (options.currency || ""),
  totalQuantityTemplate: ({ totalQuantity }) => parseInt(totalQuantity)
};

export default class Diacart {
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    this.init();
  }

  init() {
    this.eventEmitter = new EventEmitter();
    this.storage = new ObjectsStorage(this.options.name);
    this.storage.eventEmitter.on("update", this.render);

    this._containers = document.querySelectorAll(
      this.options.containerSelector
    );

    this._miniContainers = document.querySelectorAll(
      this.options.miniContainerSelector
    );

    this._totalPriceContainers = document.querySelectorAll(
      this.options.totalPriceContainerSelector
    );

    this._totalQuantityContainers = document.querySelectorAll(
      this.options.totalQuantityContainerSelector
    );

    this.render();
    this._attachEventHandlers();

    if (this._containers.length) {
      for (let i = 0; i < this._containers.length; ++i) {
        diacartCounterInit(this._containers[i]);
      }
    }
  }

  on(eventName, emitted, context) {
    return this.eventEmitter.on(eventName, emitted, context);
  }

  once(eventName, emitted, context) {
    return this.eventEmitter.once(eventName, emitted, context);
  }

  removeListener(eventName, emitted, context) {
    return this.eventEmitter.removeListener(eventName, emitted, context);
  }

  get totalPrice() {
    return this._calculateTotalPrice();
  }

  get totalQuantity() {
    return this._calculateTotalQuantity();
  }

  add = (item = {}) => {
    if (!item && console && console.warn) {
      console.warn(`'item' argument is ${item}!`);
      return false;
    }
    let added = false;

    item.quantity =
      this.options.itemHasQuantity && item.quantity && item.quantity > 0
        ? item.quantity
        : 1;
    if (this.options.groupBy) {
      const query = {
        [this.options.groupBy]: item[this.options.groupBy]
      };
      const id = this._groupItemsByQuery(query);
      if (id) {
        const storageItem = this.storage.get(id);
        const updateObject = Object.assign({}, item, {
          quantity: storageItem.quantity + item.quantity
        });
        added = this.storage.update(id, updateObject);
      } else {
        added = this.storage.add(item);
      }
      this.eventEmitter.emit("add");
      return added;
    }
    added = this.storage.add(item);
    this.eventEmitter.emit("add", added);
    return added;
  };

  remove = id => {
    if (!id && console && console.warn) {
      console.warn(`'id' argument is required!`);
      return false;
    }
    let added = this.storage.remove(id);
    this.eventEmitter.emit("remove", id);

    return added;
  };

  update = (id, updateObj) => {
    let updated = this.storage.update(id, updateObj);
    this.eventEmitter.emit("update", id, updateObj);

    return updated;
  };

  clear = () => {
    this.storage.clear();
    this.eventEmitter.emit("clear");
  };

  order = () => {
    this.eventEmitter.emit("order", this.storage.values());
  };

  render = () => {
    if (this._containers.length) {
      const containerCompiled = this.options.template(this);
      for (let i = 0; i < this._containers.length; ++i) {
        this.options.render(containerCompiled, this._containers[i]);
      }
    }

    if (this._miniContainers.length) {
      const miniContainerCompiled = this.options.miniTemplate(this);
      for (let i = 0; i < this._miniContainers.length; ++i) {
        this.options.render(miniContainerCompiled, this._miniContainers[i]);
      }
    }

    if (this._totalPriceContainers.length) {
      const totalPriceCompiled = this.options.totalPriceTemplate(this);
      for (let i = 0; i < this._totalPriceContainers.length; ++i) {
        this.options.render(
          html`
            ${totalPriceCompiled}
          `,
          this._totalPriceContainers[i]
        );
      }
    }

    if (this._totalQuantityContainers.length) {
      const totalQuantityCompiled = this.options.totalQuantityTemplate(this);
      for (let i = 0; i < this._totalQuantityContainers.length; ++i) {
        this.options.render(
          html`
            ${totalQuantityCompiled}
          `,
          this._totalQuantityContainers[i]
        );
      }
    }
  };

  // helpers
  hasItem(query) {
    return !!this.storage.findByQuery(query);
  }

  // private
  _attachEventHandlers() {
    const self = this;
    addDelegatedEventListener(
      document,
      "click",
      this.options.orderBtnSelector,
      e => {
        e.preventDefault();
        this.order();
      },
      true
    );

    addDelegatedEventListener(
      document,
      "click",
      this.options.clearBtnSelector,
      e => {
        e.preventDefault();
        this.clear();
      },
      true
    );

    addDelegatedEventListener(
      document,
      "click",
      this.options.addToCartBtnSelector,
      function(e) {
        e.preventDefault();
        const json = this.getAttribute("data-diacart-item-json");
        const item = JSON.parse(json);
        self.add(item);
      },
      true
    );

    addDelegatedEventListener(
      document,
      "click",
      this.options.removeFromCartBtnSelector,
      function(e) {
        e.preventDefault();
        if (this) {
          const id = parseInt(this.getAttribute("data-diacart-item-id"));
          self.remove(id);
        }
      },
      true
    );

    if (this._containers[0]) {
      const quantityInputHandler = e => {
        if (e.target) {
          const id = parseInt(e.target.getAttribute("data-diacart-item-id"));
          if (e.target.value) {
            let intValue = parseInt(e.target.value);
            if (intValue < 1) {
              intValue = 1;
            }

            e.target.value = intValue;

            this.update(id, {
              quantity: intValue
            });
          }
        }
      };

      addDelegatedEventListener(
        this._containers[0],
        "change",
        this.options.quantityInputSelector,
        quantityInputHandler
      );

      let timeout;
      addDelegatedEventListener(
        this._containers[0],
        "keyup",
        this.options.quantityInputSelector,
        e => {
          clearTimeout(timeout);
          timeout = setTimeout(() => quantityInputHandler(e), 100);
        }
      );
    }
  }

  _calculateTotalPrice() {
    let totalPrice = 0;
    if (this.options.itemHasPrice) {
      this.storage.forEach(item => {
        const quantity =
          this.options.itemHasQuantity && item.quantity
            ? parseInt(item.quantity)
            : 1;
        totalPrice += (item.price ? parseFloat(item.price) : 0) * quantity;
      });
    }
    return totalPrice;
  }

  _calculateTotalQuantity() {
    let totalQuantity = 0;
    this.storage.forEach(item => {
      totalQuantity +=
        this.options.itemHasQuantity && item.quantity
          ? parseInt(item.quantity)
          : 1;
    });
    return totalQuantity;
  }

  _groupItemsByQuery(query = {}) {
    if (query) {
      const groupItems = this.storage.filter(query);
      const groupItemsKeys = Object.keys(groupItems);

      if (groupItemsKeys.length) {
        const mainItem = groupItems[groupItemsKeys[0]];

        if (groupItemsKeys.length > 1) {
          let quantity = 0;
          groupItemsKeys.forEach(key => {
            quantity += groupItems[key].quantity
              ? parseInt(groupItems[key].quantity)
              : 1;
          });
          mainItem.quantity = quantity;
          this.storage.removeByQuery(query);
          this.storage.add(mainItem);
        }
        return groupItemsKeys[0];
      }
    }
    return null;
  }
}

import ObjectsLocalStorage from "./ObjectsLocalStorage";
import { addDelegatedEventListener } from "../utils/helpers";
import diacartCounterInit from "../components/diacartCounterInit";

const defaultItem = {
  id: null,
  link: null,
  name: "",
  image: null,
  quantity: 1,
  price: 0
};

const defaultOptions = {
  // common
  name: "diacart",
  title: "Корзина покупок",
  totalPriceText: "Итоговая сумма",
  totalQuantityText: "Количество",
  removeFromCartBtnText: "",
  emptyCartText:
    '<div class="diacart-empty"><h2 class="diacart-empty__title">Ваша корзина пуста</h2></div>',
  orderBtnText: "Оформить заказ",

  currency: "р.",
  groupBy: "id", // 'null', 'undefined' or false to not group
  itemHasQuantity: true, // 'true' or 'false'
  itemHasPrice: true, // 'true' or 'false'
  itemCustomFields: [
    // example:
    // {
    //   type: 'text',
    //   key: 'size',
    //   label: 'Размер', // by default label === key
    // }
  ],

  // templates
  wrapperTemplate: require("../templates/diacart-wrapper.art"), // template function
  itemTemplate: require("../templates/diacart-item.art"), // template function
  totalPriceTemplate: $data =>
    parseFloat($data.totalPrice).toFixed(2) + ($data.currency || ""), // template function
  totalQuantityTemplate: $data => parseInt($data.totalQuantity), // template function

  // selectors
  containerSelector: "[data-diacart-container]",
  totalPriceContainerSelector: "[data-diacart-total-price-container]",
  totalQuantityContainerSelector: "[data-diacart-total-quantity-container]",

  itemsContainerSelector: "[data-diacart-items-container]",
  itemSelector: "[data-diacart-item]",

  addToCartBtnSelector: "[data-diacart-add-to-cart]",
  removeFromCartBtnSelector: "[data-diacart-remove-from-cart]",
  quantityInputSelector: "[data-diacart-quantity-input]",
  orderBtnSelector: "[data-diacart-order]",

  // events
  onInit: f => f,
  onAdd: f => f,
  onUpdate: f => f,
  onRemove: f => f,
  onClear: f => f,
  onOrder: f => f
};

class Diacart {
  constructor(options) {
    this._options = Object.assign({}, defaultOptions, options);
    this.init();
  }

  init() {
    this._storage = new ObjectsLocalStorage(this._options.name, this.refresh);

    this._containers = document.querySelectorAll(
      this._options.containerSelector
    );
    this.renderCart();

    this._itemsContainer = document.querySelector(
      this._options.itemsContainerSelector
    );
    this._totalPriceContainers = document.querySelectorAll(
      this._options.totalPriceContainerSelector
    );
    this._totalQuantityContainers = document.querySelectorAll(
      this._options.totalQuantityContainerSelector
    );
    this.renderCartItems();
    this.refreshTotalQuantity();
    this.refreshTotalPrice();
    this._attachEventHandlers();
    this._options.onInit(this);
    diacartCounterInit(this._itemsContainer);
  }

  _attachEventHandlers() {
    const self = this;
    addDelegatedEventListener(
      document,
      "click",
      this._options.orderBtnSelector,
      e => {
        e.preventDefault();
        this.order();
      },
      true
    );
    addDelegatedEventListener(
      document,
      "click",
      this._options.addToCartBtnSelector,
      function(e) {
        e.preventDefault();
        const json = this.getAttribute("data-diacart-item-json");
        const item = JSON.parse(json);
        self.add(item);
      },
      true
    );
    if (this._itemsContainer) {
      addDelegatedEventListener(
        this._itemsContainer,
        "click",
        this._options.removeFromCartBtnSelector,
        function(e) {
          e.preventDefault();
          if (this) {
            const id = parseInt(this.getAttribute("data-diacart-item-id"));
            self.remove(id);
          }
        },
        true
      );

      const quantityInputHandler = e => {
        if (e.target) {
          const id = parseInt(e.target.getAttribute("data-diacart-item-id"));
          if (e.target.value) {
            const intValue = parseInt(e.target.value);
            if (intValue > 0) {
              e.target.blur();
              this.update(id, { quantity: intValue });
            }
          }
        }
      };
      addDelegatedEventListener(
        this._itemsContainer,
        "change",
        this._options.quantityInputSelector,
        quantityInputHandler
      );

      let timeout;
      addDelegatedEventListener(
        this._itemsContainer,
        "keyup",
        this._options.quantityInputSelector,
        e => {
          clearTimeout(timeout);
          timeout = setTimeout(() => quantityInputHandler(e), 300);
        }
      );
    }
  }

  _groupItemsByQuery(query = {}) {
    if (query) {
      const groupItems = this._storage.filterByQuery(query);
      if (groupItems.length) {
        const mainItem = groupItems[0];

        if (groupItems.length > 1) {
          let quantity = 0;
          for (let i = 0; i < groupItems.length; i++) {
            if (groupItems[i].obj) {
              quantity += groupItems[i].obj.quantity
                ? parseInt(groupItems[i].obj.quantity)
                : 1;
            }
          }
          mainItem.obj.quantity = quantity;
          this._storage.removeByQuery(query);
          this._storage.add(mainItem.obj);
        }

        return mainItem;
      }
    }
    return null;
  }

  _calculateTotalQuantity() {
    let totalQuantity = 0;
    this._storage.storage.forEach(item => {
      totalQuantity +=
        this._options.itemHasQuantity && item.obj.quantity
          ? parseInt(item.obj.quantity)
          : 1;
    });
    return totalQuantity;
  }

  _calculateTotalPrice() {
    let totalPrice = 0;
    if (this._options.itemHasPrice) {
      this._storage.storage.forEach(item => {
        const quantity =
          this._options.itemHasQuantity && item.obj.quantity
            ? parseInt(item.obj.quantity)
            : 1;
        totalPrice +=
          (item.obj.price ? parseFloat(item.obj.price) : 0) * quantity;
      });
    }
    return totalPrice;
  }

  hasItem(query) {
    return !!this._storage.findByQuery(query);
  }

  add = (item = {}) => {
    if (!item && console && console.log) {
      console.log("'item' argument is undefined!");
    } else {
      item.quantity =
        this._options.itemHasQuantity && item.quantity && item.quantity > 0
          ? item.quantity
          : 1;
      if (this._options.groupBy) {
        const query = {
          [this._options.groupBy]: item[this._options.groupBy]
        };

        const storageItem = this._groupItemsByQuery(query);
        if (storageItem) {
          this._storage.update(storageItem.id, {
            quantity: storageItem.obj.quantity + item.quantity
          });
        } else {
          this._storage.add(item);
        }
        this._options.onAdd(item);
        return;
      }
      this._storage.add(item);
      this._options.onAdd(item);
    }
  };

  update = (id, updateObj) => {
    this._storage.update(id, updateObj);
    this._options.onUpdate();
  };

  remove = storageItemId => {
    if (!storageItemId) {
      new Error("'id' argument is required");
    }
    this._storage.removeById(storageItemId);
    this._options.onRemove(storageItemId);
  };

  clear = () => {
    this._storage.clear();
    this._options.onClear();
  };

  order = () => {
    this._options.onOrder();
  };

  refresh = (prevStorage, nextStorage) => {
    this.refreshTotalPrice();
    this.refreshTotalQuantity();
    this.renderCartItems();
    // TODO: optimized cart items rerendering
  };

  refreshTotalPrice = () => {
    this._totalPrice = this._calculateTotalPrice();
    this.renderTotalPrice();
  };

  refreshTotalQuantity = () => {
    this._totalQuantity = this._calculateTotalQuantity();
    this.renderTotalQuantity();
  };

  _itemsTemplate = data => {
    let compiledHTML = "";
    if (data.items && data.items.length) {
      data.items.forEach(item => {
        data.item = item;
        compiledHTML += data.itemTemplate(data);
      });
    } else {
      compiledHTML += data.emptyCartText;
    }
    return compiledHTML;
  };

  _renderTemplateToContainers(containers, template, data) {
    if (containers && containers.length) {
      const compiledHTML = template(data);
      for (let i = 0; i < containers.length; ++i) {
        if (containers[i]) {
          containers[i].innerHTML = compiledHTML;
        }
      }
    }
  }

  renderCart(
    containers = this._containers,
    template = this._options.wrapperTemplate
  ) {
    this._renderTemplateToContainers(containers, template, {
      title: this._options.title,
      totalPriceText: this._options.totalPriceText,
      totalQuantityText: this._options.totalQuantityText,
      totalPrice: this._totalPrice,
      totalQuantity: this._totalQuantity,
      itemHasPrice: this._options.itemHasPrice,
      itemHasQuantity: this._options.itemHasQuantity,
      orderBtnText: this._options.orderBtnText
    });
  }

  renderCartItems(
    container = this._itemsContainer,
    template = this._options.itemTemplate
  ) {
    this._renderTemplateToContainers([container], this._itemsTemplate, {
      itemTemplate: template,
      items: this._storage.storage,
      currency: this._options.currency,
      itemHasPrice: this._options.itemHasPrice,
      itemHasQuantity: this._options.itemHasQuantity,
      itemCustomFields: this._options.itemCustomFields,
      emptyCartText: this._options.emptyCartText,
      removeFromCartBtnText: this._options.removeFromCartBtnText
    });
  }

  renderTotalPrice(
    containers = this._totalPriceContainers,
    template = this._options.totalPriceTemplate
  ) {
    this._renderTemplateToContainers(containers, template, {
      totalPrice: this._totalPrice,
      currency: this._options.currency
    });
  }

  renderTotalQuantity(
    containers = this._totalQuantityContainers,
    template = this._options.totalQuantityTemplate
  ) {
    this._renderTemplateToContainers(containers, template, {
      totalQuantity: this._totalQuantity
    });
  }
}

export default Diacart;

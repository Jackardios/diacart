import { html } from "lit-html";

export default ({ id, item, options }) => html`
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
                    ${item.price || ""}${options.currency || ""}
                  </div>
                `
              : ""}
          </div>
        </div>
      </div>
    </div>
  </div>
`;

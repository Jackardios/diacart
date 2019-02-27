import { html } from "lit-html";

export default ({ options, storage, totalPrice }) => html`
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
                <h2 class="diacart-empty__title">${options.emptyCartText}</h2>
              </div>
            `
          : storage.map((item, id) =>
              options.itemTemplate({ id, item, options })
            )}

        <div class="diacart__footer${!storage.length ? " diacart-hidden" : ""}">
          <div class="diacart__footer-container">
            <div class="diacart__total-price">
              ${options.totalPriceText
                ? options.totalPriceText + ": "
                : ""}<span class="diacart__total-price-accent"
                >${options.totalPriceTemplate({ options, totalPrice })}</span
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

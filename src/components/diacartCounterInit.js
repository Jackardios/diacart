import { addDelegatedEventListener, triggerEvent } from "../utils/helpers";

const DEFAULT_SELECTORS = {
  wrapper: ".diacart-counter",
  buttonPlus: ".diacart-counter__plus-btn",
  buttonMinus: ".diacart-counter__minus-btn",
  input: ".diacart-counter__input"
};

export default (root = document, selectors = DEFAULT_SELECTORS) => {
  if (root) {
    addDelegatedEventListener(root, "click", selectors.buttonPlus, function() {
      const wrapper = this.closest(selectors.wrapper),
        input = wrapper.querySelector(selectors.input),
        inputValue = parseInt(input.value),
        newValue = inputValue > -1 ? inputValue + 1 : 1;

      input.value = newValue;

      triggerEvent(input, "change");
    });

    addDelegatedEventListener(root, "click", selectors.buttonMinus, function() {
      const wrapper = this.closest(selectors.wrapper),
        input = wrapper.querySelector(selectors.input),
        inputValue = parseInt(input.value),
        newValue = inputValue > 1 ? inputValue - 1 : inputValue;

      input.value = newValue;
      triggerEvent(input, "change");
    });
  }
};

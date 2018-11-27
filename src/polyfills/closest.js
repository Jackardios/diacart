(function() {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(selector) {
      if (!this) return null;
      if (this.matches(selector)) return this;
      if (!this.parentElement) {
        return null;
      } else return this.parentElement.closest(selector);
    };
  }
})();

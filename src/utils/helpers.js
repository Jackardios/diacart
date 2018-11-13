function generateUID() {
  return '_' + Math.random().toString(14).substr(2, 6);
}

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function addDelegatedEventListener(element, eventName, selector, handler, useCapture = false) {
  element.addEventListener(eventName, function (e) {
    for (var target = e.target; target && target != this; target = target.parentNode) {
      // loop parent nodes from the target to the delegation node
      if (target.matches(selector)) {
        handler.call(target, e);
        break;
      }
    }
  }, useCapture);
}


function triggerEvent(element, eventName) {
  var event;

  if (document.createEvent) {
    event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, true, true);
  } else {
    event = document.createEventObject();
    event.eventType = eventName;
  }

  event.eventName = eventName;

  if (document.createEvent) {
    element.dispatchEvent(event);
  } else {
    element.fireEvent("on" + event.eventType, event);
  }
}

export {
  generateUID,
  createElementFromHTML,
  addClass,
  removeClass,
  ready,
  addDelegatedEventListener,
  triggerEvent
};
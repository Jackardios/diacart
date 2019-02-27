import EventEmitter from "eventemitter3";

// store lib build
const storeEngine = require("store/src/store-engine");
const store = storeEngine.createStore(
  [
    require("store/storages/localStorage"),
    require("store/storages/sessionStorage"),
    require("store/storages/cookieStorage")
  ],
  [require("store/plugins/update"), require("store/plugins/events")]
);

export default class ObjectsStorage {
  constructor(name) {
    if (!name) {
      throw new Error('Missing required parameter "name"');
    }

    this.name = name;
    this.eventEmitter = new EventEmitter();
    this._store = store;
    // this._data = {};

    this._store.watch(name, (newValue, prevValue) => {
      this._data = newValue;
      this._onStorageUpdate(newValue, prevValue);
    });

    // Synchronization between multiple tabs
    window.addEventListener(
      "storage",
      event => {
        if (event.key === this.name) {
          const prevStorage = this._data;
          this._data = JSON.parse(event.newValue || "[]");
          this._onStorageUpdate(this._data, prevStorage);
        }
      },
      false
    );
  }

  _onStorageUpdate(newValue, prevValue) {
    this._keys = null;
    this.eventEmitter.emit("update", newValue, prevValue);
  }

  get keys() {
    if (!this._keys) {
      this._keys = Object.keys(this.data);
    }
    return this._keys;
  }

  get data() {
    if (!this._data) {
      const prevData = this._data;
      this._data = this._store.get(this.name);
      if (this._data !== Object(this._data)) {
        this._store.set(this.name, {});
      } else {
        this._onStorageUpdate(prevData, this._data);
      }
    }
    return this._data;
  }

  set data(newData) {
    this._store.set(this.name, newData);
  }

  get lastIndex() {
    if (!this._lastIndex) {
      let maxIndex = 0;
      this.keys.forEach(item => {
        let intValue = parseInt(item);
        if (intValue == item) {
          if (!maxIndex || intValue > maxIndex) {
            maxIndex = intValue;
          }
        }
      });

      this._lastIndex = maxIndex;
    }
    return this._lastIndex;
  }

  get newIndex() {
    let newIndex = this.lastIndex + 1;

    return (this._lastIndex = newIndex);
  }

  values() {
    return this.keys.map(id => {
      return this.data[id];
    });
  }

  forEach(callback) {
    return this.keys.forEach(key => {
      callback(this.data[key], key);
    });
  }

  map(callback) {
    return this.keys.map(key => {
      return callback(this.data[key], key);
    });
  }

  filter(query) {
    const result = {};
    this.forEach((item, key) => {
      for (let key in query) {
        if (query[key] !== item[key]) {
          return;
        }
      }
      result[key] = item;
    });

    return result;
  }

  get(id) {
    return this.data[id];
  }

  add(object) {
    if (!object) {
      return null;
    }

    this._store.update(this.name, data => {
      data[this.newIndex] = object;
    });

    return this.lastIndex;
  }

  update(id, updateObj) {
    if (!id || !updateObj) {
      return null;
    }

    this._store.update(this.name, data => {
      data[id] = Object.assign({}, data[id], updateObj);
      return data;
    });

    return id;
  }

  updateByQuery(query, updateObj) {
    if (!query || !updateObj) {
      return null;
    }

    const result = {};

    this._store.update(this.name, data => {
      return this.keys.forEach(id => {
        for (let key in query) {
          if (query[key] !== data[id][key]) {
            return;
          }
        }
        data[id] = Object.assign({}, data[id], updateObj);
        result[id] = data[id];
      });
    });

    return result;
  }

  remove(id) {
    if (!id) {
      return null;
    }

    let removed = false;
    this._store.update(this.name, data => {
      if (data[id]) {
        removed = data[id];
        delete data[id];
      }
    });
    return removed;
  }

  removeByQuery(query) {
    if (!query) {
      return {};
    }

    const removed = {};
    this.forEach((item, index) => {
      for (let key in query) {
        if (query[key] !== item[key]) {
          return;
        }
      }
      delete this.data[index];
      removed[index] = item;
    });

    this.data = this.data;

    return removed;
  }

  clear() {
    this.data = {};
    return true;
  }

  count() {
    if (!this.count) {
    }
    return this.keys.length;
  }

  get length() {
    return this.count();
  }

  stringify() {
    return JSON.stringify(this.data);
  }
}

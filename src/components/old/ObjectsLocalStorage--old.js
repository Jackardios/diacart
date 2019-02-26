/**
 * Class representing a objects storage.
 * Класс, представляющий хранилище объектов
 */
class ObjectsLocalStorage {
  /**
   * @param {!string} name - Storage name
   */
  constructor(name, onStorageUpdate = (prevStorage, nextStorage) => null) {
    if (!name) {
      throw new Error('Missing required parameter "name"');
    }
    this._storageName = name;
    this._onStorageUpdate = onStorageUpdate;

    // Synchronization between multiple tabs
    window.addEventListener(
      "storage",
      event => {
        if (event.key === this._storageName) {
          const prevStorage = this._storage;
          this._storage = JSON.parse(event.newValue || "[]");
          this._onStorageUpdate(prevStorage, this._storage);
        }
      },
      false
    );
  }

  get storage() {
    if (!this._storage) {
      const prevStorage = this._storage;
      this._storage = JSON.parse(
        localStorage.getItem(this._storageName) || "[]"
      );
      this._onStorageUpdate(prevStorage, this._storage);
    }
    return this._storage;
  }

  set storage(newStorage) {
    const prevStorage = this._storage;
    this._storage = newStorage;
    localStorage.setItem(this._storageName, JSON.stringify(this._storage));
    this._onStorageUpdate(prevStorage, this._storage);
  }

  /**
   * Get the ID of the last object in the storage.
   * Получить идентификатор последнего объекта в хранилище.
   *
   * @return {number} ID of the last object in the storage
   */
  getLastId() {
    let lastObj = this.storage[this.storage.length - 1];
    return lastObj ? lastObj.id : 0;
  }

  /**
   * Find object with properties matching those on query.
   * Найти объект со свойствами, соответствующими свойствам запроса.
   *
   * @param {Object} query - Query to match
   * @return {Object} Found object or 'null' if it was not found
   *
   * @example
   * storage.findByQuery({foo: 'bar' baz: 200})
   */
  findByQuery(query) {
    return query
      ? this.storage.find(storageItem => {
          for (let key in query) {
            if (query[key] !== storageItem["obj"][key]) {
              return false;
            }
          }
          return true;
        })
      : null;
  }

  /**
   * Find object by the ID.
   * Найти объект по ID.
   *
   * @param {number} id - ID of the object
   * @return {Object} Found object or 'null' if it was not found
   */
  findById(id) {
    return id
      ? this.storage.find(storageItem => {
          return storageItem["id"] === id;
        })
      : null;
  }

  /**
   * Find objects with properties matching those on query.
   * Найти объекты со свойствами, соответствующими свойствам запроса.
   *
   * @param {Object} query - Query to match
   * @return {Object[]} Array of found objects
   *
   * @example
   * storage.filterByQuery({foo: 'bar' baz: 200})
   */
  filterByQuery(query) {
    if (query) {
      return this.storage.filter(storageItem => {
        for (let key in query) {
          if (query[key] !== storageItem["obj"][key]) {
            return false;
          }
        }
        return true;
      });
    }

    return [];
  }

  /**
   * add an object into the storage.
   * Вставить объект в хранилище.
   *
   * @param {Object} obj - The object to be added into the storage
   * @return {Object} - The added storage object or null
   */
  add(obj) {
    if (!obj) {
      return null;
    }

    const storage = this.storage;
    const cartItem = {
      id: this.getLastId() + 1,
      obj: obj
    };

    storage.push(cartItem);
    this.storage = storage;

    return cartItem;
  }

  /**
   * Update an object in storage by the ID
   * Обновить объект в хранилище по ID .
   *
   * @param {number} id - ID of the object being updated
   * @param {Object} updateObj - The object whose properties will be merged with the found object
   * @return {Object} The updated storage object or null
   *
   * @example
   * storage.update(1, {foo: 'bar', baz: 1})
   */
  update(id, updateObj) {
    if (id && updateObj) {
      const storage = this.storage;
      let item;

      for (let i = 0; i < storage.length; ++i) {
        if (storage[i]["id"] === id) {
          item = Object.assign({}, storage[i]["obj"], updateObj);
          storage[i]["obj"] = item;
          this.storage = storage;
          return item;
        }
      }
    }
    return null;
  }

  /**
   * Remove objects from storage based on a id
   * Удалить объекты из хранилища по ID.
   *
   * @param {number} id - ID
   * @return {boolean} The status of the operation
   * @return {Object} The removed storage object or null
   */
  removeById(id) {
    const storage = this.storage;

    for (let i = 0; i < storage.length; ++i) {
      if (storage[i]["id"] === id) {
        let item = storage[i];
        storage.splice(i, 1);
        this.storage = storage;
        return item;
      }
    }
    return null;
  }

  /**
   * Remove objects from storage based on a query
   * Удалить объекты из хранилища по запросу.
   *
   * @param {Object} query - Query to match
   * @return {boolean} The status of the operation
   *
   * @example
   * storage.removeByQuery({foo: 'bar', baz: 1})
   */
  removeByQuery(query) {
    if (query) {
      const storage = this.storage.filter(storageItem => {
        for (let key in query) {
          if (query[key] !== storageItem["obj"][key]) {
            return true;
          }
        }
        return false;
      });
      this.storage = storage;
      return true;
    }
    return false;
  }

  /**
   * Remove all objects from the storage.
   * Удалить все объекты из хранилища.
   *
   * @return {boolean} The status of the operation
   */
  clear() {
    this.storage = [];
    return true;
  }

  /**
   * Get total count of objects in storage.
   * Получить общее количество объектов в хранилище.
   *
   * @return {number} Total count of objects in storage
   */
  count() {
    return this.storage.length;
  }
}

export default ObjectsLocalStorage;

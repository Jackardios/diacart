import ObjectsStorage from "../src/components/ObjectsStorage";

// ObjectsStorage tests
const storage = new ObjectsStorage("diacart");

// add()
storage.clear();
storage.add({
  id: 15,
  name: "Jacket",
  unitPrice: 550
});
storage.add({
  id: 1753,
  name: "Jacket",
  unitPrice: 600
});
storage.add({
  id: 236,
  name: "Pink t-shirt",
  unitPrice: 5300
});
storage.add({
  id: 126,
  name: "Turquoise skirt",
  unitPrice: 3500
});

window.storage = storage;

console.log(storage.storage);

// findById()

// findByQuery()
console.log("findByQuery: ", storage.filter({ name: "Jacket", id: 15 }));
// removeById()
console.log("remove: ", storage.remove(3));
console.log(storage.storage);

// removeByQuery()
console.log(
  "removeByQuery: ",
  storage.removeByQuery({ name: "Jacket", id: 15 })
);
console.log(storage.storage);

// update()
console.log("update: ", storage.update(4, { unitPrice: 100, quantity: 2 }));
console.log(storage.storage);

// count
console.log("count: ", storage.count());

// clear()
console.log("clear: ", storage.clear());
console.log(storage.storage);

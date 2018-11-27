import ObjectsLocalStorage from "../src/components/ObjectsLocalStorage";

// ObjectsLocalStorage tests
const storage = new ObjectsLocalStorage("diacart");

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

console.log(storage.storage);

// findById()
console.log("findById: ", storage.findById(3));

// findByQuery()
console.log("findByQuery: ", storage.findByQuery({ name: "Jacket", id: 15 }));

// removeById()
console.log("removeById: ", storage.removeById(3));
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

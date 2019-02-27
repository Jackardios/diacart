import "./common.scss";
import ObjectsStorage from "../src/components/ObjectsStorage";

window.storage = new ObjectsStorage("diacart");
import Diacart from "../src/index";

window.diacart = new Diacart();
window.diacart.on("order", order => {
  console.dir(order);
});

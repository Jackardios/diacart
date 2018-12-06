import "./common.scss";
import Diacart from "../src/index";

window.diacart = new Diacart({
  itemHasQuantity: false,
  onInit: f => console.log("init"),
  onAdd: f => console.log("add"),
  onUpdate: f => console.log("update"),
  onRemove: f => console.log("remove"),
  onClear: f => console.log("clear"),
  onOrder: f => console.log("order"),
  onRefresh: f => console.log("refresh")
});
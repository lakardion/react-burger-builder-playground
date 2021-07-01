import { get } from "./apiCallService";

export default {
  getOrders: () => get("orders"),
};

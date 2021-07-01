import { get } from "./apiCallService";

export default {
  getPrices: () => get("prices"),
};

const { default: Axios } = require("axios");

const instance = Axios.create({
  baseURL: "http://localhost:3004/",
});

export default instance;

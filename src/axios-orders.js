const { default: Axios } = require("axios");

const instance = Axios.create({
  baseURL: "https://react-burgertify.firebaseio.com/",
});

export default instance;

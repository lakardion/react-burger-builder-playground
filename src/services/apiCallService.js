import axios from "../axios-orders";
const axiosCallErrorWrapper = async (axiosCall) => {
  try {
    return await axiosCall();
  } catch (error) {
    if (error.response) {
      return {
        error: {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers,
        },
      };
    } else if (error.request) {
      return {
        error: error.request,
      };
    } else {
      return { error };
    }
  }
};
export const get = (uri) => axiosCallErrorWrapper(() => axios.get(uri));

export const post = (uri, body) =>
  axiosCallErrorWrapper(() => axios.post(uri, body));

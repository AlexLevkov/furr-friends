import Axios from "axios";
import { router } from "@/router";

const BASE_URL = //process.env.NODE_ENV === 'production'
  // ? '/api/' :
  // "http://localhost:3030/api/";
  // "http://localhost:2000/api/";
"https://central-server-81cq.onrender.com/api/";

var axios = Axios.create({
  // withCredentials: true,
});

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(endpoint, method = "GET", data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
    });
    // console.log(" res.data:", res.data);
    return res.data;
  } catch (err) {
    console.log("err.response.data.msg:", err.response.data.msg);
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`
    );
    console.dir(err);
    throw err;
  }
}

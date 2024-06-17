import axios from "axios";

const apiURL = axios.create({
  baseURL: "https://matt-nc-news.onrender.com/api/",
});

export const getRequest = (endpoint, params = {}) => {
  return apiURL
    .get(endpoint, { params })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error:", err);
      throw err;
    });
};

export const patchRequest = (endpoint, body) => {
    return apiURL
    .patch(endpoint, body)
    .then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return res.data;
        } else {
            throw new Error(`Request failed with status ${res.status}`);
        }
    })
    .catch((err) => {
        console.log("Error:", err)
        throw err;
    })
}

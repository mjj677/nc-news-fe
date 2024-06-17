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

import axios from "axios";
const baseUrl = "http://localhost:3001/persons";
const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    name: "Ashish",
    number: "6360631229",
  };
  return request.then((response) => response.data.concat(nonExisting));
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

export default {
  getAll: getAll,
  create: create,
  update: update,
};

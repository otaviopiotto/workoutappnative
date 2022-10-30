import axios from "axios";

export const baseURL = "https://workoutapp-backend-otavio.herokuapp.com/";

export const api = axios.create({
  baseURL,
});

export default api;

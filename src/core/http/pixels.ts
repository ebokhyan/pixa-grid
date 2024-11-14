import createAxiosInstance from "./axiosInstance";

const pixelsAxios = createAxiosInstance("https://api.pexels.com/v1");

pixelsAxios.defaults.headers["Authorization"] =
  import.meta.env.VITE_PIXELS_ACCESS_TOKEN;

export default pixelsAxios;

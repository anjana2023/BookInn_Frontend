import axios from "axios";

const axiosJWT = axios.create();
axiosJWT.defaults.withCredentials = true;

export default axiosJWT;

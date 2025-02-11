import axios from "axios";
import Cookies from "js-cookie";

const axiosCostume = axios.create({
  headers: {
    Authorization: Cookies.get("cobit_token"),
  },
});

export default axiosCostume;

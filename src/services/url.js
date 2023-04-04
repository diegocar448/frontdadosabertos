import axios from "axios";


const url = axios.create({
    baseURL: "http://portalbrasileirodedadosabertos.test/api/",
});

export default url;

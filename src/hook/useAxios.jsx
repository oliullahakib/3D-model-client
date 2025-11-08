import axios from "axios";

const instance = axios.create({
    baseURL: 'https://3d-model-server-six.vercel.app',
})
const useAxios = () => {
    return instance
};

export default useAxios;
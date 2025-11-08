import axios from "axios";
import { use, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const instance = axios.create({
    baseURL: 'https://3d-model-server-six.vercel.app'
})

const useAxiosSecure = () => {
    const { user } = use(AuthContext)
    useEffect(() => {
        const reqInterceptor = instance.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user.accessToken}`
            return config
        })

        return () => {
            instance.interceptors.request.eject(reqInterceptor)
        }
    }, [user])

    return instance
};

export default useAxiosSecure;
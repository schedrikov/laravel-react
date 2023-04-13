import axios from "axios";

const AxiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`
})

AxiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('user_token');
    config.headers.Authorization = `Bearer ${token}`
    config.headers.Accept = `application/json`
    return config
})

AxiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    const {response} = error
    if (response.status === 401) {
        localStorage.removeItem('user_token')
    }

    throw error
})

export default AxiosClient
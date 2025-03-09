import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: ' https://localhost:7217', // Thay thế bằng URL của backend của bạn
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.message === 'Network Error' || error.code === 'ERR_CONNECTION_REFUSED') {
            toast.error('Mày chưa bật server lên kìa thằng ngu !!!',{ autoClose: 5000});
        }
        return Promise.reject(error);
    }
);

export default api;
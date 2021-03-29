import Axios from 'axios';

export default function axiosInstance() {
    return Axios.create({
        baseURL: ' http://localhost:5000',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt-token'),
        }
    });
}
import axios from 'axios';
import authenHeader from './authenHeader';

const API_URL = 'const API_URL = "http://localhost:8080/user';

class UserService {
    getAllUser() {
        return axios.get(API_URL, {
            headers: authenHeader()
        });
    }
}

export default new UserService();
import User from '@/utils/declarations';
import axios from 'axios';

const API_URL = process.env.API_URL;
const UserAPI = {
    create: async (user : User) => await axios.post(`${API_URL}/user`, user)
}

export default UserAPI;
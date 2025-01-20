import User from '@/utils/declarations';
import axios from 'axios';
import apiURL from './apiConfig';

const UserAPI = {
    create: async (user : User) => await axios.post(`${apiURL}/user`, user)
}

export default UserAPI;
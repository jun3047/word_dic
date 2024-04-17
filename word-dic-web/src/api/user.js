import axios from 'axios';
import keyList from '../db/license_key.json';


const url = process.env.REACT_APP_API_URL

const login = async ({ email, password }) => {
    try {
        console.log(`${url}/login`)
        const response = await axios.post(`${url}/login`, { email, password });

        return response.data
    } catch (error) {
        console.error('사용자 등록 중 오류:', error);
    }
};

const register = async ({ email, password, licKey }) => {
    try {
        const response = await axios.post(`${url}/register`, { email, password, licKey });
        return response.data

    } catch (error) {
        console.error('로그인 중 오류:', error);
    }
};

export {register, login}
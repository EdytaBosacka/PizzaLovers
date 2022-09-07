import Axios, { AxiosResponse } from 'axios';

export const savePassword = (passwordValue: String): Promise<AxiosResponse<any, any>> => {
    return Axios.post('http://localhost:3001/savePassword/', {
        login: localStorage.getItem('login'),
        password: passwordValue
    });
} 

export const saveUserDetails = (userData: { name: String, dateOfBirth: String, gender: String, localization: String}): Promise<AxiosResponse<any, any>> => {
    return Axios.post('http://localhost:3001/saveUserDetails/', {
        login: localStorage.getItem('login'),
        userData: userData
    });
}    
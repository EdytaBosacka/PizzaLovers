import Axios, { AxiosResponse } from 'axios';

export const login = (loginData: { [x: string]: any }): Promise<AxiosResponse<any, any>> => {
    return Axios.post('http://localhost:3001/login/', {
        login: loginData.login,
        password: loginData.password
    });
}

export const register = (registerData: { [x: string]: any }): Promise<AxiosResponse<any, any>> => {
    return Axios.post('http://localhost:3001/register/', {
        login: registerData.login,
        password: registerData.password,
        name: registerData.name,
        dateOfBirth: registerData.dateOfBirth,
        gender: registerData.gender.value,
        localization: registerData.localization
    });
}

export const savePassword = (passwordValue: String): Promise<AxiosResponse<any, any>> => {
    return Axios.post('http://localhost:3001/savePassword/', {
        login: localStorage.getItem('login'),
        password: passwordValue
    });
}

export const saveUserGeneralInformation = (userData: { name: String, dateOfBirth: String, gender: String, localization: String }): Promise<AxiosResponse<any, any>> => {
    return Axios.post('http://localhost:3001/saveUserGeneralInformation/', {
        login: localStorage.getItem('login'),
        userData: userData
    });
}

export const getUserDetails = (): Promise<AxiosResponse<any, any>> => {
    return Axios.post('http://localhost:3001/getUserDetails', {
        loggedUser: localStorage.getItem('login'),
    });
}

export const getImages = (): Promise<AxiosResponse<any, any>> => {
    return Axios.post('http://localhost:3001/getImages', {
        loggedUser: localStorage.getItem('login'),
    });
}

export const uploadImage = (image: (String | ArrayBuffer)): Promise<AxiosResponse<any, any>> => {
    return Axios.post('http://localhost:3001/uploadImage/', {
        loggedUser: localStorage.getItem('login'),
        image: image
    });
}


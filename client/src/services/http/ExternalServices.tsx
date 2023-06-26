import Axios, { AxiosResponse } from 'axios';

export const getListOfLanguages = (): Promise<AxiosResponse<any, any>> => {
    return Axios.get('https://libretranslate.com/languages');
}
import axios from 'axios';
import { API_URL } from '../config/env';


const authService = {

    // função de login
    async authenticate(data) {
        const endpoint = `${API_URL}/users/check`
        return axios.post(endpoint, data);
    },

    // Função para salvar o usuário logado no session storage
    setLoggedUser(data){
        let parsedData = JSON.stringify(data)
        sessionStorage.setItem("user", parsedData)
    },

    // Função responsável por recuperar o usuário logado do session storage
    getLoggedUser(){
        let data = sessionStorage.getItem("user");
        if(!data) return null;
        try {
            let parsedData = JSON.parse(data)
            return parsedData
        } catch (error) {
            console.log(error)
            return null
        }
    },

    removeLoggedUser(){
        sessionStorage.removeItem("user");
    }
}

export default authService;
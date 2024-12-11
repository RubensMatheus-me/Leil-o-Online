import api from '../config/axiosConfig';

class BaseService {
    constructor(endpoint) {
        this.api = api;
        this.endpoint = endpoint;
    }

    async getAuthenticatedUser() {
        try {
            const response = await this.api.get('/me');
            return response.data; 
        } catch (error) {
            console.error("Erro ao obter usuário autenticado:", error);
            throw error; 
        }
    }

    async insert(data) {
        const response = await this.api.post(this.endpoint, data);
        return response.data;
    }

    async update(data) {
        const response = await this.api.put(this.endpoint, data);
        return response.data;
    }

    async delete(id) {
        const response = await this.api.delete(`${this.endpoint}/${id}`);
        return response.data;
    }
}

export default BaseService;

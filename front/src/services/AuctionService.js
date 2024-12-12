import BaseService from "./BaseService";
import HandleApiError from "../handler/HandleApiError";

class AuctionService extends BaseService {
    constructor() {
        super("auction");
    }

    getAuthHeaders() {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    async createAuction(data) {
        try {
            const response = await this.api.post(`${this.endpoint}`, data, {
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            HandleApiError(error);
            throw error;
        }
    }

    // Atualizar leilão
    async updateAuction(id, data) {
        try {
            const response = await this.api.put(`${this.endpoint}/${id}`, data, {
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            HandleApiError(error);
            throw error;
        }
    }

    async deleteAuction(id) {
        try {
            const response = await this.api.delete(`${this.endpoint}/${id}`, {
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            HandleApiError(error);
            throw error;
        }
    }

    async getUserAuctions() {
        try {
            const response = await this.api.get(`${this.endpoint}/my-auctions`, {
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            HandleApiError(error);
            throw error;
        }
    }

    async getPublicAuctions() {
        try {
            const response = await this.api.get(`${this.endpoint}/public`);
            return response.data;
        } catch (error) {
            HandleApiError(error);
            throw error;
        }
    }

    async getAuctionById(id) {
        try {
            const response = await this.api.get(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            HandleApiError(error);
            throw error;
        }
    }

    async getAuthenticatedUser() {
        try {
            const response = await this.api.get(`${this.endpoint}/me`, {
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            HandleApiError(error);
            throw error;
        }
    }
}

export default AuctionService;

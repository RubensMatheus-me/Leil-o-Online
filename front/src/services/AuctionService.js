import BaseService from "./BaseService";
import HandleApiError from "../handler/HandleApiError";

class AuctionService extends BaseService {
    constructor() {
        super("auction");
    }

    async createAuction(data) {
        try {
            const response = await this.api.post(`${this.endpoint}`, data);
            return response.data;
        } catch (error) {
            HandleApiError(error);
            throw error;
        }
    }

    async updateAuction(id, data) {
        try {
            const response = await this.api.put(`${this.endpoint}/${id}`, data);
            return response.data;
        } catch (error) {
            HandleApiError(error);
            throw error;
        }
    }

    async deleteAuction(id) {
        try {
            const response = await this.api.delete(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            HandleApiError(error);
            throw error;
        }
    }

    async getUserAuctions() {
        try {
            const response = await this.api.get(`${this.endpoint}/my-auctions`);
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
            const response = await this.api.get(`${this.endpoint}/me`);
            return response.data;
        } catch (error) {
            HandleApiError(error);
            throw error;
        }
    }
}

export default AuctionService;

import BaseService from "./BaseService";
import HandleApiError from "../handler/HandleApiError";


class CategoryService extends BaseService {
    constructor() {
        super("category");
    }

    async requestHandler(apiCall) {
        try {
            const response = await apiCall();
            return response.data;
        } catch (error) {
            throw new Error(HandleApiError(error)); 
        }
    }

    async create(categoryData) {
        return await this.requestHandler(() =>
            this.api.post(`${this.endpoint}`, categoryData)
        );
    }

    async listAll() {
        return await this.requestHandler(() =>
            this.api.get(`${this.endpoint}`)
        );
    }
    
    async listMyCategories() {
        return await this.requestHandler(() =>
            this.api.get(`${this.endpoint}/my-categories`)
        );
    }
}


export default CategoryService;

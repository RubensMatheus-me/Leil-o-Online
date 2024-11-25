import BaseService from "./BaseService";
import { handleApiError } from "./errorHandler";

class PersonService extends BaseService {
    constructor() {
        super("person");
    }

    async requestHandler(apiCall) {
        try {
            const response = await apiCall();
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error)); 
        }
    }


    async login(credentials) {
        return await this.requestHandler(() =>
            this.api.post(`${this.endPoint}/login`, credentials)
        );
    }

    async create(personData) {
        return await this.requestHandler(() =>
            this.api.post(`${this.endPoint}/create`, personData)
        );
    }

    async activateUser(token) {
        return await this.requestHandler(() =>
            this.api.get(`${this.endPoint}/activate`, { params: { token } })
        );
    }

    async forgotPassword(email) {
        return await this.requestHandler(() =>
            this.api.post(`${this.endPoint}/forgot-password`, { email })
        );
    }

    async validateCode(email, code) {
        return await this.requestHandler(() =>
            this.api.post(`${this.endPoint}/validate-code`, { email, code })
        );
    }

    async changePassword(changePasswordData) {
        return await this.requestHandler(() =>
            this.api.post(`${this.endPoint}/change-password`, changePasswordData)
        );
    }
}

export default PersonService;

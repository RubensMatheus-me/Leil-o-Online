import BaseService from "./BaseService";
import HandleApiError from "../handler/HandleApiError";

class PersonService extends BaseService {
    constructor() {
        super("person");
    }

    async requestHandler(apiCall) {
        try {
            const response = await apiCall();
            return response.data;
        } catch (error) {
            console.error("API Error: ", error);
            throw new Error(HandleApiError(error));
        }
    }

    async login(credentials) {
        console.log(`${this.endpoint}/login`);
        return await this.requestHandler(() =>
            this.api.post(`${this.endpoint}/login`, credentials)
        );
    }

    async create(personData) {
        console.log(`${this.endpoint}`);
        return await this.requestHandler(() =>
            this.api.post(`${this.endpoint}`, personData)
        );
    }

    async activateUser(token) {
        return await this.requestHandler(() =>
            this.api.get(`${this.endpoint}/activate`, { params: { token } })
        );
    }

    async forgotPassword(email) {
        return await this.requestHandler(() =>
            this.api.post(`${this.endpoint}/forgot-password`, { email })
        );
    }

    async validateCode({ email, code }) {
        return await this.requestHandler(() =>
            this.api.post(`${this.endpoint}/forgot-password-validate?code=${code}`, { email })
        );
    }

    async changePassword(changePasswordData) {
        console.log(`${this.endpoint}/change-password`)
        return await this.requestHandler(() =>
            this.api.post(`${this.endpoint}/change-password`, changePasswordData)
        );
    }
}

export default PersonService;

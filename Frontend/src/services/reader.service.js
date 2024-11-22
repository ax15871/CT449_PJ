import createApiClient from "./api.service";

class ReaderService {
    constructor(baseUrl = "/api/reader") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }

    async deleteAll() {
        return (await this.api.delete("/")).data;
    }

    async getById(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async getByName(name) {
        return (await this.api.get(`?name=${name}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async register(data) {
        return (await this.api.post("/register", data)).data;
    }

    async login(data) {
        return (await this.api.post("/login", data)).data;
    }

    async getByMADOCGIA(MADOCGIA) {
        return (await this.api.get(`/madocgia/${MADOCGIA}`)).data;
    }
}

export default new ReaderService();
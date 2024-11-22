import createApiClient from "./api.service";

class PublisherService {
    constructor(baseUrl = "/api/publisher") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    
    async create(data) {
        return (await this.api.post("/", data)).data;
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

    async getByMANXB(MANXB) {
        return (await this.api.get(`/manxb/${MANXB}`)).data;
    }
}

export default new PublisherService();
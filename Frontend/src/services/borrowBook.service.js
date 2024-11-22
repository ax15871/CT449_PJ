import createApiClient from "./api.service";

class BorrowBookService {
    constructor(baseUrl = "/api/borrowBook") {
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

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    
    async getByMADOCGIA(MADOCGIA) {
        return (await this.api.get(`/madocgia/${MADOCGIA}`)).data;
    }

    async getByMASACH(MASACH) {
        return (await this.api.get(`/masach/${MASACH}`)).data;
    }
}

export default new BorrowBookService();
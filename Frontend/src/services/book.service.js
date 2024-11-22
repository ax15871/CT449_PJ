    import createApiClient from "./api.service";

    class BookService {
        constructor(baseUrl = "/api/book") {
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

        async getByMASACH(MASACH) {
            return (await this.api.get(`/masach/${MASACH}`)).data;
        }

        async update(id, data) {
            return (await this.api.put(`/${id}`, data)).data;
        }

        async updateByMASACH(MASACH, data) {
            return (await this.api.put(`/masach/${MASACH}`, data)).data;
        }
        
        async delete(id) {
            return (await this.api.delete(`/${id}`)).data;
        }
    }

    export default new BookService();
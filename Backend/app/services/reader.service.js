const { ObjectId } = require("mongodb");

class ReaderService {
    constructor(client) {
        this.reader = client.db().collection("docgia");
    }
    
    extractReaderData(payload) {
        const reader = {
            MADOCGIA: payload.MADOCGIA,
            USERNAME: payload.USERNAME,
            PASSWORD: payload.PASSWORD,
            HOLOT: payload.HOLOT,
            TEN: payload.TEN,
            NGAYSINH: payload.NGAYSINH,
            PHAI: payload.PHAI,
            DIACHI: payload.DIACHI,
            DIENTHOAI: payload.DIENTHOAI
        };

        // Remove undefined fields
        Object.keys(reader).forEach(
            (key) => reader[key] === undefined && delete reader[key]
        );
        return reader;
    }

    async generateID() {
        while (true) {
            const id = Math.floor(10 + Math.random() * 90).toString(); // Tạo số 2 chữ số từ 10-99
            const existingReader = await this.reader.findOne({ MADOCGIA: id });
            if (!existingReader) {
                return id;
            }
        }
    }

    async find(filter){
        const cursor = await this.reader.find(filter);
        return await cursor.toArray();
    }

    async findById(id){
        return await this.reader.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findByMADOCGIA(MADOCGIA) {
        const filter = { MADOCGIA: MADOCGIA };
        const cursor = await this.reader.find(filter);
        return await cursor.toArray();
    }

    async update(id,payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractReaderData(payload);
        const result = await this.reader.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after" }
        );
        return result;
    }

      async delete(id){
        const result = await this.reader.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll(){
        const result = await this.reader.deleteMany({});
        return result.deletedCount;
    }

    validateRegisterData(payload) {
        const requiredFields = ['USERNAME', 'PASSWORD', 'HOLOT', 'TEN'];
        for (const field of requiredFields) {
            if (!payload[field]) {
                throw new Error(`${field} is required`);
            }
        }
    }

    async register(payload) {
        try {
            // Validate dữ liệu đầu vào
            this.validateRegisterData(payload);

            // Kiểm tra username tồn tại
            const existingUser = await this.reader.findOne({ 
                USERNAME: payload.USERNAME 
            });
            if (existingUser) {
                throw new Error("Username already exists");
            }

            // Tạo reader mới
            const newUser = this.extractReaderData(payload);
            delete newUser._id;
            
            // Generate MADOCGIA unique
            newUser.MADOCGIA = await this.generateID();

            // Thêm timestamp
            newUser.createdAt = new Date();

            // Insert vào database
            const result = await this.reader.insertOne(newUser);
            if (!result.acknowledged) {
                throw new Error("Failed to insert new reader");
            }

            return {
                ...newUser,
                _id: result.insertedId
            };
        } catch (error) {
            console.error("Register error:", error);
            throw error;
        }
    }

    async login(username, password) {
        try {
            if (!username || !password) {
                throw new Error("Username and password are required");
            }

            const user = await this.reader.findOne({ USERNAME: username });
            if (!user) {
                throw new Error("User not found");
            }

            if (user.PASSWORD !== password) {
                throw new Error("Incorrect password");
            }

            // Trả về thông tin cần thiết
            return {
                MADOCGIA: user.MADOCGIA,
                USERNAME: user.USERNAME,
                PASSWORD: user.PASSWORD,
                HOLOT: user.HOLOT,
                TEN: user.TEN,
                NGAYSINH: user.NGAYSINH,
                PHAI: user.PHAI,
                DIACHI: user.DIACHI,
                DIENTHOAI: user.DIENTHOAI
            };
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }
}

module.exports = ReaderService;

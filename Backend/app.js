const express = require("express");
const cors = require("cors");
const publisherRouter = require("./app/routes/publisher.route");
const bookRouter = require("./app/routes/book.route");
const readerRouter = require("./app/routes/reader.route");
const staffRouter = require("./app/routes/staff.route");
const borrowBookRouter = require("./app/routes/borrowBook.route");
const ApiError = require("./app/api-error");

const app = express();

// import các routes
app.use(cors());
app.use(express.json());
app.use("/api/publisher", publisherRouter);
app.use("/api/book", bookRouter);
app.use("/api/reader", readerRouter);
app.use("/api/staff", staffRouter);
app.use("/api/borrowBook", borrowBookRouter);

// Đặt route handler cho đường dẫn gốc
app.get("/", (req, res) => {
    res.json({message: "Chào bạn đến với hệ thống quản lý mượn sách!"});
});

// Xử lý lỗi 404
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// Xử lý lỗi chung
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); 

// 1. User Service Proxy (Port 4001)
app.use('/api/users', createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
}));

// 2. Book Service Proxy (Port 4002)
app.use('/api/books', createProxyMiddleware({
    target: process.env.BOOK_SERVICE_URL,
    changeOrigin: true,
}));

// 3. Borrow Service Proxy (Port 4003)
app.use('/api/borrows', createProxyMiddleware({
    target: process.env.BORROW_SERVICE_URL,
    changeOrigin: true,
}));

app.get('/', (req, res) => {
    res.send('API Gateway is Running');
});

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const datLichRoutes = require('./routes/datlich.routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongouri = process.env.DB_url
const authRoutes = require('./routes/auth.routes');
const registerRoutes = require('./routes/register.routes')
const ResetpassRoutes = require('./routes/resetpass.routes')
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log('Request body:', req.body);
  next();
});

// Kiểm tra xem URI có được định nghĩa không
if (!mongouri) {
  throw new Error('MongoDB URI is not defined in environment variables!');
}
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Kết nối MongoDB
mongoose.connect(mongouri, {

}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.get('/',(req,res) =>{
  res.send('Hello,world!')
})
app.use('/api/dangnhap', authRoutes);    // Route cho chức năng đăng nhập
app.get('/api/dangnhap',cors(), authRoutes)
app.use('/api/dangky',registerRoutes)    // Route cho chức năng đăng ký


// Đăth lịch 
app.use('/datlich', datLichRoutes);
// đánh giá
const reviewRoutes = require('./routes/danhgia.routes');
app.use('/reviews', reviewRoutes);

// Cho phép truy cập công khai thư mục 'uploads'
app.use('/image_review', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/resetpass', ResetpassRoutes);


// Khởi chạy server
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

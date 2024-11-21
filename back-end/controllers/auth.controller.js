require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

exports.login = async (req, res) => {
  const { email, password } = req.body;
try{
  // Tìm kiếm người dùng qua email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Email không tồn tại' });
  }
  // Kiểm tra mật khẩu
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Mật khẩu không đúng' });
  }

  // Tạo token JWT
  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

  res.status(200).json({ token, message: 'Đăng nhập thành công' });
} catch (error) {
  console.error('Error during login:', error.message);
  res.status(500).json({ message: 'Lỗi máy chủ' });
}}
;

const User = require('../models/user');

// Đăng ký người dùng
exports.registerUser = async (req, res) => {
  const { hoTen, email, sdt, password, captchaInput } = req.body;

  // Kiểm tra CAPTCHA
  if (!req.session.captcha || captchaInput !== req.session.captcha) {
    return res.status(400).json({ message: 'CAPTCHA không chính xác!' });
  }

  // Kiểm tra email đã tồn tại
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email đã được sử dụng!' });
  }

  // Tạo người dùng mới
  try {
    const newUser = new User({ hoTen, email, sdt, password });
    await newUser.save();
    req.session.captcha = null; // Xóa CAPTCHA sau khi sử dụng
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error.message });
  }
};

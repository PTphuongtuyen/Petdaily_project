const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');

const router = express.Router();

// Gửi email xác nhận
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('Email không tồn tại.');

    // Tạo token reset password
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 phút
    await user.save();

    // Gửi email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password',
      },
    });

    const resetLink = `http://localhost:4200/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Reset mật khẩu',
      text: `Nhấn vào link để reset mật khẩu: ${resetLink}`,
    });

    res.send('Đã gửi email reset mật khẩu.');
  } catch (err) {
    res.status(500).send('Lỗi server.');
  }
});

// Xác nhận mã token và đổi mật khẩu
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).send('Token không hợp lệ hoặc đã hết hạn.');

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.send('Mật khẩu đã được cập nhật.');
  } catch (err) {
    res.status(500).send('Lỗi server.');
  }
});

module.exports = router;

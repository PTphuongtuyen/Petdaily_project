const svgCaptcha = require('svg-captcha');

// Tạo CAPTCHA và trả về client
exports.generateCaptcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 2,
    color: true,
  });
  req.session.captcha = captcha.text; // Lưu CAPTCHA vào session
  res.type('svg');
  res.status(200).send(captcha.data); // Trả về ảnh SVG
};

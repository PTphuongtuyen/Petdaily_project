const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const newUserSchema = new mongoose.Schema({
  ID_KH: {type: String, required: true, unique: true},
  hoTen: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  sdt: {type: String, required: true},
  password: {type: String, required: true},
})


//Mã hóa mật khẩu trước khi lưu
newUserSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next()
});

// Phương thức kiểm tra mật khẩu
newUserSchema.methods.comparePassword = async function (password) {
  console.log('Mật khẩu người dùng nhập:', password);
  console.log('Mật khẩu trong database:', this.password);
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', newUserSchema);

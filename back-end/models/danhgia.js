const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  maDanhGia: { type: String, required: true }, // Mã đánh giá
  danhGia: { type: Number, required: true, min: 1, max: 5 }, // Số sao
  binhLuan: { type: String }, // Bình luận
  hinhAnh: { type: [String] }, // Danh sách hình ảnh
  ID_KH: { type: String, required: true }, // ID khách hàng
  hoTen: { type: String, required: true }, // Họ tên khách hàng
  linhVuc: { type: String, required: true }, // Lĩnh vực dịch vụ
  maGoi: { type: String, required: true }, // Mã gói dịch vụ
  tenGoi: { type: String, required: true }, // Tên gói dịch vụ
  ngay: { type: Date, required: true }, // Ngày đánh giá
});

ReviewSchema.pre('save', async function (next) {
  if (!this.maDanhGia) {
    const Review = mongoose.model('Review');
    const totalReview = await Review.countDocuments();
    this.maDanhGia = `DG${(totalReview + 1).toString().padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('ds-danh-gia', ReviewSchema);

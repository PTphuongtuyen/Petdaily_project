const mongoose = require('mongoose');

const DatLichSchema = new mongoose.Schema(
    {
        maDatLich: { type: String, unique: true, required: true }, 
        hoTen:{ type: String, required: true }, // Họ tên
        soDienThoai: { type: String, required: true }, // Số điện thoại
        ngLienhekhac: { type: String }, // Người liên hệ khác (optional)
        sdt_ngLienhekhac: { type: String }, // Số điện thoại người liên hệ khác (optional)
        email: { type: String, required: true }, // Email
        loaiThuCung: { type: String, required: true }, // Thú cưng (Chó/Mèo)
        dichVu: { type: String, required: true }, // Dịch vụ
        tenGoi: { type: String }, // Gói dịch vụ (optional)
        ngayBatDau: { type: Date }, // Ngày bắt đầu (for hotel service)
        ngayKetThuc: { type: Date }, // Ngày kết thúc (for hotel service)
        hinhThuc: { type: String, required: true }, // Hình thức (Tại nhà/Tại cửa hàng)
        diaChi: { type: String }, // Địa chỉ nhà (if method is "home")
        ngayHen: { type: Date, required: true }, // Ngày hẹn
        gioHen: { type: String, required: true }, // Giờ hẹn
        luuY: { type: String }, // Lưu ý về thú cưng (optional)
    },
    { timestamps: true }
);

module.exports = mongoose.model('DatLich', DatLichSchema);

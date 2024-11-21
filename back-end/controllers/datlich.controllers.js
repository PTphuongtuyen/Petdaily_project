const DatLich = require('../models/datlich');




// Hàm sinh mã đặt lịch
const generateMaDatLich = async () => {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const latestDatLich = await DatLich.findOne({ maDatLich: { $regex: `^${datePart}` } })
        .sort({ maDatLich: -1 }) // Sắp xếp giảm dần
        .exec();

    let orderPart = 1; // Bắt đầu từ 1 nếu không có lịch nào
    if (latestDatLich) {
        const latestOrder = parseInt(latestDatLich.maDatLich.slice(-3), 10); // Lấy 3 số cuối
        orderPart = latestOrder + 1; // Tăng thêm 1
    }

    return `${datePart}${orderPart.toString().padStart(3, '0')}`; // YYYYMMDD + 001
};


// Lưu dữ liệu lịch hẹn từ client
exports.createDatLich = async (req, res) => {
    try {
        // Tạo một bản ghi mới từ dữ liệu client gửi lên
        const maDatLich = await generateMaDatLich();
        console.log('Generated maDatLich:', maDatLich);
        const datLich = new DatLich({...req.body, maDatLich,});
        // Lưu vào cơ sở dữ liệu
        await datLich.save();

        res.status(201).json({
            message: 'Lịch hẹn đã được lưu thành công!',
            data: datLich,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Đã xảy ra lỗi khi lưu lịch hẹn!',
            error: err.message,
        });
    }
};

exports.getAllDatLich = async (req, res) => {
    try {
        const datLich = await DatLich.find(); // Lấy toàn bộ dữ liệu từ MongoDB
        res.status(200).json(datLich); // Trả về danh sách lịch hẹn
    } catch (err) {
        res.status(500).json({
            message: 'Lỗi khi lấy danh sách lịch hẹn!',
            error: err.message
        });
    }
};

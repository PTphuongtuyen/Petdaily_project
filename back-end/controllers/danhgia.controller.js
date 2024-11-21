const Review = require('../models/danhgia');

// Lấy danh sách đánh giá
exports.getReviews = async (req, res) => {
  const { danhGia, linhVuc, tenGoi } = req.query;

  let filter = {};
  if (danhGia) filter.danhGia = danhGia;
  if (linhVuc) filter.linhVuc = linhVuc;
  if (tenGoi) filter.tenGoi = tenGoi;

  try {
    const reviews = await Review.find(filter).sort({ ngay: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đánh giá!', error: err });
  }
};

// Thêm đánh giá mới
exports.addReview = async (req, res) => {
  try {
    //đếm số lượng đánh giá hiện có
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi thêm đánh giá!', error: err });
  }
};

// Lấy thống kê đánh giá
exports.getStats = async (req, res) => {
  try {
    const stats = await Review.aggregate([
      {
        $group: {
          _id: '$danhGia',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalReviews = await Review.countDocuments();
    const averageRating = await Review.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$danhGia' },
        },
      },
    ]);

    res.json({
      total: totalReviews,
      average: averageRating[0]?.avgRating || 0,
      stats,
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thống kê!', error: err });
  }
};

const express = require('express');
const router = express.Router();
const { createDatLich, getAllDatLich } = require('../controllers/datlich.controllers');

// Route lưu dữ liệu lịch hẹn
router.post('/', createDatLich);
router.get('/', getAllDatLich);

module.exports = router;

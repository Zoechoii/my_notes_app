const express = require('express');
const router = express.Router();

// 홈페이지
router.get('/', (req, res) => {
    res.render('index.ejs');
});

// About 페이지 (선택사항)
router.get('/about', (req, res) => {
    res.render('about.ejs');
});

module.exports = router;
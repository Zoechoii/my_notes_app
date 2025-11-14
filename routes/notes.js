const express = require('express');
const router = express.Router();

// 노트 목록 보기
router.get('/list', (req, res) => {
    let sqlquery = "SELECT * FROM notes ORDER BY updated_at DESC";
    
    req.app.locals.db.query(sqlquery, (err, result) => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        res.render('list.ejs', { notes: result });
    });
});

// 새 노트 작성 폼
router.get('/create', (req, res) => {
    res.render('create.ejs');
});

// 새 노트 저장
router.post('/created', (req, res) => {
    let sqlquery = "INSERT INTO notes (title, content) VALUES (?, ?)";
    let newNote = [req.body.title, req.body.content];
    
    req.app.locals.db.query(sqlquery, newNote, (err, result) => {
        if (err) {
            console.error(err);
            return res.redirect('/notes/create');
        }
        res.redirect('/notes/list');
    });
});

// 특정 노트 보기
router.get('/view/:id', (req, res) => {
    let sqlquery = "SELECT * FROM notes WHERE id = ?";
    
    req.app.locals.db.query(sqlquery, [req.params.id], (err, result) => {
        if (err || result.length === 0) {
            console.error(err);
            return res.redirect('/notes/list');
        }
        res.render('view.ejs', { note: result[0] });
    });
});

// 노트 수정 폼
router.get('/edit/:id', (req, res) => {
    let sqlquery = "SELECT * FROM notes WHERE id = ?";
    
    req.app.locals.db.query(sqlquery, [req.params.id], (err, result) => {
        if (err || result.length === 0) {
            console.error(err);
            return res.redirect('/notes/list');
        }
        res.render('edit.ejs', { note: result[0] });
    });
});

// 노트 수정 저장
router.post('/edited/:id', (req, res) => {
    let sqlquery = "UPDATE notes SET title = ?, content = ? WHERE id = ?";
    let params = [req.body.title, req.body.content, req.params.id];
    
    req.app.locals.db.query(sqlquery, params, (err, result) => {
        if (err) {
            console.error(err);
            return res.redirect('/notes/edit/' + req.params.id);
        }
        res.redirect('/notes/view/' + req.params.id);
    });
});

// 노트 삭제
router.get('/delete/:id', (req, res) => {
    let sqlquery = "DELETE FROM notes WHERE id = ?";
    
    req.app.locals.db.query(sqlquery, [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/notes/list');
    });
});

// 검색 폼
router.get('/search', (req, res) => {
    res.render('search.ejs');
});

// 검색 결과
router.post('/search-result', (req, res) => {
    let sqlquery = "SELECT * FROM notes WHERE title LIKE ? OR content LIKE ?";
    let searchTerm = '%' + req.body.keyword + '%';
    
    req.app.locals.db.query(sqlquery, [searchTerm, searchTerm], (err, result) => {
        if (err) {
            console.error(err);
            return res.redirect('/notes/list');
        }
        res.render('search-result.ejs', { notes: result, keyword: req.body.keyword });
    });
});

module.exports = router;
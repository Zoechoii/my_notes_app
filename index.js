// 필요한 모듈
const express = require('express');
const mysql = require('mysql2');
const path = require('path');  // 경로 관련
const app = express();
const port = 8000;

// 데이터베이스 연결
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '220610@!!',  // ⚠️ 여기 수정!
    database: 'noteapp'
});

// DB 연결 확인
db.connect((err) => {
    if (err) {
        console.error('❌ DB 연결 실패:', err);
        return;
    }
    console.log('✅ MySQL 연결 성공!');
});

// EJS 설정 (명확하게!)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // 경로 명시!

// Body parser
app.use(express.urlencoded({ extended: true }));

// 정적 파일 (CSS)
app.use(express.static(path.join(__dirname, 'public')));  // 경로 명시!

// DB 공유
app.locals.db = db;

// 라우터 연결
const mainRoutes = require('./routes/main');
const notesRoutes = require('./routes/notes');

app.use('/', mainRoutes);
app.use('/notes', notesRoutes);

// 서버 시작
app.listen(port, () => {
    console.log(`🚀 서버: http://localhost:${port}`);
});
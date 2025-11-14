//필요한 모듈 불러오기

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 8000;

//데이터베이스 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '220610@!!',
  database: 'noteapp'
    });

    // DB 연결 확인
db.connect((err) => {
    if (err) {
        console.error('DB 연결 실패:', err);
        return;
    }
    console.log('MySQL 연결 성공!');
});

// EJS 템플릿 엔진 설정
app.set('view engine', 'ejs');

// Body parser 설정 (폼 데이터 받기 위해)
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공 (CSS, 이미지 등)
app.use(express.static('public'));

// DB를 다른 파일에서도 쓸 수 있게
app.locals.db = db;

// 라우터 연결
const mainRoutes = require('./routes/main');
const notesRoutes = require('./routes/notes');

app.use('/', mainRoutes);
app.use('/notes', notesRoutes);


// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행중!`);
});
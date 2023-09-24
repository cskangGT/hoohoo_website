const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors()); // CORS 설정 (React 앱에서 요청할 때 오류 방지용)
app.use(bodyParser.json());

let blogData = []

// 모든 블로그 데이터 가져오기
app.get('/blogs', (req, res) => {
    //
});

// 블로그 데이터 추가하기
app.post('/blogs', (req, res) => {
    //
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

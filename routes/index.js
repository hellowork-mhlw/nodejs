const express = require('express');
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process');
const router = express.Router();

// CORSを有効にする
router.use(cors({
  origin: '*', // 許可するオリジン
  methods: '*', // 許可するHTTPメソッド
  allowedHeaders: '*' // 許可するヘッダー
}));

// Serve the index.html file for the root route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Serve the index.html file for the root route
router.get('/run', (req, res) => {
  res.send('GET request to the homepage');
});

// Pingコマンドを実行するエンドポイント
router.get('/ping', (req, res) => {
    const target = req.query.target;

    if (!target) {
        return res.status(400).send('Error: target query parameter is required.');
    }

    // Pingコマンドを実行
    exec(`ping -c 4 ${target}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).send(`Ping command failed: ${stderr}`);
        }

        // コマンドの出力を返す
        res.send(`<pre>${stdout}</pre>`);
    });
});

module.exports = router;

const express = require('express');
const path = require('path');
const cors = require('cors');
const ping = require('net-ping');
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

  // Ping送信
  session.pingHost(target, (error, target, sent, rcvd) => {
      const time = rcvd - sent;

      if (error) {
          if (error instanceof ping.RequestTimedOutError) {
              res.status(408).send(`Ping to ${target} timed out.`);
          } else {
              res.status(500).send(`Ping to ${target} failed: ${error.message}`);
          }
      } else {
          res.send(`Ping to ${target}: time=${time}ms`);
      }
  });
});


module.exports = router;

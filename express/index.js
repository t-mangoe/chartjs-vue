// expressモジュールを読み込む
const express = require("express");
const mysql = require("mysql");

// expressアプリを生成する
const app = express();

// DBとの接続設定
const db_config = {
  host: "db",
  user: "root",
  password: "root",
  database: "sample",
};

// DBとのコネクション
let con;

function handleDisconnect() {
  // mysqlのコネクションを作成
  con = mysql.createConnection(db_config);

  con.connect(function (err) {
    if (err) {
      // コネクション失敗時の処理。再接続を実施
      console.log("ERROR.CONNECTION_DB: ", err);
      setTimeout(handleDisconnect, 5000);
    }
    console.log("Connected");
  });
}

handleDisconnect();

// ルート（http://localhost/）にアクセスしてきたときに「Hello」を返す
app.get("/getData/", (req, res) => {
  //   res.send("Hello!!!");
  const sql = "select * from asset_data";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// ポート3000でサーバを立てる
app.listen(3000, () => console.log("Listening on port 3000"));

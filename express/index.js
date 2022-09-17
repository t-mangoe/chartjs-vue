// expressモジュールを読み込む
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

// expressアプリを生成する
const app = express();

// body-parserの設定
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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

// リクエストのデータをDBに登録する
app.post("/registData/", (req, res) => {
  const insertedData = req.body.data;
  insertedData.forEach((element) => {
    // まずはmergeで実装してみる
    const id = element.id;
    const name = element.name;
    const value = element.value;
    const sql = "replace into asset_data (id,name,value) values (?,?,?)";
    con.query(sql, [id, name, value], (err, result, fields) => {
      if (err) throw err;
    });
  });

  // デバッグ用に、echoサーバーのような挙動にしておく
  res.send(req.body);
});

// 指定されたidのデータを削除する
app.delete("/deleteData/", (req, res) => {
  const id = req.body.id;
  console.log("delete ID = " + id + "!!!!");
  // プレイスホルダーを使ってSQLを組み立てる
  const sql = "delete from asset_data where id = ?";
  con.query(sql, [id], (err, result, fields) => {
    if (err) throw err;
  });
  // デバッグ用に、echoサーバーのような挙動にしておく
  res.send(req.body);
});

// ポート3000でサーバを立てる
app.listen(3000, () => console.log("Listening on port 3000"));

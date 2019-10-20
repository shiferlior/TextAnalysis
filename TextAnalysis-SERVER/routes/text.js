/* GET users listing. */
const sql = require('mssql');
const dbConfig = require('../TextAnalysis.Config/Database');
const express = require('express');
//const router = express.Router();

const https = require("https");
const url = "https://www.gutenberg.org/files/60281/60281-h/60281-h.htm";
let body = "";

https.get(url, res => {
  res.setEncoding("utf8");

  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    //body = JSON.parse(body);
    console.log(typeof (body));
    //putDb(body)
      //  .then(()=>console.log("success"), ()=>console.error("reject"));
  });
});


//module.exports = router;
//router.get('/', function(req, res, next) {
async function putDb(text) {
    try {
      //
      let pool = await sql.connect(dbConfig);
      // let result1 = await pool.request()
      //     .query('select * from [dbo].[userDefinedGroup_tbl]');
      //
      // console.dir(result1);
      //


      // Stored procedure
      //
      let result2 = await pool.request()
          .input('text', sql.NVarChar(sql.MAX), text)
          .input('title', sql.NVarChar(250), "CheckLior")
          .execute('[dbo].[AddNewText_sp]');

      console.dir(result2);
      //res.send(result2);
      pool.close();
    } catch (err) {
      console.error(err);
    }
}
//});

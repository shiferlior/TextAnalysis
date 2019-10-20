var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var textRouter = require('./routes/text');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/text', textRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

////////////////////////////////////////////////
const sql = require('mssql');
const dbConfig = require('./TextAnalysis.Config/Database');

const https = require("https");
const url = "https://www.gutenberg.org/files/98/98-0.txt";
let body = "";

https.get(url, res => {
  res.setEncoding("utf8");

  res.on("data", data => {
    //console.log(data);
    body += data;
  });
  res.on("end", () => {
    //body = JSON.parse(body);
    //console.log(body);
    putDb(body)
      .then(()=>console.log("success"), ()=>console.error("reject"));
  });
});

async function putDb(text) {
  try {
    let pool = await sql.connect(dbConfig);
    let result2 = await pool.request()
        .input('title', sql.NVarChar(250), "CheckLior3")
        .execute('[dbo].[IngestNewTextMultyLevelProcess_StepOne_CreateTextEntity_sp]');

    let id = result2.recordset[0].id;
    let tempSubText="";
    for (let i=0; i<text.length;i++){
      tempSubText+=text[i];
      if(text[i]===String.fromCharCode(10) || text[i]===String.fromCharCode(13)) {
        console.log("{"+i+"}: "+tempSubText);
        await pool.request()
            .input('row', sql.NVarChar(sql.MAX), tempSubText)
            .input('textid', sql.INT, id)
            .execute('[dbo].[IngestNewTextMultyLevelProcess_StepTwo_AddNewRow_sp]');
        console.log("p:" + (i/text.length));
        tempSubText="";
      }
    }

    await pool.request()
        .input('textid', sql.INT, id)
        .execute('[dbo].[IngestNewTextMultyLevelProcess_StepThree_ApplyUDP_sp]');

    console.dir(result2);
    pool.close();
  } catch (err) {
    console.error(err);
  }
}
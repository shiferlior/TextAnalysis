const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../TextAnalysis.Config/Database');

const http = require("http");
const url = "https://www.gutenberg.org/files/98/98-0.txt";
const asyncHandler = require('express-async-handler')

router.get('/', asyncHandler(async (req, res, next) => {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request()
    .execute('[dbo].[GetAllTexts_sp]');
  res.send(result.recordset);
  sql.close();
}));

router.get('/findByMetaData/:key/:value', asyncHandler(async (req, res, next) => {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request()
    .input('attributeKey', sql.NVarChar(50), req.params.key)
    .input('attributeValue', sql.NVarChar(250), req.params.value)
    .execute('[dbo].[FindTextByMetaData_sp]');
  res.send(result.recordset);
}));

router.post('/:id/addMetadata', asyncHandler(async (req, res, next) => {
  try{
  let pool = await sql.connect(dbConfig);
  let result = await pool.request()
    .input('textid', sql.INT, req.params.id)
    .input('key', sql.NVarChar(50), req.body.key)
    .input('value', sql.NVarChar(250), req.body.value)
    .execute('[dbo].[AddTextMetaData_sp]');
    res.send({ returnValue: result.returnValue});
  } catch(err) {
    res.status(409).send({ returnValue: err});
  } finally {
    sql.close();
  }
}));


router.post('/', function (req, res, next) {
  let title = req.body.title;
  let path = req.body.path;
  console.log(req.body);
  if (path.includes('http://')) {
    getTextByHttp(title, path);
    console.log(12);
  }
  else {
    //TODO: getTextByFile
  }

  res.status(200).json({ title: 'start' });
});

async function getTextByHttp(title, path) {
  let text = "";

  http.get(path, res => {
    res.setEncoding("utf8");

    res.on("data", data => {
      //console.log(data);
      text += data;
    });
    res.on("end", () => {
      //body = JSON.parse(body);
      console.log('im hereeeee');
      putDb(title, text)
        .then(() => console.log("success"), () => console.error("reject"));
    });
  });

}

async function putDb(title, text) {
  try {
    let pool = await sql.connect(dbConfig);
    let result2 = await pool.request()
      .input('title', sql.NVarChar(250), title)
      .execute('[dbo].[IngestNewTextMultyLevelProcess_StepOne_CreateTextEntity_sp]');
    let id = result2.recordset[0].id;
    console.log("ID: " + id);

    let tempSubText = "";

    for (let i = 0; i < text.length; i++) {
      tempSubText += text[i];

      if (text[i] === String.fromCharCode(10) || text[i] === String.fromCharCode(13)) {
        await pool.request()
          .input('row', sql.NVarChar(sql.MAX), tempSubText)
          .input('textid', sql.INT, id)
          .execute('[dbo].[IngestNewTextMultyLevelProcess_StepTwo_AddNewRow_sp]');
        console.log("{" + i + "}: " + tempSubText);
        console.log("p:" + ((i / text.length) * 100).toFixed(2));
        tempSubText = "";
      }
    }

    await pool.request()
      .input('textid', sql.INT, id)
      .execute('[dbo].[IngestNewTextMultyLevelProcess_StepThree_ApplyUDP_sp]');

    console.dir(result2);
    pool.close();
  } catch (err) {
    console.error(err);
    pool.close();
  }
}

module.exports = router;
const express = require('express');
const router = express.Router();
const sql = require('mssql');
//const dbConfig = require('../TextAnalysis.Config/Database');
const db = require('../TextAnalysis.DAL/mssqlProvider');
const http = require("http");
const url = "https://www.gutenberg.org/files/98/98-0.txt";
const asyncHandler = require('express-async-handler');

router.get('/', asyncHandler(async (req, res, next) => {
  let result = await db.runProc('[dbo].[GetAllTexts_sp]');
  res.send({ recordset: result.recordset });
}));

router.get('/findByPhrase/:phrase', asyncHandler(async (req, res, next) => {
  let result = await db.runProc('[dbo].[GetTextByPhrase_sp]', [
    ['phrase', sql.NVarChar(250), req.params.phrase]
  ]);
  res.send({ recordset: result.recordset });
}));

router.get('/findByMetadata/:key/:value', asyncHandler(async (req, res, next) => {
  let result = await db.runProc('[dbo].[GetTextByMetaData_sp]', [
    ['attributeKey', sql.NVarChar(50), req.params.key],
    ['attributeValue', sql.NVarChar(250), req.params.value]
  ]);
  res.send({ recordset: result.recordset });
}));

router.get('/showAllPhrasesInAText/:from/:to/:textId', asyncHandler(async (req, res, next) => {
  let params = [
    ['from', sql.Int, req.params.from],
    ['to', sql.Int, req.params.to]
  ];
  if (req.params.textId && req.params.textId !== "null") {
    params.push(['textId', sql.Int, req.params.textId]);
  }
  else {
    params.push(['textId', sql.Int, -1]);
  }
  let result = await db.runProc('[dbo].[GetAllPhrasesInAText_sp]', params);
  res.send({ recordset: result.recordset });
}));

router.get('/:id/AllPhrases', asyncHandler(async (req, res, next) => {
  let result = await db.runProc('[dbo].[GetAllPhrasesInAText_sp]', [
    ['textid', sql.INT, req.params.id]
  ]);
  res.send({ recordset: result.recordset });
}));


router.post('/:id/addMetadata', asyncHandler(async (req, res, next) => {
  let result = await db.runProc('[dbo].[AddTextMetaData_sp]', [
    ['textid', sql.Int, req.params.id],
    ['key', sql.NVarChar(50), req.body.subjectKey],
    ['value', sql.NVarChar(250), req.body.subjectValue]
  ]);
  if (result.err)
    res.status(409).send({ err: result.err.originalError.info.message });
  else
    res.status(200).send({ returnValue: result.returnValue });
}));


router.post('/stepOne/CreateTextEntity/', asyncHandler(async (req, res, next) => {
  let title = req.body.title;
  //let path = req.body.path;
  //console.log(req.body);

  //let pool = await sql.connect(dbConfig);
  let result = await db.runProc('[dbo].[IngestNewTextMultyLevelProcess_StepOne_CreateTextEntity_sp]', [
    ['title', sql.NVarChar(250), title]
  ]);
  // .input('title', sql.NVarChar(250), title)
  // .execute('[dbo].[IngestNewTextMultyLevelProcess_StepOne_CreateTextEntity_sp]');
  //let id = result.recordset[0].id;

  res.send({ recordset: result.recordset });

  // if (path.includes('http://')) {
  //   getTextByHttp(title, path);
  //   console.log(12);
  // }
  // else {
  //   //TODO: getTextByFile
  // }

  // res.status(200).json({ title: 'start' });
}));


router.post('/stepTwo/addNewRow/', asyncHandler(async (req, res, next) => {

  let result = await db.runProc('[dbo].[IngestNewTextMultyLevelProcess_StepTwo_AddNewRow_sp]', [
    ['row', sql.NVarChar(sql.MAX), req.body.row],
    ['textid', sql.Int, req.body.textId]
  ]);

  // let pool = await sql.connect(dbConfig);
  // let result = await pool.request()
  //   .input('row', sql.NVarChar(sql.MAX), req.body.row)
  //   .input('textid', sql.INT, req.body.textId)
  //   .execute('[dbo].[IngestNewTextMultyLevelProcess_StepTwo_AddNewRow_sp]');

  res.send({ recordset: result.recordset });
}));

router.post('/stepThree/applyUDP/', asyncHandler(async (req, res, next) => {

  let result = await db.runProc('[dbo].[IngestNewTextMultyLevelProcess_StepThree_ApplyUDP_sp]', [
    ['textid', sql.Int, req.body.textId]
  ]);

  // let pool = await sql.connect(dbConfig);
  // let result = await pool.request()
  //   .input('textid', sql.INT, req.body.textId)
  //   .execute('[dbo].[IngestNewTextMultyLevelProcess_StepThree_ApplyUDP_sp]');

  res.send({ recordset: result.recordset });
}));

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

    });
  });
}

// putDb(title, text)
//         .then(() => console.log("success"), () => console.error("reject"));

// async function putDb(title, text) {

//   console.log("ID: " + id);

//   let tempSubText = "";

//   for (let i = 0; i < text.length; i++) {
//     tempSubText += text[i];

//     if (text[i] === String.fromCharCode(10) || text[i] === String.fromCharCode(13)) {
//       await pool.request()
//         .input('row', sql.NVarChar(sql.MAX), tempSubText)
//         .input('textid', sql.INT, id)
//         .execute('[dbo].[IngestNewTextMultyLevelProcess_StepTwo_AddNewRow_sp]');
//       console.log("{" + i + "}: " + tempSubText);
//       console.log("p:" + ((i / text.length) * 100).toFixed(2));
//       tempSubText = "";
//     }
//   }

//   await pool.request()
//     .input('textid', sql.INT, id)
//     .execute('[dbo].[IngestNewTextMultyLevelProcess_StepThree_ApplyUDP_sp]');

//   console.dir(result2);
//   pool.close();
// } catch (err) {
//   console.error(err);
//   pool.close();
// }
// }

module.exports = router;
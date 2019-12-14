const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../TextAnalysis.DAL/mssqlProvider');
const asyncHandler = require('express-async-handler');

router.get('/GetPhraseByRowLocation/:textId/:rowNum/:wordInRow', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[GetPhraseByRowLocation_sp]',[
        ['textid',sql.INT,req.params.textId],
        ['rownum',sql.INT,req.params.rowNum],
        ['wordinrow',sql.INT,req.params.wordInRow]
    ]);
    res.send({ recordset: result.recordset });
}));

router.get('/GetIndexForPhrase/:phrase/:textId', asyncHandler(async (req, res, next) => {
    let params = [
        ['phrase',sql.NVarChar(250),req.params.phrase]
    ];
    if(req.params.textId && req.params.textId !== "null") {
        params.push(['textid',sql.INT,req.params.textId]);
    }
    let result = await db.runProc('[dbo].[GetIndexForPhrase_sp]',params);
    res.send({ recordset: result.recordset });
}));



module.exports = router;
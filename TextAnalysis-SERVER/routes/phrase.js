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

router.get('/GetContextForPhrase/:phraseId/:wordsBackward/:wordsForward', asyncHandler(async (req, res, next) => {
    let params = [
        ['phraseId',sql.Int,req.params.phraseId],
        ['wordsbackward',sql.Int,req.params.wordsBackward],
        ['wordsforward',sql.Int,req.params.wordsForward]
    ];
    let result = await db.runProc('[dbo].[GetContextForPhrase_sp]',params);
    res.send({ recordset: result.recordset });
}));




module.exports = router;
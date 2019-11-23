const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../TextAnalysis.DAL/mssqlProvider');
const asyncHandler = require('express-async-handler');

router.get('/Phrase/:phrase', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[GetStatsForPhrase_sp]',[
        ['phrase', sql.NVarChar(250),req.params.phrase]
    ]);
    res.send({ recordset: result.recordset });
}));

router.get('/Row/:rownum/Text/:textId', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[GetStatsForRow_sp]',[
        ['rownum', sql.Int,req.params.rownum],
        ['textid', sql.Int,req.params.textId]
    ]);
    res.send({ recordset: result.recordset });
}));

module.exports = router;
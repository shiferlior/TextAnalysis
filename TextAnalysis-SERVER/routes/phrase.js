const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../TextAnalysis.DAL/mssqlProvider');
const asyncHandler = require('express-async-handler');

router.get('/:textId/:rowNum/:wordInRow', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[GetPhraseByRowLocation_sp]',[
        ['textid',sql.INT,req.params.textId],
        ['rownum',sql.INT,req.params.rowNum],
        ['wordinrow',sql.INT,req.params.wordInRow]
    ]);
    res.send({ recordset: result.recordset });
}));


module.exports = router;
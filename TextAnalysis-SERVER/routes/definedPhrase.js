const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../TextAnalysis.DAL/mssqlProvider');
const asyncHandler = require('express-async-handler');

router.get('/GetPhrasesDefinedByUser', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[GetPhrasesDefinedByUser_sp]',null);
    res.send({ recordset: result.recordset });
}));

router.get('/SearchPhrase/:phrase/:textId', asyncHandler(async (req, res, next) => {
    let params = [
        ['phrase',sql.NVarChar(250),req.params.phrase]
    ];
    if(req.params.textId && req.params.textId !== "null") {
        params.push(['textid',sql.INT,req.params.textId]);
    }
    let result = await db.runProc('[dbo].[SearchPhrase_sp]',params);
    res.send({ recordset: result.recordset });
}));

router.post('/newPhrase', asyncHandler(async (req, res, next) => {
    console.log(req.body);
    let result = await db.runProc('[dbo].[AddUserDefinedPhrase_sp]', [
        ['newphrase', sql.NVarChar(250), req.body.newPhrase]
    ]);
    res.send({ recordset: result.recordset });
}));

router.post('/:groupName', asyncHandler(async (req, res, next) => {
    console.log(213);
    let result = await db.runProc('[dbo].[CreateUserDefinedWordsGroup_sp]', [
        ['groupName', sql.NVarChar(50), req.params.groupName]
    ]);
    res.send({ recordset: result.recordset });
}));


router.get('/', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[GetUserDefinedGroupsList_sp]');
    res.send({ recordset: result.recordset });
}));

module.exports = router;
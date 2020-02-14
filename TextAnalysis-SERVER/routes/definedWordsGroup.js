const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../TextAnalysis.DAL/mssqlProvider');
const asyncHandler = require('express-async-handler');

router.post('/', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[CreateUserDefinedWordsGroup_sp]', [
        ['groupName', sql.NVarChar(50), req.body.groupName]
    ]);
    res.send({ recordset: result.recordset });
}));

router.post('/AddPhraseToUserDefinedGroup', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[AddPhraseToUserDefinedGroup_sp]', [
        ['Phrase', sql.NVarChar(250), req.body.phrase],
        ['groupid', sql.Int, req.body.phrasesGroupId]
    ]);
    res.send({ recordset: result.recordset });
}));

router.get('/', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[GetUserDefinedGroupsList_sp]');
    res.send({ recordset: result.recordset });
}));

router.delete('/DeleteAllUserDefinedWordsGroup', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[DeleteAllUserDefinedWordsGroup_sp]');
    res.send({ recordset: result.recordset });
}));

router.get('/:groupId/:textId', asyncHandler(async (req, res, next) => {
    let params = [
        ['groupid', sql.Int, req.params.groupId]
    ];
    if(req.params.textId && req.params.textId !== "null") {
        params.push(['textid',sql.INT,req.params.textId]);
    }
    let result = await db.runProc('[dbo].[GetUserDefinedGroupIndex_sp]',params);
    res.send({ recordset: result.recordset });
}));

module.exports = router;
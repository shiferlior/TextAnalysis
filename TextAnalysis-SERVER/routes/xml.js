const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../TextAnalysis.DAL/mssqlProvider');
const asyncHandler = require('express-async-handler');

router.get('/ExportIngestedTexts', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[ExportIngestedTexts_sp]',null);
    console.log(111);
    console.log(Object.keys(result.recordset[0])[0]);
    res.send(typeof(result.recordset[0][Object.keys(result.recordset[0])[0]]));
}));

router.get('/ExportUserDefinedGroups', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[ExportUserDefinedGroups_sp]',null);
    console.log(111);
    console.log(Object.keys(result.recordset[0])[0]);
    res.send(typeof(result.recordset[0][Object.keys(result.recordset[0])[0]]));
}));

router.get('/ExportUserDefinedPhrases', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[ExportUserDefinedPhrases_sp]',null);
    console.log(111);
    console.log(Object.keys(result.recordset[0])[0]);
    res.send(typeof(result.recordset[0][Object.keys(result.recordset[0])[0]]));
}));

router.post('/ExportUserDefinedPhrases', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[ExportUserDefinedPhrases_sp]',null);
    console.log(111);
    console.log(Object.keys(result.recordset[0])[0]);
    res.send(typeof(result.recordset[0][Object.keys(result.recordset[0])[0]]));
}));


module.exports = router;
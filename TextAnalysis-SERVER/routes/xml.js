const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../TextAnalysis.DAL/mssqlProvider');
const asyncHandler = require('express-async-handler');

router.get('/ExportIngestedTexts', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[ExportIngestedTexts_sp]',null);
    res.send({ recordset: result.recordset[0]});
}));

router.get('/ExportUserDefinedGroups', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[ExportUserDefinedGroups_sp]',null);
    res.send({ recordset: result.recordset[0]});
}));

router.get('/ExportUserDefinedPhrases', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[ExportUserDefinedPhrases_sp]',null);
    res.send({ recordset: result.recordset[0]});
}));

router.post('/ImportIngestedTexts', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[ImportIngestedTexts_sp]',[
        ['udpxml', sql.Xml, req.body.xml]
    ]);
    res.send(result.recordset);
}));

router.post('/ImportUserDefinedGroups', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[ImportUserDefinedGroups_sp]',[
        ['udpxml', sql.Xml, req.body.xml]
    ]);
    res.send(result.recordset);
}));

router.post('/ImportUserDefinedPhrases', asyncHandler(async (req, res, next) => {
    let result = await db.runProc('[dbo].[ImportUserDefinedPhrases_sp]',[
        ['udpxml', sql.Xml, req.body.xml]
    ]);
    res.send(result.recordset);
}));



module.exports = router;
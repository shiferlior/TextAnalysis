const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../TextAnalysis.DAL/mssqlProvider');
const asyncHandler = require('express-async-handler');

router.post('/:groupName', asyncHandler(async (req, res, next) => {
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
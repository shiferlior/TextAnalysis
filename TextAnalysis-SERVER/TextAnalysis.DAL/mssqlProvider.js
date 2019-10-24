const sql = require('mssql');
const dbConfig = require('../TextAnalysis.Config/database');

async function sqlRequest(procName, paramsArr) {
    let result;
    try {
      let pool = await sql.connect(dbConfig);
      let request = pool.request();
      if (paramsArr) {
        for (let input of paramsArr) {
          request = request.input(input[0], input[1], input[2]);
        }
      }
      result = await request.execute(procName);
    } catch (err) {
      result = { err: err };
    }
    finally {
      sql.close();
    }
    return result;
  }

  module.exports = {runProc: sqlRequest};
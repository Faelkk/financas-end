import dotenv from "dotenv";
dotenv.config();

const sql = require("mssql");

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: true, // for Azure
    enableArithAbort: true,
  },
};

export async function executeQuery(query: string) {
  try {
    await sql.connect(config);
    const result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    console.error("Erro ao executar consulta:", err);
    return null;
  } finally {
    await sql.close();
  }
}

import mysql from 'serverless-mysql'

export const db = mysql();

export async function query(
  q,
  values,
  database = 'empresa',
) {
  try {
    db.config({
      host: process.env.MYSQL_HOST,
      database,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      port: parseInt(process.env.MYSQL_PORT),
    });
    const results = await db.query(q, values)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}

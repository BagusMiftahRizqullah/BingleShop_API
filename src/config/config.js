require('dotenv').config()

module.exports = {
  // "development": {
  //       "username": process.env.DB_USER,
  //       "password": process.env.DB_PASSWORD,
  //       "database": process.env.DB_NAME,
  //       "host": process.env.DB_HOST,
  //       "dialect": process.env.DB_USER,
  //     }

    "development": {
        "username": "postgres",
        "password": "root",
        "database": "db_bingleshop_v1",
        "host": "localhost",
        "dialect": "postgres",
      }
}

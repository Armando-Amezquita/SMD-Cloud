require('dotenv').config();

module.exports = {
    MONGO_DBA: process.env.MONGO_DBA,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.PORT || 3000,
    SECRET: 'password'
}
import dotenv from 'dotenv';
dotenv.config();

export const db_config = {
    db_host: process.env.db_host,
    db_port: Number(process.env.db_port),
    db_user: process.env.db_user,
    db_password: process.env.db_password,
    db_database: process.env.db_database
}

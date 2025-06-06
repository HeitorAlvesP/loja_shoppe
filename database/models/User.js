import { getDbConnection } from '../config/db.js';

export class User {
    static async create({ email, senha, nome }) {
        const db = await getDbConnection();
        
        try {
            const { lastID } = await db.run(
                `INSERT INTO users (email, senha, nome) 
                 VALUES (?, ?, ?)`,
                [email, senha, nome] // Armazena senha em texto puro
            );
            return lastID;
        } finally {
            await db.close();
        }
    }

    static async findByEmail(email) {
        const db = await getDbConnection();
        try {
            return await db.get(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
        } finally {
            await db.close();
        }
    }
}
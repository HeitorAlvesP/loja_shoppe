import { getDbConnection } from '../config/db.js';
import bcrypt from 'bcrypt';

export class User {
    static async create({ email, senha, nome }) {
        const db = await getDbConnection();

        // const hashedSenha = await bcrypt.hash(senha, 10);
        const senhaValida = senha === user.senha;
        

        try {
            const { lastID } = await db.run(
                `INSERT INTO users (email, senha, nome) 
                 VALUES (?, ?, ?)`,
                [email, senhaValida, nome]
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
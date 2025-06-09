import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getDbConnection() {
    return open({
        filename: path.join(__dirname, '../database.sqlite'),
        driver: sqlite3.Database
    });
}

export async function initDb() {
    const db = await getDbConnection();
    
    try {

        console.log('🟢 Conectado ao banco de dados!');

        const tableInfo = await db.get(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='users'"
        );
        if (!tableInfo) {
            await db.exec(`
                CREATE TABLE users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT,
                    email TEXT UNIQUE NOT NULL,
                    senha TEXT NOT NULL,
                    tipo INTEGER NOT NULL DEFAULT 2,
                    Dtinc TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log('✅ Tabela users criada com sucesso');
        }

        const { count } = await db.get(
            "SELECT COUNT(*) as count FROM users"
        );
        if (count === 0) {
            const insertedAdm = await db.run(
                `INSERT INTO users (nome, email, senha, tipo)
                 VALUES (?, ?, ?, ?)`,
                ['Heitor Alves', 'heitor@gmail.com', 'h123', 1]
            );
            const insertedUser = await db.run(
                `INSERT INTO users (nome, email, senha, tipo)
                 VALUES (?, ?, ?, ?)`,
                ['User Teste', 'a@gmail.com', 't123', 2]
            );
            if (insertedAdm.changes > 0 && insertedUser.changes > 0) {
                console.log('✅ Usuários padrão criados');
            }
        }

    } catch (error) {
        console.error('🔴 Erro na inicialização do banco:', error);
    } finally {
        await db.close();
    }
}
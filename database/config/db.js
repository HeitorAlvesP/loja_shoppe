import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getDbConnection() {
    return open({
        filename: path.join(__dirname, '../database.sqlite'), // Caminho corrigido
        driver: sqlite3.Database
    });
}

export async function initDb() {
    const db = await getDbConnection();
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL,
            tipo INTEGER NOT NULL DEFAULT 2, -- 1=ADM, 2=Usuário normal
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log('✅ Tabela users criada!');

    try {
        await db.run(`
            INSERT OR IGNORE INTO users (nome, email, senha, tipo)
            VALUES (?, ?, ?, ?)
        `, ['Heitor Alves', 'heitor@gmail.com', 'h123', 1]);

        await db.run(`
            INSERT OR IGNORE INTO users (nome, email, senha, tipo)
            VALUES (?, ?, ?, ?)
        `, ['User Teste', 'a@gmail.com', 't123', 2]);

        console.log('✅ Usuários padões criados')
    } catch (error) {
        console.error('Erro ao inserir usuários padrão:', error);
    } finally {
        await db.close();
    }
}
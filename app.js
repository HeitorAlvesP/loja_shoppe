import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './database/config/db.js';
import { loginUser } from './backend/controllers/loginController.js';
import { registerUser } from './backend/controllers/registrarController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'frontend', 'public')));
app.use(express.static(path.join(__dirname, 'frontend')));


const serveHtml = (fileName) => {
    return (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'html', fileName));
    };
};

app.get('/', serveHtml('index.html'));
app.get('/login', serveHtml('login.html'));
app.get('/registrar', serveHtml('cadastro_login.html'));
app.get('/senha', serveHtml('esqueceu_senha.html'));

app.post('/api/login', loginUser);


(async () => {
    await initDb();
    
    // Rotas
    app.post('/api/login', loginUser);
    app.post('/api/register', registerUser);

    app.listen(3000, () => {
        console.log('🚀 Servidor rodando em http://localhost:3000');
        console.log('📊 Banco de dados pronto');
    });
})();
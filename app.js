import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

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


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
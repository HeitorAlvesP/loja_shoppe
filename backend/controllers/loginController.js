//SIMULANDO DB

export const loginUser = (req, res) => {
    // Adicione um log para debug
    console.log("Recebido:", req.body);
    
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: "Dados inválidos!" });
    }

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    res.json({ success: true, message: "Login realizado com sucesso!" });
};
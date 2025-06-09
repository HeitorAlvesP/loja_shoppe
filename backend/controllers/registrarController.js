import { User } from '../../database/models/User.js'; // Caminho corrigido

export const registerUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Validação básica
        if (!nome || !email || !senha) {
            console.log('Dados recebidos:', req.body); // Debug
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        // Verifica e-mail existente
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: "E-mail já cadastrado" });
        }

        // Cria usuário
        await User.create({ nome, email, senha });
        
        res.status(201).json({ 
            success: true,
            message: "Usuário registrado com sucesso"
        });

    } catch (error) {
        console.error("Erro no registro:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
};
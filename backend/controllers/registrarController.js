import { User } from '../../database/models/User.js'; // Caminho corrigido

export const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Validação de email
        if (!email.includes('@')) {
            return res.status(400).json({ error: "Email inválido" });
        }

        // Verifica se usuário já existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: "Email já cadastrado" });
        }

        // Cria usuário (senha em texto puro)
        const userId = await User.create({
            nome: nome.toUpperCase(),
            email,
            senha // Sem hash
        });

        res.status(201).json({
            success: true,
            message: "Usuário registrado com sucesso",
            userId
        });

    } catch (error) {
        console.error("Erro no registro:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
};
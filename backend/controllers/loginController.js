import { User } from '../../database/models/User.js'; // Caminho ajustado
import bcrypt from 'bcrypt'

export const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        // const senhaValida = await bcrypt.compare(senha, user.senha);
        const senhaValida = senha === user.senha;

        if (!senhaValida) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        // Remove a senha antes de enviar a resposta
        const { senha: _, ...userData } = user; 
        res.json({ success: true, user: userData });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
};
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector('.btn');
    const inputs = document.querySelectorAll('.input-box input');
    const nome = inputs[0];
    const email = inputs[1];
    const senha = inputs[2];
    const confirmarSenha = inputs[3];

    // Converter nome para maiúsculas (mantido)
    nome.addEventListener('input', () => {
        nome.value = nome.value.toUpperCase();
    });

    // Toda a lógica deve estar DENTRO deste listener
    btn.addEventListener('click', async (e) => {
        e.preventDefault();

        // 1. Validações de campos vazios
        if (!nome.value.trim() || !email.value.trim() || !senha.value || !confirmarSenha.value) {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção',
                text: 'Preencha todos os campos!'
            });
            return;
        }

        // 2. Validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Email inválido',
                text: 'Digite um email válido.'
            });
            return;
        }

        // 3. Validação de senha
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!senhaRegex.test(senha.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Senha inválida',
                html: `A senha deve conter:<br>- 1 letra maiúscula<br>- 1 minúscula<br>- 1 número<br>- Mínimo 8 caracteres`
            });
            return;
        }

        // 4. Confirmação de senha
        if (senha.value !== confirmarSenha.value) {
            Swal.fire({
                icon: 'error',
                title: 'Senhas diferentes',
                text: 'As senhas não coincidem.'
            });
            return;
        }

        // 5. Só faz a requisição SE passar por todas as validações
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome.value.trim(),
                    email: email.value.trim(),
                    senha: senha.value // Não usar trim() na senha
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro no cadastro");
            }

            await Swal.fire({
                icon: 'success',
                title: 'Cadastro realizado!',
                text: 'Vamos lá!',
                timer: 1500
            });
            
            window.location.href = "/";

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro no cadastro',
                text: error.message
            });
        }
    });
});
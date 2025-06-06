document.addEventListener("DOMContentLoaded", async () => {
    const btn = document.querySelector('.btn');
    const inputs = document.querySelectorAll('.input-box input');

    const nome = inputs[0];
    const email = inputs[1];
    const senha = inputs[2];
    const confirmarSenha = inputs[3];

    nome.addEventListener('input', () => {
        nome.value = nome.value.toUpperCase();
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();

        if (
            nome.value.trim() === '' ||
            email.value.trim() === '' ||
            senha.value.trim() === '' ||
            confirmarSenha.value.trim() === ''
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção',
                text: 'Preencha todos os campos!'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Email inválido',
                text: 'Digite um email válido.'
            });
            return;
        }

        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!senhaRegex.test(senha.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Senha inválida',
                html: `
                    A senha deve conter pelo menos:<br>
                    - 1 letra maiúscula<br>
                    - 1 letra minúscula<br>
                    - 1 número<br>
                    - Mínimo 8 caracteres
                `
            });
            return;
        }

        if (senha.value !== confirmarSenha.value) {
            Swal.fire({
                icon: 'error',
                title: 'Senhas diferentes',
                text: 'As senhas não coincidem.'
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado!',
            text: 'Seu cadastro foi feito com sucesso!'
        }).then(() => {
            window.location.href = "/"
        });
    });
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: nome.value,
                email: email.value,
                senha: senha.value // Envia texto puro
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erro no cadastro");
        }

        await Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado!',
            text: data.message
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
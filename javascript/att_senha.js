function sendCode() {
    const email = document.getElementById('email').value.trim();

    if (email === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campo obrigatório',
            text: 'Informe o email, por gentileza.',
        });
        return;
    }

    if (!email.includes('@')) {
        Swal.fire({
            icon: 'info',
            title: 'Email inválido',
            text: 'Verifique se o email está digitado correto.',
        });
        return;
    }


    console.log("Código enviado para:", email);

    Swal.fire({
        icon: 'success',
        title: 'Código enviado!',
        text: `O código foi enviado para o email: ${email}`,
        timer: 2500,
        showConfirmButton: false
    });
    
    document.getElementById('email-box').classList.add('hidden');
    document.getElementById('send-code-btn').classList.add('hidden');

    document.getElementById('code-box').classList.remove('hidden');
    document.getElementById('confirm-code-btn').classList.remove('hidden');
}


function confirmCode() {
    const code = document.getElementById('verification-code').value.trim();

    if (code == "") {
        Swal.fire({
            icon: 'error',
            title: 'Código inválido',
            text: 'Digite o código, por gentileza'
        });
        return;
    }else if (code.length !== 5) {
        Swal.fire({
            icon: 'info',
            title: 'Código inválido',
            text: 'Verifique se o código está digitado correto.',
        });
        return;
    }

    console.log("Código confirmado:", code);

    Swal.fire({
        icon: 'success',
        title: 'Código Validado!',
        text: `Atualize sua senha`,
        timer: 2500,
        showConfirmButton: false
    });

    document.getElementById('code-box').classList.add('hidden');
    document.getElementById('confirm-code-btn').classList.add('hidden');

    document.getElementById('password-fields').classList.remove('hidden');
    document.getElementById('reset-password-btn').classList.remove('hidden');
}


function validatePasswords() {
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const minLength = /.{8,}/;
    const hasUpper = /[A-Z]/;
    const hasLower = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecial = /[\W_]/;

    if (password === "" || confirmPassword === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campos vazios',
            text: 'Preencha ambos os campos de senha.',
        });
        return;
    }

    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Senhas diferentes',
            text: 'As senhas digitadas não são iguais.',
        });
        return;
    }

    if (!minLength.test(password)) {
        Swal.fire({
            icon: 'warning',
            title: 'Senha fraca',
            text: 'A senha deve conter no mínimo 8 caracteres.',
        });
        return;
    }

    if (!hasUpper.test(password)) {
        Swal.fire({
            icon: 'warning',
            title: 'Letra maiúscula ausente',
            text: 'A senha deve conter pelo menos uma letra maiúscula.',
        });
        return;
    }

    if (!hasLower.test(password)) {
        Swal.fire({
            icon: 'warning',
            title: 'Letra minúscula ausente',
            text: 'A senha deve conter pelo menos uma letra minúscula.',
        });
        return;
    }

    if (!hasNumber.test(password)) {
        Swal.fire({
            icon: 'warning',
            title: 'Número ausente',
            text: 'A senha deve conter pelo menos um número.',
        });
        return;
    }

    if (!hasSpecial.test(password)) {
        Swal.fire({
            icon: 'warning',
            title: 'Caractere especial ausente',
            text: 'A senha deve conter pelo menos um caractere especial.',
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Senha atualizada!',
        text: 'Sua senha foi redefinida com sucesso.',
    }).then(() => {
        window.location.href = 'login.html';
    });;

    // Aqui você pode adicionar o envio da nova senha para o backend
}
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // impede o envio do form por enquanto

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Caso 1: Campos vazios
    if (!email || !senha) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos obrigatórios!',
            text: 'Preencha todos os campos.',
        });
        return;
    }

    // Simulando sucesso (sem backend)
    Swal.fire({
        icon: 'success',
        title: 'Login realizado com sucesso!',
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
        window.location.href = 'index.html'; // Redireciona após sucesso
    });
});
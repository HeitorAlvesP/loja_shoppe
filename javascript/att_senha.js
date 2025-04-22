function sendCode() {
    const email = document.getElementById('email').value.trim();
    if (email === "") {
        alert("Digite um e-mail válido.");
        return;
    }

    console.log("Código enviado para:", email);

    
    document.getElementById('email-box').classList.add('hidden');
    document.getElementById('send-code-btn').classList.add('hidden');

    document.getElementById('code-box').classList.remove('hidden');
    document.getElementById('confirm-code-btn').classList.remove('hidden');
}

function confirmCode() {
    const code = document.getElementById('verification-code').value.trim();

    if (code.length !== 5) {
        alert("Código inválido. Insira os 5 dígitos do código.");
        return;
    }

    console.log("Código confirmado:", code);

    document.getElementById('code-box').classList.add('hidden');
    document.getElementById('confirm-code-btn').classList.add('hidden');

    document.getElementById('password-fields').classList.remove('hidden');
    document.getElementById('reset-password-btn').classList.remove('hidden');
}
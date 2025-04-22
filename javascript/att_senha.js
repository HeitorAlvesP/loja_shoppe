function showPasswordFields() {
    const codeInput = document.getElementById('verification-code');
    const passwordFields = document.getElementById('password-fields');
    if (codeInput.value.trim().length === 5) {
        passwordFields.classList.remove('hidden');
    } else {
        passwordFields.classList.add('hidden');
    }
}
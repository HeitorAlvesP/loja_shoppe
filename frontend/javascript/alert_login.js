const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // impede o envio do form por enquanto

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    //Apenas confere os valores que estão chegando
    if (!email || !senha) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos obrigatórios!',
            text: 'Preencha todos os campos.',
        });
        return;
    }

    //enviando infor para o backend
    try {
        //criada a rota do backend /api
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        //Só para conferir se pe um json
        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error("Resposta não é JSON");
        }

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Erro no login");

        Swal.fire({ icon: 'success', title: 'Login realizado', timer: 1500 })
            .then(() => window.location.href = '/');
    } catch (error) {
        Swal.fire({ 
            icon: 'error', 
            title: 'Erro', 
            text: error.message.includes('JSON') 
                ? "Servidor retornou resposta inválida" 
                : error.message 
        });
    }

});
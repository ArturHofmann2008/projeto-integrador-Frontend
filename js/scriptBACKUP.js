document.addEventListener("DOMContentLoaded", () => {

    const API = 'http://localhost:3000'

    const formLogin = document.getElementById('formLogin')
    const formCadastro = document.getElementById('formCadastro')

    if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const botao = formLogin.querySelector("button");
        botao.disabled = true;

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
            const res = await fetch(`${API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            })

            const data = await res.json();

            alert("Login realizado!");

            if (res.status == 200) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email);
                window.location.href = 'index.html'
            }

            botao.disabled = false;

        } catch (err) {
            alert('Erro ao efetuar o Login!\nTente novamente mais tarde!');
            console.error(err);
            botao.disabled = false;
        }
    })
}

   if (formCadastro) {
    formCadastro.addEventListener('submit', async (e) => {
        e.preventDefault();

        const botao = formCadastro.querySelector("button");
        botao.disabled = true;

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {

            const res = await fetch(`${API}/usuarios`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha })
            })

            const data = await res.json();

            alert(data.mensagem);

            botao.disabled = false;

        } catch (err) {
            alert('Erro ao efetuar cadastro!');
            console.error(err);

            botao.disabled = false;
        }
    })
}
    if (window.location.pathname.includes("index.html")) {
        if (!localStorage.getItem('token')) {
            alert('Você não está logado! Faça o login!');
            window.location.href = '/index.html'

        }

        const user = document.getElementById('user');
        user.style.color = 'green';
        user.innerHTML = localStorage.getItem('email');

        
    }

})
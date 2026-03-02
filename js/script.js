document.addEventListener("DOMContentLoaded", () => {
    const API = 'http://localhost:3000';

    // LOGIN
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                const res = await fetch(`${API}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, senha })
                });
                const data = await res.json();

                if (res.status == 200) {
                    alert('Login realizado com sucesso!');
                    localStorage.setItem('token', data.token.token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('isLogged', true);
                    window.location.href = 'index.html';
                } else {
                    alert(data.mensagem || 'Erro no login');
                }
            } catch (err) {
                alert('Erro ao efetuar o Login! Tente novamente mais tarde!');
                console.error(err);
            }
        });
    }

    // CADASTRO
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();
            const botao = formCadastro.querySelector('button');
            botao.disabled = true;
            botao.textContent = 'Cadastrando...';

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                const res = await fetch(`${API}/usuarios`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome, email, senha })
                });

                const data = await res.json();

                if (res.status === 201) {
                    alert('✅ Cadastro realizado com sucesso!');
                    window.location.href = 'login.html';
                } else if (res.status === 409) {
                    alert('⚠️ ' + data.mensagem);
                    document.getElementById('email').value = '';
                    document.getElementById('email').focus();
                } else {
                    alert('❌ ' + (data.mensagem || 'Erro no cadastro'));
                }
            } catch (err) {
                alert('❌ Erro de conexão com o servidor! Verifique se o backend está rodando.');
                console.error(err);
            } finally {
                botao.disabled = false;
                botao.textContent = 'Cadastrar';
            }
        });
    }

    // LOGOUT
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('isLogged');
            window.location.href = 'login.html';
        });
    }

    // VERIFICAÇÃO DE LOGIN (só para páginas protegidas)
    if (window.location.pathname.includes("index.html") || window.location.pathname.includes("pedido.html")) {
        if (!localStorage.getItem('isLogged')) {
            alert('Você não está logado! Faça o login!');
            window.location.href = 'login.html';
        }
    }
});
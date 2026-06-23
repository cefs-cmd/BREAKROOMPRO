// CARLOS EDUARDO
// Sistema de usuários (admin tbm)
        const usuarios = [
            {
                email: "admin@gmail.com",
                senha: "admin123",
                tipo: "admin",
                pagina: "admin.html" // Página onde ele vai gerenciar estoque
            },
            {
                email: "cadu@gmail.com",
                senha: "cadu123",
                tipo: "usuario",
                pagina: "inicio.html" // Página de agendamento normal
            }
            
        ];

        // Mostrar / Ocultar senha
        document.getElementById('mostrarSenha').addEventListener('click', function() {
            const inputSenha = document.getElementById('password');
            if (inputSenha.type === 'password') {
                inputSenha.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                inputSenha.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });

        // Função de Login
        document.getElementById('formLogin').addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o recarregamento da página

            const emailDigitado = document.getElementById('email').value.trim();
            const senhaDigitada = document.getElementById('password').value.trim();
            const mensagem = document.getElementById('mensagem');

            // Procurar usuário na lista
            const usuarioEncontrado = usuarios.find(user => user.email === emailDigitado && user.senha === senhaDigitada);

            if (usuarioEncontrado) {
                // Login correto
                mensagem.style.display = 'block';
                mensagem.style.color = '#28a745';
                mensagem.innerText = `Bem-vindo, ${usuarioEncontrado.tipo === 'admin' ? 'Administrador' : 'Usuário'}! Redirecionando...`;
                
                // Salvar dados do usuário na memória do navegador (para usar na página seguinte)
                localStorage.setItem("usuarioTipo", usuarioEncontrado.tipo);
                localStorage.setItem("usuarioEmail", usuarioEncontrado.email);

                // Redireciona para a página correspondente após 1 segundo
                setTimeout(() => {
                    window.location.href = usuarioEncontrado.pagina;
                }, 1000);

            } else {
                // Dados incorretos
                mensagem.style.display = 'block';
                mensagem.style.color = '#dc3545';
                mensagem.innerText = 'E-mail ou senha incorretos!';
            }
        });
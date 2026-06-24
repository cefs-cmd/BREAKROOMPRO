 // msotrar e ocultar senha
   // Pegar todos os ícones de olho "queryselectorall"
const botoesMostrarSenha = document.querySelectorAll(".toggle-password");

// Percorre cada botão
botoesMostrarSenha.forEach(botao => {
    botao.addEventListener("click", function() {
        // Busca o campo de senha que está dentro do mesmo "wrapper" do ícone clicado
        const campo = this.parentElement.querySelector("input[type='password'], input[type='text']");
    //logica do if
        if (campo.type === "password") {
            campo.type = "text";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        } else {
            campo.type = "password";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }
    });
});
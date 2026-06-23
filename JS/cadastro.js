// Kaun alexssandre e Carlos Eduardo (quebramos a cabeça com os detalhes juntos)
document.addEventListener("DOMContentLoaded", () => {


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

    // VALIDAÇÃO DO GMAIL
    const email = document.getElementById("email");
    if (email) {
        email.addEventListener("blur", () => {
            const valor = email.value.trim().toLowerCase();
            if (valor !== "" && !valor.endsWith("@gmail.com")) {
                alert("Apenas e-mails @gmail.com são aceitos!");
                email.value = "";
                email.focus();
            }
        });
    }


    // MÁSCARA DO CPF (11 DÍGITOS)
    const cpf = document.getElementById("cpf");
    if (cpf) {
        cpf.addEventListener("input", (e) => {
            let num = e.target.value.replace(/\D/g, ""); // Mantém só números
            if (num.length > 11) num = num.slice(0, 11);  // Trava em 11 dígitos
            
            // Formato: 000.000.000-00
            num = num.replace(/(\d{3})(\d)/, "$1.$2");
            num = num.replace(/(\d{3})(\d)/, "$1.$2");
            num = num.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            e.target.value = num;
        });
    }


    // MÁSCARA DO TELEFONE (11 DÍGITOS)
    const telefone = document.getElementById("telefone");
    if (telefone) {
        telefone.addEventListener("input", (e) => {
            let num = e.target.value.replace(/\D/g, ""); // Mantém só números
            if (num.length > 11) num = num.slice(0, 11);  // Trava em 11 dígitos
            
            // Formato: (DD) 90000-0000
            num = num.replace(/^(\d{2})(\d)/g, "($1) $2");
            num = num.replace(/(\d{5})(\d)/, "$1-$2");
            e.target.value = num;
        });
    }
});
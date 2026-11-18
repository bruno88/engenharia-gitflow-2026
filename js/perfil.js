document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("#form-perfil");

    if (!formulario) {
        return;
    }

    // Recupera um objeto salvo no navegador.
    function lerDados(chave) {
        try {
            return JSON.parse(localStorage.getItem(chave));
        } catch {
            return null;
        }
    }

    const usuarioLogado = lerDados("usuarioLogado");

    // Sem um usuário identificado, volta para o login.
    /*if (!usuarioLogado || usuarioLogado.id == null) {
        window.location.href = "login.html";
        return;
    }*/

    // Cada usuário possui seus próprios dados de perfil.
    const chavePerfil = `perfil_${usuarioLogado.id}`;

    const campos = [
        "nome",
        "email",
        "telefone",
        "dataNascimento",
        "cidade",
        "estado"
    ];

    // Os dados do perfil complementam os dados recebidos no login.
    const dadosPerfil = {
        ...usuarioLogado,
        ...lerDados(chavePerfil)
    };

    // Preenche os campos quando a página é aberta.
    campos.forEach(function (campo) {
        formulario.elements.namedItem(campo).value =
            dadosPerfil[campo] ?? "";
    });

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const dadosAtualizados = {};

        // Lê os campos e remove espaços no começo e no final.
        campos.forEach(function (campo) {
            const input = formulario.elements.namedItem(campo);

            input.value = input.value.trim();
            dadosAtualizados[campo] = input.value;
        });

        // Confere as regras definidas no HTML.
        if (!formulario.reportValidity()) {
            return;
        }

        const telefone = dadosAtualizados.telefone.replace(/\D/g, "");

        if (telefone && !/^\d{10,11}$/.test(telefone)) {
            alert("Informe um telefone com DDD e 10 ou 11 dígitos.");
            formulario.elements.namedItem("telefone").focus();
            return;
        }

        dadosAtualizados.telefone = telefone;
        dadosAtualizados.estado = dadosAtualizados.estado.toUpperCase();

        try {
            localStorage.setItem(
                chavePerfil,
                JSON.stringify(dadosAtualizados)
            );

            alert("Dados do perfil salvos com sucesso!");
        } catch {
            alert("Não foi possível salvar os dados. Tente novamente.");
        }
    });
});
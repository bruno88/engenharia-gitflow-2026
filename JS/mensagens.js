const listaMensagens = document.querySelector("#lista-mensagens");

function carregarMensagens() {
    try {
        const dadosSalvos = localStorage.getItem("mensagens");
        const mensagens = dadosSalvos === null ? [] : JSON.parse(dadosSalvos);

        if (mensagens.length === 0) {
            listaMensagens.textContent = "Nenhuma mensagem recebida ainda.";
            return;
        }

        for (const envio of mensagens) {
            const cartao = document.createElement("article");
            cartao.className = "cartao-mensagem";

            const nome = document.createElement("h2");
            nome.textContent = envio.nome;

            const email = document.createElement("p");
            email.textContent = `E-mail: ${envio.email}`;

            const mensagem = document.createElement("p");
            mensagem.className = "texto-mensagem";
            mensagem.textContent = envio.mensagem;

            cartao.append(nome, email, mensagem);
            listaMensagens.append(cartao);
        }
    } catch {
        listaMensagens.textContent = "Não foi possível carregar as mensagens salvas.";
    }
}

carregarMensagens();
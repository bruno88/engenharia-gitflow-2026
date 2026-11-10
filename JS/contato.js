const formulario = document.querySelector("#form-contato");
document.querySelector("#fechar-aviso").addEventListener("click", function () { aviso.close(); });
const titulo = document.querySelector("#aviso-titulo");
const texto = document.querySelector("#aviso-texto");

function mostrarAviso(tituloAviso, textoAviso) {
    titulo.textContent = tituloAviso;
    texto.textContent = textoAviso;
    aviso.showModal();
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const mensagem = document.querySelector("#mensagem").value.trim();

    if (!nome || !email || !mensagem) {
        mostrarAviso("Falta preencher um campo", "Confira seu nome, e-mail e mensagem.");
        return;
    }
    formulario.reset();
    mostrarAviso("Formulário preenchido!", `Tudo certo, ${nome}.`);
});
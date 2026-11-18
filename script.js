import { Veiculo } from "./Veiculo.js";

const formCadastroVeiculo = document.getElementById("formCadastroVeiculo");
const inImg = document.getElementById("inImg");
const inMarca = document.getElementById("inMarca");
const inModelo = document.getElementById("inModelo");
const inAno = document.getElementById("inAno");
const inDescricao = document.getElementById("inDescricao");

formCadastroVeiculo.addEventListener('submit', cadastrarVeiculo);

export function cadastrarVeiculo(event) {
    event.preventDefault();

    const novoVeiculo = new Veiculo(inMarca.value, inModelo.value, inAno.value, inImg.src, inDescricao.value);

    const veiculosCadastrados = JSON.parse(localStorage.getItem('veiculos')) || [];

    veiculosCadastrados.push(novoVeiculo);

    localStorage.setItem('veiculos', JSON.stringify(veiculosCadastrados));
}

export function excluirVeiculo(id) {
    const vetVeiculosCadastrados = JSON.parse(localStorage.getItem('veiculos')) || []; //para ler o local storage

    let existe = vetVeiculosCadastrados.findIndex((veiculos) => veiculos.id == id);

    if (existe === -1) {
        console.log(" id não encontrado")
    }

    vetVeiculosCadastrados.splice(existe, 1);

    localStorage.setItem('veiculos', JSON.stringify(vetVeiculosCadastrados));

    console.log(`Excluido o veiculo do id: ${existe.id}`);
    /* getItem + JSON.parse  →  minhas modificações  →  JSON.stringify + setItem
       (ler)                          (excluir)                       (salvar) */
}
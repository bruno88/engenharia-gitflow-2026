import { Veiculo } from "./Veiculo.js";

const formCadastroVeiculo = document.getElementById("formCadastroVeiculo");
const inImg = document.getElementById("inImg");
const inMarca = document.getElementById("inMarca");
const inModelo = document.getElementById("inModelo");
const inAno = document.getElementById("inAno");
const inDescricao = document.getElementById("inDescricao");

formCadastroVeiculo.addEventListener('submit', cadastrarVeiculo);

function cadastrarVeiculo(event){
    event.preventDefault();

    const novoVeiculo = new Veiculo(inMarca.value, inModelo.value, inAno.value, inImg.src, inDescricao.value);

    const veiculosCadastrados = JSON.parse(localStorage.getItem('veiculos')) || [];

    veiculosCadastrados.push(novoVeiculo);

    localStorage.setItem('veiculos', JSON.stringify(veiculosCadastrados));
}
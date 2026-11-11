const inMarca = document.getElementById('inMarca');
const inModelo = document.getElementById('inModelo');
const btFiltrar = document.getElementById('btFiltrar');
const btLimpar = document.getElementById('btLimpar');

/* const vetorTeste = [
    {marca: 'honda', modelo: 'cg160'},
    {marca: 'honda', modelo: 'fz250'},
    {marca: 'bajaj', modelo: 'd400'},
    {marca: 'bajaj', modelo: 'd250'},
    {marca: 'royal enfield', modelo: 'b350'},
];
 */
export function filtrar(_marca, _modelo){

     const veiculosCadastrados = JSON.parse(localStorage.getItem('veiculos')) || []; // VETOR DO LOCALSTORAGE

    let veiculos = veiculosCadastrados.filter(veiculo => 
           (veiculo.marca == _marca && veiculo.modelo == _modelo)   // os dois preenchidos
        || (_marca == "" && veiculo.modelo == _modelo)          // somente modelo preenchido
        || (veiculo.marca == _marca &&  _modelo== ""))         // somente marca preenchido
        || (_marca == "" && _modelo == "");                // se os campos forem vazios, vai retornar true então todos carros são true

    let txtFormatado = veiculos.map(veiculo => `veiculo da marca: ${veiculo.marca} e modelo: ${veiculo.modelo}`).join("\n"); //tava usando forEach porem ele SEMPRE retorna undefined, o certo é map

    if (veiculos.length == 0) {
        console.log("modelo ou marca não encontrados");
    }else{

        console.log(txtFormatado);
    }

}

btFiltrar.addEventListener('click', () => {
    filtrar(inMarca.value, inModelo.value);
});
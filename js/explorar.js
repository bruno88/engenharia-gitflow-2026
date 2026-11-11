const inMarca = document.getElementById('inMarca');
const inModelo = document.getElementById('inModelo');
const btFiltrar = document.getElementById('btFiltrar');
const btLimpar = document.getElementById('btLimpar');

const vetorTeste = [
    {marca: 'honda', modelo: 'cg160'},
    {marca: 'honda', modelo: 'fz250'},
    {marca: 'bajaj', modelo: 'd400'},
    {marca: 'bajaj', modelo: 'd250'},
    {marca: 'royal enfield', modelo: 'b350'},
];

export function filtrar(_marca, _modelo){

    let motos = vetorTeste.filter(moto => (moto.marca == _marca && moto.modelo == _modelo) || (_marca == "" && moto.modelo == _modelo) || (moto.marca == _marca &&  _modelo== ""));
    let txtFormatado = motos.map(moto => `Moto da marca: ${moto.marca} e modelo: ${moto.modelo}`).join("\n"); //tava usando forEach porem ele SEMPRE retorna undefined, o certo é map

    if (motos.length == 0) {
        console.log("modelo ou marca não encontrados");
    }else{

        console.log(txtFormatado);
    }

}

btFiltrar.addEventListener('click', () => {
    filtrar(inMarca.value, inModelo.value);
});
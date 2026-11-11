export class Veiculo{
    marca;
    modelo;
    ano;
    imagem;
    descricao;

    constructor(marca, modelo, ano, imagem, descricao){
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.imagem = imagem;
        this.descricao = descricao;
    }

    get marca(){
        return this.marca;
    }

    set marca(novaMarca){
        this.marca = novaMarca;
    }

    get modelo(){
        return this.modelo;
    }

    set modelo(novoModelo){
        this.modelo = novoModelo;
    }

    get ano(){
        return this.ano;
    }

    set ano(novoAno){
        this.ano = novoAno;
    }

    get imagem(){
        return this.imagem;
    }

    set imagem(novaImagem){
        this.imagem = novaImagem;
    }

    get descricao(){
        return this.descricao;
    }

    set descricao(novaDescricao){
        this.descricao = novaDescricao;
    }
}
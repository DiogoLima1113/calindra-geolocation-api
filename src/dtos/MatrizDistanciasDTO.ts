import IDistancia from "../interfaces/IDistancia";
import IEndereco from "../interfaces/IEndereco";
import DistanciaDTO from "./DistanciaDTO";
import EnderecoDTO from "./EnderecoDTO";

class MatrizDistanciasDTO {
    public enderecos: EnderecoDTO[];
    public menorDistancia: DistanciaDTO;
    public maiorDistancia: DistanciaDTO;

    constructor(enderecos: IEndereco[], menorDistancia: IDistancia, maiorDistancia: IDistancia) {
        this.enderecos = enderecos.map(e => new EnderecoDTO(e));
        this.menorDistancia = new DistanciaDTO(menorDistancia);
        this.maiorDistancia = new DistanciaDTO(maiorDistancia);
    }
}

export default MatrizDistanciasDTO;
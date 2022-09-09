import IDistancia from "./IDistancia";

interface IEndereco {
    endereco: string;
    longitude?: number;
    latitude?: number;
    distancias?: IDistancia[];
}

export default IEndereco;
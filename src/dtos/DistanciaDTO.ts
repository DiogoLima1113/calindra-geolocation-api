import IDistancia from "../interfaces/IDistancia";

class DistanciaDTO implements IDistancia {
    public origem: string;
    public destino: string;
    public distancia: string;
    public tempo: string;

    constructor(obj: IDistancia) {
        this.origem = obj.origem;
        this.destino = obj.destino;
        this.distancia = obj.distancia;
        this.tempo = obj.tempo;
    }
}

export default DistanciaDTO;
import IDistancia from "../interfaces/IDistancia";

class Distancia implements IDistancia {
    public origem: string;
    public destino: string;
    public distancia: string;
    public tempo: string;
    public distanciaMetros?: number;

    constructor();
    constructor(obj?: IDistancia);
    constructor(obj?: { origem: string; destino: string; distancia: string; tempo: string; distanciaMetros: number | undefined; });
    
    constructor(obj?: { origem: string; destino: string; distancia: string; tempo: string; distanciaMetros: number | undefined; }){
        this.origem = obj?.origem || '';
        this.destino = obj?.destino || '';
        this.distancia = obj?.distancia || '';
        this.tempo = obj?.tempo || '';
        this.distanciaMetros = obj?.distanciaMetros || 0;
    }
}

export default Distancia;
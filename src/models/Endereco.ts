import IDistancia from "../interfaces/IDistancia";
import IEndereco from "../interfaces/IEndereco";

class Endereco implements IEndereco {
    public endereco: string;
    public longitude?: number;
    public latitude?: number;
    public distancias?: IDistancia[];

    constructor(obj: IEndereco){
        this.endereco = obj.endereco;
        this.longitude = obj.longitude;
        this.latitude = obj.latitude;
        this.distancias = obj.distancias || [];
    }
}

export default Endereco;
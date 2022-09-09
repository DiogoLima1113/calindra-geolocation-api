import ModeloInvalidoErro from "../errors/ModeloInvalidoErro";
import IEndereco from "../interfaces/IEndereco";
import DistanciaDTO from "./DistanciaDTO";


class EnderecoDTO implements IEndereco {
    public endereco: string;
    public longitude?: number;
    public latitude?: number;
    public distancias?: DistanciaDTO[];

    
    constructor(obj: IEndereco){
        this.endereco = obj.endereco;
        this.longitude = obj.longitude;
        this.latitude = obj.latitude;
        this.distancias = obj.distancias?.map(d => new DistanciaDTO(d));
    }

    /**
     * Verifica se os campos do DTO estão preenchidos corretamente. Caso contrário, lança uma exceção
     * @returns 
     */
    public dtoValido(){
        if(this.endereco){
            return;
        }

        throw new ModeloInvalidoErro(400, `O campo endereco é obrigatório`);
    }
}

export default EnderecoDTO;
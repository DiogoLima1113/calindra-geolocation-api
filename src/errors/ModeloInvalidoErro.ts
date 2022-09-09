import IErroCustomizado from "../interfaces/IErroCustomizado";

class ModeloInvalidoErro extends Error implements IErroCustomizado{
    public status: number;

    /**
     * Classe utilizada para exceções de modelos e dtos.
     * @param {number} status 
     * @param {string} mensagem 
     */
    constructor(status: number, mensagem: string){
        super();
        this.status = status || 400;
        this.name = 'ModeloInvalido';
        this.message = mensagem || `O modelo informado é inválido`;
        this.stack = (new Error()).stack;
    }
}

export default ModeloInvalidoErro;
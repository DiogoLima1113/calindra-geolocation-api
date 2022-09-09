import ErroDTO from "../dtos/ErroDTO";
import LogService from '../services/LogService';

class ErrorParser {

    /**
     * Converte um erro qualquer em um DTO de erro
     * @param {{ message: string; name: string; status?: number; }} error Um ojeto com os campos message, name e status
     * @returns {ErroDTO} O DTO de erro do objeto fornecido
     */
    static parseError(error: { message: string; name: string; status?: number; }) : ErroDTO{
        let erro: ErroDTO;
        if (error.status) {
            erro = new ErroDTO({
                status: error.status, 
                mensagem: error.message, 
                nome: error.name 
            });
        } else {
            erro = new ErroDTO({
                status: 500, 
                mensagem: error.message, 
                nome: error.name
            });
        }
    
        (erro.status == 500) ? 
            LogService.registrarAlerta(erro.mensagem) :
            LogService.registrarErro(erro.mensagem);
    
        return erro;
    }

}

export default ErrorParser;
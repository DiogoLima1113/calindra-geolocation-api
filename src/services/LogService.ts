const erro = `[ERRO] - `;
const alerta = `[ALERTA] - `;
const sucesso = `[SUCESSO] - `;

class LogService {

    /**
     * Registra um erro no console
     * @param {string} mensagem O texto do erro a ser registrado
     */
    static registrarErro(mensagem: string){
        mensagem = mensagem || 'Erro não informado';
        console.log(erro + mensagem);
    }
    
    /**
     * Registra um sucesso no console
     * @param {string} mensagem O texto do sucesso a ser registrado
     */
    static registrarSucesso(mensagem: string){
        mensagem = mensagem || 'Ação não informada';
        console.log(sucesso + mensagem);
    }
    
    /**
     * Registra um alerta no console
     * @param {string} mensagem O texto do alerta a ser registrado
     */
    static registrarAlerta(mensagem: string){
        mensagem = mensagem || 'Alerta não informado';
        console.log(alerta + mensagem);
    }
}

export default LogService;
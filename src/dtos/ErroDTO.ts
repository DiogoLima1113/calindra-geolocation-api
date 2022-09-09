class ErroDTO {
    public mensagem: string;
    public nome: string;
    public status: number;
    
    constructor(obj: { mensagem: string; nome: string; status: number; }){
        this.mensagem = obj.mensagem;
        this.nome = obj.nome;
        this.status = obj.status;
    }
}

export default ErroDTO;
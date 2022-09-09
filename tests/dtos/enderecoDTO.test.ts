import EnderecoDTO from "../../src/dtos/EnderecoDTO";
import ModeloInvalidoErro from "../../src/errors/ModeloInvalidoErro";

describe('Testes EnderecoDTO', () => {
    const enderecoDTO = new EnderecoDTO({
        endereco: "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
        longitude: -43.1802782,
        latitude: -22.8973551,
        distancias: []
    });

    it('Deve conseguir validar um dto apenas com os campos obrigatórios', () => {
        let endereco = new EnderecoDTO(enderecoDTO);
        endereco.longitude = undefined;
        endereco.latitude = undefined;
        endereco.distancias = undefined;

        expect(endereco.dtoValido()).toBe(undefined);
    });

    it('Deve gerar uma exceção ao validar um dto sem os campos obrigatórios', () => {
        let endereco = new EnderecoDTO(enderecoDTO);
        endereco.endereco = '';

        try {
            endereco.dtoValido();
            fail('A validação do modelo falhou');
        } catch (error) {
            expect(error instanceof Error).toBeTruthy();
            
            let erro = error as ModeloInvalidoErro;
            expect(erro.message).toBe('O campo endereco é obrigatório');
            expect(erro.status).toBe(400)
        }
    });
});
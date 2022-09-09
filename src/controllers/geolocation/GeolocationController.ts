import { Request, Response } from "express";
import ErrorParser from "../../utils/ErrorParser";
import EnderecoDTO from "../../dtos/EnderecoDTO";
import IEndereco from "../../interfaces/IEndereco";
import GeolocationService from "../../services/GeolocationService";
import ModeloInvalidoErro from "../../errors/ModeloInvalidoErro";

class GeolocationController {

    async obterMatrizDistancias(req: Request, res: Response) {

        try {
            if (!Array.isArray(req.body) || req.body.length < 3) {
                throw new ModeloInvalidoErro(400, "Essa requisição espera um array com 3 ou mais endereços.");
            }

            let enderecosDTO: EnderecoDTO[] = req.body.map((endereco: IEndereco) => {
                let dto = new EnderecoDTO(endereco);
                dto.dtoValido();
                return dto;
            });

            let service = new GeolocationService();
            let matrizDistancias = await service.obterMatrizDistancias(enderecosDTO);

            return res.json(matrizDistancias);
                
        } catch (error) {
            if (error instanceof Error) {
                let erro = ErrorParser.parseError(error);
                return res.status(erro.status).json(erro);
            }

            return res.status(500).json(error);
        }
    }

}


export default GeolocationController;
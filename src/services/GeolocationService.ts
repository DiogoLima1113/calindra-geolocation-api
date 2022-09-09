import {DistanceMatrixResponseData} from "@googlemaps/google-maps-services-js";
import EnderecoDTO from "../dtos/EnderecoDTO";
import Endereco from "../models/Endereco";
import Distancia from "../models/Distancia";
import GoogleMapsAPI from "../api/GoogleMapsAPI";
import MatrizDistanciasDTO from "../dtos/MatrizDistanciasDTO";
import IMenorMaiorDistancia from "../interfaces/IMenorMaiorDistancia";

class GeolocationService {

    /**
     * Busca as distâncias entre um grupo de endereços
     * @param {EnderecoDTO[]} enderecosDTO Os endereços
     * @returns {MatrizDistanciasDTO} Objeto com os endereços completos, a distância entre eles, e o par mais próximo e mais distante
     */
    public async obterMatrizDistancias(enderecosDTO: EnderecoDTO[]) {
        let enderecos = enderecosDTO.map((endereco: EnderecoDTO) => {
            return new Endereco(endereco);
        });

        let promisses: Promise<Endereco>[] = [];

        enderecos.forEach((endereco: Endereco) => {
            promisses.push(GoogleMapsAPI.buscarGeocodeEndereco(endereco));
        });

        let enderecosBuscados = await Promise.all<Endereco>(promisses);

        let distanceMatrix = await GoogleMapsAPI.buscarDistancias(enderecosBuscados);

        let menorMaiorDistancia = this.encontrarDistanciaMenorMaior(enderecosBuscados, distanceMatrix);

        let menorDistancia = menorMaiorDistancia.menorDistancia;
        let maiorDistancia = menorMaiorDistancia.maiorDistancia;

        return new MatrizDistanciasDTO(enderecosBuscados, menorDistancia, maiorDistancia);
    }

    /**
     * Verifica quais os enderecos com a menor e maior distancia entre os informados. Também preenche o campo distancias dos enderecos
     * @param {Endereco[]} enderecos Array com os enderecos
     * @param {DistanceMatrixResponseData} distanceMatrix Dados das distancias entre os enderecos
     * @returns {IMenorMaiorDistancia} Um objeto com a menor e a maior distancia entre os enderecos
     */
    private encontrarDistanciaMenorMaior(enderecos: Endereco[], distanceMatrix: DistanceMatrixResponseData) : IMenorMaiorDistancia {
        let menorDistancia = new Distancia();
        menorDistancia.distanciaMetros = Number.MAX_SAFE_INTEGER;

        let maiorDistancia = new Distancia();
        maiorDistancia.distanciaMetros = Number.MIN_SAFE_INTEGER;

        distanceMatrix.rows.forEach((row, indexRow) => {
            row.elements.forEach((element, indexElement) => {
                if (element.distance.value == 0) {
                    return;
                }

                let distanciaFormatada = new Distancia({
                    origem: distanceMatrix.origin_addresses[indexRow],
                    destino: distanceMatrix.destination_addresses[indexElement],
                    distancia: element.distance.text,
                    tempo: element.duration.text,
                    distanciaMetros: element.distance.value
                });

                enderecos[indexRow].distancias?.push(distanciaFormatada);

                if (this.deveAtualizarMenorDistancia(menorDistancia, distanciaFormatada)) {
                    menorDistancia = distanciaFormatada;
                }

                if (this.deveAtualizarMaiorDistancia(maiorDistancia, distanciaFormatada)) {
                    maiorDistancia = distanciaFormatada;
                }
            });
        });

        return {
            menorDistancia: menorDistancia,
            maiorDistancia: maiorDistancia
        };

    }

    /**
     * Função que encapsula a lógica de atualização da menorDistancia
     * @param {Distancia} menorDistancia A menor distancia atual
     * @param {Distancia} distancia A distancia a ser comparada
     * @returns {Boolean} Booleana que indica se a menor distancia deve ser atualizada
     */
    private deveAtualizarMenorDistancia(menorDistancia: Distancia, distancia: Distancia) : Boolean {
        return !!(distancia.distanciaMetros && menorDistancia.distanciaMetros && (menorDistancia.distanciaMetros > distancia.distanciaMetros));
    }

    /**
     * Função que encapsula a lógica de atualização da maiorDistancia
     * @param {Distancia} maiorDistancia A maior distancia atual
     * @param {Distancia} distancia A distancia a ser comparada
     * @returns {Boolean} Booleana que indica se a maior distancia deve ser atualizada
     */
    private deveAtualizarMaiorDistancia(maiorDistancia: Distancia, distancia: Distancia) : Boolean {
        return !!(maiorDistancia.distanciaMetros && distancia.distanciaMetros && (maiorDistancia.distanciaMetros < distancia.distanciaMetros));
    }

}

export default GeolocationService;
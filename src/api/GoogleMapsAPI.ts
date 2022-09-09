import {Client, DistanceMatrixResponseData} from "@googlemaps/google-maps-services-js";
import Endereco from "../models/Endereco";
import IEndereco from "../interfaces/IEndereco";
import GeocodeAdapter from "../adapters/GeocodeAdapter";

require('dotenv').config();
const API_KEY = process.env.GOOGLE_API_KEY as string;

class GoogleMapsAPI {

    /**
     * Busca o geocode de acordo com o endereco informado
     * @param {IEndereco} endereco O endereco a ser buscado
     * @returns {Promise<Endereco>} Uma promisse para o objeto de Endereco completo
     */
    public static async buscarGeocodeEndereco(endereco: IEndereco) : Promise<Endereco>{
        const client = new Client({});
        let geocode = await client
            .geocode({
                params: {
                    address: endereco.endereco,
                    key: API_KEY,
                },
                timeout: 1000,
            });
        
        return GeocodeAdapter.converter(geocode);
    };

    /**
     * Busca as distancias entre uma lista de endereços
     * @param {Endereco[]} enderecos Os endereços
     * @returns {Promise<DistanceMatrixResponseData>} Uma promise que representa uma matriz entre os endereços e as distâncias
     */
    public static async buscarDistancias(enderecos: Endereco[]) : Promise<DistanceMatrixResponseData> {
        let enderecosStringArray = enderecos.map(e => e.endereco);

        const client = new Client({});
        let distanceMatrixResponse = await client.distancematrix({
            params:{
                origins: enderecosStringArray,
                destinations: enderecosStringArray,
                key: API_KEY,
            },
            timeout: 1000,
        });

        return distanceMatrixResponse.data;
    }
}


export default GoogleMapsAPI;
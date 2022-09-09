import { GeocodeResponse } from "@googlemaps/google-maps-services-js";
import Endereco from "../models/Endereco";

class GeocodeAdapter {

    /**
     * Converte o objeto de Geocode em um Endereco
     * @param {GeocodeResponse} geocode Objeto de geocode a ser convertido
     * @returns {Endereco} O retorno em formato de endereço
     */
    static converter(geocode : GeocodeResponse) : Endereco {
        let dadosEndereco = geocode.data.results[0];
        let endereco = dadosEndereco.formatted_address;
        let longitude = dadosEndereco.geometry.location.lng;
        let latitude = dadosEndereco.geometry.location.lat;

        return new Endereco({ endereco, longitude, latitude });
    }
}

export default GeocodeAdapter;
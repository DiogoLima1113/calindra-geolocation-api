import request from "supertest";
import app from "../../src/config/server";

const enderecos = [
    {
        "endereco": "Av.RioBranco,1Centro,RiodeJaneiroRJ,20090003"
    },
    {
        "endereco": "PraçaMal.Âncora,122Centro,RiodeJaneiroRJ,20021200"
    },
    {
        "endereco": "Rua19deFevereiro,34BotafogoRiodeJaneiroRJ,22280030"
    }
]


describe('Testes do GET de geolocation', () => {
    it('Deve consultar as distancias', async () => {
        let body = [...enderecos];

        let response = await request(app).get('/geolocation/distancias').send(body);

        expect(response.statusCode).toBe(200);

        expect(response.body.enderecos.length).toBe(3);
    });

    it('Deve gerar erro ao consultar distancia entre menos de 3 enderecos', async () => {
        let body = [...enderecos];
        body.pop();

        let response = await request(app).get('/geolocation/distancias').send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe(400);
        expect(response.body.mensagem).toBe('Essa requisição espera um array com 3 ou mais endereços.');
    });

    it('Deve obter a menor distancia', async () => {
        let body = [...enderecos];

        let response = await request(app).get('/geolocation/distancias').send(body);

        expect(response.statusCode).toBe(200);

        let menorDistancia = response.body.menorDistancia;
        expect(menorDistancia.origem).toBe('Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil');
        expect(menorDistancia.destino).toBe('Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil');
        expect(menorDistancia.distancia).toBe('4.1 km');
        expect(menorDistancia.tempo).toBe('11 mins');
    });

    it('Deve obter a maior distancia', async () => {
        let body = [...enderecos];

        let response = await request(app).get('/geolocation/distancias').send(body);

        expect(response.statusCode).toBe(200);

        let maiorDistancia = response.body.maiorDistancia;
        expect(maiorDistancia.origem).toBe('R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil');
        expect(maiorDistancia.destino).toBe('Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil');
        expect(maiorDistancia.distancia).toBe('9.9 km');
        expect(maiorDistancia.tempo).toBe('22 mins');
    });

    it('Deve obter as distancias entre os enderecos', async () => {
        let body = [...enderecos];

        let response = await request(app).get('/geolocation/distancias').send(body);

        expect(response.statusCode).toBe(200);

        expect(response.body.enderecos[0].distancias.length).toBe(2);
    });
});

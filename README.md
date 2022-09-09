<h3 align="center">calindra-geolocation</h3>

---

<p align="center"> Projeto de backend para o processo seletivo da Calindra
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

Neste projeto o objetivo era criar uma api que realizasse integração com um sistema de mapas, obtendo as latitudes e longitudes dos endereçoes passados bem como a distancia entre eles, e o par com a maior e menor distância.

## 🏁 Getting Started <a name = "getting_started"></a>
### Prerequisites


```
NodeJs v17.17 ou superior
```

### Installing

1. Preencha o .env

No .env do projeto, preencha o campo GOOGLE_API_KEY com a chave de acesso da api de mapas do google e o campo PORTA com o número da porta onde deseja que a api seja executada.

```
# Porta do sistema
PORTA = 3333

# API Key
GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"
```

2. Instale as dependências do projeto

No seu prompt de comando, instale as dependências com seu gerenciador de pacotes.

```
npm i
```

3. Inicie a api

No seu gerenciador de pacotes, execute o script dev para iniciar a api.

```
npm run dev
```


## 🔧 Running the tests <a name = "tests"></a>

Este projeto possui testes implementados com jest, para executá-los rode o comando test com seu gerenciador de pacotes.

```
npm run test
```

## 🎈 Usage <a name="usage"></a>

Esta api possui apenas uma rota.

<h4> GET - {{url}}/geolocation/distancias </h4>

<h6>body</h6>

```
[
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
```
Obs.: São necessários no mínimo 3 objetos de endereço no body.

<h6>response</h6>

```
{
    "enderecos": [
        {
            "endereco": "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
            "longitude": -43.1802782,
            "latitude": -22.8973551,
            "distancias": [
                {
                    "origem": "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
                    "destino": "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil",
                    "distancia": "5.4 km",
                    "tempo": "16 mins"
                },
                {
                    "origem": "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
                    "destino": "R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil",
                    "distancia": "9.1 km",
                    "tempo": "19 mins"
                }
            ]
        },
        {
            "endereco": "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil",
            "longitude": -43.1703536,
            "latitude": -22.9039608,
            "distancias": [
                {
                    "origem": "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil",
                    "destino": "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
                    "distancia": "4.1 km",
                    "tempo": "11 mins"
                },
                {
                    "origem": "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil",
                    "destino": "R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil",
                    "distancia": "9.6 km",
                    "tempo": "21 mins"
                }
            ]
        },
        {
            "endereco": "R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil",
            "longitude": -43.1876527,
            "latitude": -22.9507468,
            "distancias": [
                {
                    "origem": "R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil",
                    "destino": "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
                    "distancia": "9.9 km",
                    "tempo": "22 mins"
                },
                {
                    "origem": "R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil",
                    "destino": "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil",
                    "distancia": "8.0 km",
                    "tempo": "17 mins"
                }
            ]
        }
    ],
    "menorDistancia": {
        "origem": "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil",
        "destino": "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
        "distancia": "4.1 km",
        "tempo": "11 mins"
    },
    "maiorDistancia": {
        "origem": "R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil",
        "destino": "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
        "distancia": "9.9 km",
        "tempo": "22 mins"
    }
}
```

## ⛏️ Built Using <a name = "built_using"></a>

- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Jest](https://jestjs.io) - Test Framework

## ✍️ Authors <a name = "authors"></a>

- [@DiogoLima1113](https://github.com/DiogoLima1113)

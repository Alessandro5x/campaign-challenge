# Campaign Challenge

## Descrição do Projeto

Este projeto é uma aplicação de gerenciamento de campanhas, desenvolvida utilizando Node.js com Next.js para o backend. A aplicação permite a criação, leitura, atualização e exclusão (soft delete) de campanhas, além de fornecer uma documentação da API usando Swagger.

## Estrutura de Pastas

campaign-challenge/
├── tests/
│ ├── campaigns.test.js
│ └── validators.test.js
├── data/
│ └── campaigns.js
├── node_modules/
├── pages/
│ ├── api/
│ │ └── campaigns/
│ │ ├── [id].js
│ │ └── index.js
│ └── api-docs.js
├── public/
├── utils/
│ └── validators.js
├── .gitignore
├── jest.config.js
├── next.config.mjs
├── package.json
├── package-lock.json
├── README.md
├── server.js


## Funcionalidades

- **Criação de campanhas:** Permite criar novas campanhas.
- **Leitura de campanhas:** Permite listar todas as campanhas e ler informações de uma campanha específica.
- **Atualização de campanhas:** Permite atualizar as informações de uma campanha.
- **Exclusão de campanhas (soft delete):** Permite excluir uma campanha de forma que ela não seja removida fisicamente do banco de dados, mas marcada como deletada.
- **Documentação da API:** Fornece documentação interativa da API utilizando Swagger.

## Tecnologias Utilizadas

- **Node.js**
- **Next.js**
- **Express**
- **Joi**
- **Jest**

## Instalação e Configuração

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/campaign-challenge.git
cd campaign-challenge
```
Instale as dependências:
```bash
npm install
```
Certifique-se de que a versão do Node.js é compatível (>= v18.17.0). Você pode usar o nvm para gerenciar versões do Node.js.

Inicie o servidor Node.js:
```bash
node server.js
```
Inicie o servidor Next.js:
```bash
npm run dev
```
Acesse a aplicação em http://localhost:3000.

## Rotas da API
 ### Listar todas as campanhas
    URL: /api/campaigns
    Método: GET
    Descrição: Retorna uma lista de todas as campanhas.

### Criar uma nova campanha
    URL: /api/campaigns
    Método: POST
    Corpo da Requisição:
    {
        "nome": "Campanha de Teste",
        "dataInicio": "2024-06-10",
        "dataFim": "2024-06-20",
        "status": "ativa",
        "categoria": "marketing"
    }

### Obter uma campanha específica
    URL: /api/campaigns/:id
    Método: GET
    Descrição: Retorna os detalhes de uma campanha específica.
### Atualizar uma campanha específica
    URL: /api/campaigns/:id
    Método: PUT
    Corpo da Requisição:
    {
        "nome": "Campanha Atualizada",
        "dataInicio": "2024-06-11",
        "dataFim": "2024-06-21",
        "status": "pausada",
        "categoria": "vendas"
    }
### Excluir uma campanha específica (soft delete)
    URL: /api/campaigns/:id
    Método: DELETE
    Descrição: Marca a campanha como deletada.

## Documentação da API
    A documentação da API está disponível em http://localhost:3000/api-docs.

## Testes
    Para rodar os testes, utilize o comando:
```bash
    npm test
```
### Testes Incluídos
    Testes de Validação
    Localização: __tests__/validators.test.js
        Teste de validação de campanha: Verifica se uma campanha válida passa na validação.
        Teste de invalidação de campanha: Verifica se uma campanha com data de fim anterior à data de início não passa na validação.
        Teste de expiração de campanha: Verifica se uma campanha é marcada como expirada se a data de fim for anterior à data atual.
    Testes de API de Campanhas
    Localização: __tests__/campaigns.test.js
        Listar todas as campanhas: Verifica se a lista de campanhas é retornada corretamente.
        Criar uma nova campanha: Verifica se uma nova campanha é criada corretamente.
        Atualizar uma campanha existente: Verifica se uma campanha existente é atualizada corretamente.
        Excluir uma campanha (soft delete): Verifica se uma campanha é marcada como deletada corretamente.
### Contribuições
    Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
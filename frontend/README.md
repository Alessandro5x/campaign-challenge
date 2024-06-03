# Campaign Challenge - Frontend

## Descrição

Esta é a parte frontend do projeto Campaign Challenge. A aplicação foi desenvolvida utilizando Next.js para gerenciar campanhas através de uma interface de usuário que consome a API RESTful. As funcionalidades principais incluem listar todas as campanhas, criar uma nova campanha, editar uma campanha existente, excluir uma campanha e exibir detalhes de uma campanha.

## Tecnologias Utilizadas

- Next.js
- React
- Axios
- Material-UI
- Jest
- React Testing Library

## Funcionalidades

- Listar todas as campanhas
- Criar uma nova campanha
- Editar uma campanha existente
- Excluir uma campanha (soft delete)
- Exibir detalhes de uma campanha

## Pré-requisitos

- Node.js (>= 18.17.0)
- npm (>= 7.0.0)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/campaign-challenge.git
   cd campaign-challenge/frontend
   ```

2. Instale as dependências:

   ```bash
   npm install --legacy-peer-deps
   ```

## Configuração

Certifique-se de que o backend esteja rodando na porta 3001. O frontend está configurado para consumir a API do backend na porta 3001 por padrão.

## Executar a Aplicação

Para rodar a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

## Testes

Para rodar os testes, utilize o comando:

```bash
npm test
```

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
frontend/
├── __tests__/
│   ├── index.test.js
│   ├── new.test.js
│   ├── campaign.test.js
│   └── edit.test.js
├── data/
│   └── campaigns.js
├── node_modules/
├── pages/
│   ├── campaign/
│   │   └── [id].js
│   ├── edit/
│   │   └── [id].js
│   └── new.js
│   └── index.js
├── public/
├── utils/
│   ├── axios.js
│   └── validators.js
├── .gitignore
├── jest.config.js
├── jest.setup.js
├── next.config.js
├── package.json
├── README.md
```

## Configuração de Testes

**jest.config.js**

```javascript
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.[tj]sx?$': 'esbuild-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
```

**jest.setup.js**

```javascript
require('@testing-library/jest-dom');
```

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contribuição

Pull requests são bem-vindos. Para mudanças maiores, abra uma issue primeiro para discutir o que você gostaria de mudar.

---

Este `README.md` cobre as principais informações necessárias para instalar, configurar, rodar e testar a parte frontend da aplicação Campaign Challenge. Sinta-se à vontade para ajustar conforme necessário para se adequar ao seu projeto específico.
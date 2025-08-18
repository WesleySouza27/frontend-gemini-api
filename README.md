# Frontend — Gemini Chat

Descrição

- Frontend em React + TypeScript que consome a API Gemini (NestJS).
- Funcionalidades principais: login/register com JWT, chat em tempo real via Socket.IO, histórico de mensagens, Redux Toolkit com persistência.

Pré-requisitos

- Node.js 18+ e npm
- Backend Gemini (NestJS) rodando localmente ou disponível por URL

Instalação e execução local

1. Clone o repositório e entre na pasta do frontend:

   - git clone <URL_DO_REPOSITORIO_FRONTEND>
   - cd c:\Users\USER\Desktop\desafio_vaga_growdev\frontend-gemini-api

2. Instale dependências:

   - npm install

3. Configure variáveis de ambiente:

   - Crie um arquivo `.env` na raiz com as URLs do backend, por exemplo:
     VITE_API_URL=http://localhost:3030
     VITE_SOCKET_URL=http://localhost:3030

4. Rodar em modo desenvolvimento:

   - npm run dev
   - Abrir http://localhost:5173

5. Build para produção:

   - npm run build

6. Servir build localmente (preview):
   - npm run preview

Principais tecnologias

- Vite + React + TypeScript
- Redux Toolkit + redux-persist
- socket.io-client (WebSocket)
- Axios
- Styled Components
- Material UI (MUI)

Arquivos relevantes

- src/main.tsx — entrada da aplicação
- src/routes — definição de rotas e proteção
- src/pages/login, src/pages/register — telas de autenticação
- src/pages/Chat — componente de chat (Socket.IO + histórico)
- src/services/api.ts — instância axios e interceptor de Authorization

- Author - [Wesley Souza](https://www.linkedin.com/in/wesley-souza-/)

- deploy - [frontend](https://app-mentorize-three.vercel.app/)

Licença

- Projeto privado.

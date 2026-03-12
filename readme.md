# Sistema de Placar em Tempo Real ⚽

## Descrição

Este projeto é uma aplicação web que simula um **sistema de placar de futebol em tempo real**.  
Ele permite registrar partidas, atualizar o placar com gols e cartões, visualizar o histórico de jogos e acompanhar a classificação dos times.

O sistema utiliza **WebSocket** para enviar atualizações instantâneas para todos os usuários conectados.

---

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **WebSocket**
- **HTML**
- **CSS**
- **JavaScript**
- **JSON (armazenamento local)**

---

## Funcionalidades

- Registrar uma nova partida
- Registrar gols para os times
- Registrar cartões amarelos e vermelhos
- Atualização do placar em tempo real
- Histórico de partidas finalizadas
- Exclusão de jogos do histórico
- Classificação automática dos times
- Atualização automática das telas via WebSocket
- Indicador de status de conexão

---

## 📂 Estrutura do Projeto

```text
PLACAR_AO_VIVO/
├── app/
│   ├── controllers/    
    │  └── JogoController.js    # Lógica de controle das requisições
│   ├── models/
│   │   └── Jogo.js          # Modelo de dados do Jogo
│   ├── routes/
│   │   └── routes.js        # Definição das rotas da API
│   └── utils/
│       ├── classificacao.js # Algoritmo de pontos e posições
│       ├── Historico.js     # Gestão de jogos finalizados
│       └── Notificador.js   # Lógica do WebSocket (Broadcasting)
├── data/
│   └── jogos.json           # Banco de dados local (JSON)
├── node_modules/            # Dependências do projeto
├── public/                  # Arquivos acessíveis pelo navegador
│   ├── assets/
│   │   └── css/             
│   │       ├── admin.css
│   │       ├── classificacao.css
│   │       ├── historico.css
│   │       ├── jogo.css
│   │       └── style.css
│   ├── admin.html           # Painel de controle
│   ├── classificacao.html   # Tabela de classificação
│   ├── historico.html       # Lista de resultados
│   ├── index.html           # Página inicial (Dashboard)
│   └── jogo.html            # Visualização da partida
├── LICENSE                  # Termos de uso e licença
├── nodemon.json             # Configurações do ambiente de desenvolvimento
├── package-lock.json        # Trava de versões das dependências
├── package.json             # Metadados e scripts do Node.js
├── readme.md                # Documentação do projeto
└── server.js                # Arquivo principal (Ponto de entrada)


---

## Como Executar o Projeto

### 1. Instalar Node.js

Baixe e instale o Node.js

---

### 2. Instalar dependências

No terminal, dentro da pasta do projeto:

```bash
npm install

### 3. Iniciar o servidor

Execute:

```bash
npm start

### 4. Abrir o navegador

Acesse:

http://localhost:3000

## Funcionamento

1. O administrador registra eventos do jogo (gols, cartões, etc.).
2. O servidor processa os dados e atualiza o estado da partida.
3. As informações são enviadas para todos os clientes conectados via **WebSocket**.
4. As páginas abertas recebem os dados e atualizam automaticamente.
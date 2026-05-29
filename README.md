# CACA — Centro Académico Clínico dos Açores

Website institucional do Centro Académico Clínico dos Açores, desenvolvido no âmbito da unidade curricular.

---

## Identificação do Grupo

| Nome | Número de Aluno |
|------|----------------|
| _Daniela Gabriel_ | _30230007_ |
| _Hugo Raposo_ | _2024114377_ |
| _Julia Freitas_ | _2024114388_ |
| _Rodrigo Pires_ | _2024113717_ |

---

## Framework Front-end e Tecnologias Back-end

### Front-end

O front-end foi desenvolvido com **React 19**, utilizando o Create React App como base. A escolha recaiu sobre o React pela sua arquitetura baseada em componentes, o que se revelou muito adequado para um website com várias secções independentes. A navegação entre páginas é gerida pelo **React Router v7**, e as chamadas à API são feitas com **Axios**. Para funcionalidades específicas, recorremos também ao **Leaflet** (mapas interativos na secção de Contactos) e ao **Three.js** (elementos visuais 3D).


### Back-end

O servidor é uma API REST construída com **Express 5** sobre **Node.js**. Expõe dois conjuntos de rotas — `/api/auth` para autenticação e `/api/users` para gestão de utilizadores — e liga-se à base de dados via **Mongoose**. A autenticação é baseada em tokens **JWT** e as passwords são sempre guardadas com **bcrypt**. Em desenvolvimento, o **nodemon** reinicia automaticamente o servidor a cada alteração.


### Base de dados

A aplicação utiliza **MongoDB** para persistência no servidor (ligação via variável de ambiente `MONGODB_URI`). Para dados que fazem sentido viver no cliente como eventos geridos localmente e subscritores de newsletter optámos pelo **IndexedDB** no browser, o que também permite um funcionamento parcial sem ligação ao servidor.

---

## Estrutura da Aplicação

A aplicação segue uma arquitetura cliente-servidor clássica. O front-end React corre na porta 3000 e comunica com o back-end Express na porta 5000 através de chamadas HTTP com Axios. Em desenvolvimento, o proxy configurado no `package.json` redireciona automaticamente essas chamadas, evitando problemas de CORS.

No front-end, o estado de autenticação é gerido centralmente pelo `AuthContext`, que disponibiliza as funções de login, registo, logout e edição de perfil a toda a aplicação. As rotas que requerem sessão iniciada são protegidas pelo componente `PrivateRoute`.

No back-end, os pedidos autenticados passam por um middleware que verifica o JWT antes de chegar às rotas. As rotas de administração verificam adicionalmente se o utilizador tem o role `admin`.

```
📁Projeto-TW
└── 📁public
    └── 📁js
    ├── favicon.ico
    ├── icon.png
    ├── index.html
    ├── manifest.json
    ├── robots.txt
└── 📁server
    └── 📁config
        ├── db.js
    └── 📁middleware
        ├── auth.js
    └── 📁models
        ├── ContactMessage.js
        ├── User.js
    └── 📁routes
        ├── auth.js
        ├── contact.js
        ├── users.js
    ├── server.js
└── 📁src
    └── 📁components
        └── 📁Apresentacao
            └── 📁media
                ├── universidade.png
            ├── Apresentacao.css
            ├── index.jsx
        └── 📁Contactos
            ├── Contactos.css
            ├── index.jsx
        └── 📁Eventos
            ├── Eventos.css
            ├── eventosDB.js
            ├── eventosHelpers.js
            ├── index.jsx
        └── 📁Footer
            └── 📁media
                ├── fb.png
                ├── ig.png
                ├── linkedIn.png
            ├── Footer.css
            ├── index.jsx
        └── 📁Header
            └── 📁media
                ├── logo.png
                ├── user_logo.png
            ├── Header.css
            ├── index.jsx
        └── 📁Investigacao
            └── 📁media
                ├── universidade.png
            ├── index.jsx
            ├── Investigacao.css
        └── 📁Login
        └── 📁Noticias
            └── 📁media
                ├── palestra-2.png
                ├── palestrante-2.png
                ├── Poster-2.png
            ├── dna.jsx
            ├── index.jsx
            ├── Noticias.css
        └── 📁Oportunidades
            └── 📁media
                ├── oportunidades.jpg
            ├── index.jsx
            ├── Oportunidades.css
        └── 📁Parceiros
            └── 📁media
                ├── HDES-2.png
                ├── INOVA-2.png
                ├── UAc-2.png
                ├── USISM-2.png
            ├── index.jsx
            ├── Parceiros.css
        └── 📁ScrollToTop
            ├── index.jsx
            ├── ScrollToTop.css
        └── 📁Weather
        ├── PrivateRoute.jsx
    └── 📁context
        ├── AuthContext.jsx
    └── 📁js
        ├── indexeddb.js
    └── 📁media
    └── 📁pages
        ├── Home.jsx
        ├── Login_Registo.css
        ├── Login.jsx
        ├── Perfil.jsx
        ├── Registo.jsx
        ├── Utilizadores.jsx
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    ├── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

## Funcionalidades Implementadas

### Secções migradas para React

O website original foi reestruturado em componentes React independentes: Apresentação, Notícias, Investigação, Eventos, Parceiros, Oportunidades, Contactos, Header e Footer. O header inclui um menu hamburger responsivo para dispositivos móveis, implementado em CSS.

### API de gestão de utilizadores (nova)

| Endpoint | Método | Acesso |
|----------|--------|--------|
| `/api/auth/register` | POST | Público |
| `/api/auth/login` | POST | Público |
| `/api/auth/me` | GET | Autenticado |
| `/api/users` | GET | Admin |
| `/api/users/me` | GET | Autenticado |
| `/api/users/me` | PUT | Autenticado |

O sistema de roles distingue `user` (padrão) de `admin`. O primeiro utilizador a registar-se recebe automaticamente o role de administrador, sem necessidade de configuração manual.

### Gestão de eventos e newsletter (IndexedDB)

Os eventos podem ser criados, editados e removidos diretamente no browser, com persistência via IndexedDB. A subscrição de newsletter também é guardada localmente, com os dados do subscritor e data de subscrição.

---

## Como Correr a Aplicação

**Pré-requisitos:** Node.js v18 ou superior, npm, e uma instância MongoDB (local ou MongoDB Atlas).

**1. Instalar dependências**

```bash
npm install axios bcrypt cors dotenv express jsonwebtoken leaflet mongoose nodemon react-dom react-router-dom react-scripts react three web-vitals
```

**2. Criar o ficheiro `.env` na raiz do projeto**

```env
MONGODB_URI=mongodb+srv://<utilizador>:<password>@<cluster>.mongodb.net/<nome-bd>
JWT_SECRET=uma_chave_secreta_forte_aqui
PORT=5000
```

**3. Iniciar a aplicação em desenvolvimento**

Os comandos abaixo iniciam o front-end e o back-end em simultâneo:

```bash
npm run dev
```

- Front-end disponível em `http://localhost:3000`
- Back-end disponível em `http://localhost:5000`


## Decisões de Design e Implementação

A decisão de centralizar a autenticação no `AuthContext` veio da necessidade de vários componentes precisarem saber se existe sessão ativa. Colocar esse estado num contexto global foi a solução mais limpa.

A escolha do IndexedDB em vez de `localStorage` para os eventos deve-se ao facto de o IndexedDB suportar estruturas de dados mais complexas e permitir consultas indexadas, o que facilita ordenação por data ou título sem carregar tudo para memória.

Um desafio foi garantir que o IndexedDB estivesse inicializado antes de qualquer operação com eventos. Resolvemos isso com uma função `ensureDB` que aguarda a ligação antes de executar qualquer operação, evitando condições de corrida.

---

## Acessibilidade, Responsividade e Segurança

Em termos de **acessibilidade**, todas as imagens têm atributos `alt` descritivos, o menu de navegação inclui `aria-label` para leitores de ecrã, e a estrutura do documento usa elementos semânticos HTML5 (`<header>`, `<main>`, `<nav>`, `<footer>`).

Quanto à **responsividade**, o layout adapta-se a diferentes tamanhos de ecrã. O menu hamburger para dispositivos móveis foi implementado exclusivamente em CSS (usando um `checkbox` oculto), sem dependência de JavaScript para a interação.

No que diz respeito à **segurança**, as passwords nunca são guardadas em texto simples — são sempre processadas com `bcrypt` antes de chegarem à base de dados. Os tokens JWT expiram ao fim de 2 horas. As variáveis sensíveis (URI da base de dados e segredo JWT) estão isoladas no `.env`, que está excluído do repositório via `.gitignore`. As respostas da API nunca incluem o campo `password` nos objetos de utilizador retornados.

---

## APIs Externas Utilizadas

**Leaflet** (`leaflet ^1.9.4`) — biblioteca open-source para mapas interativos. Foi integrada no componente `Contactos` para apresentar a localização do centro num mapa embebido, instalada via npm sem necessidade de chave de API.

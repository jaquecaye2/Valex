<h1 align="center">
    <img  src="https://cdn.iconscout.com/icon/free/png-256/credit-card-2650080-2196542.png" width="50"> Valex
</h1>

<h3 align="center">
   💳 Seu app para gerenciar seus cartões de benefícios 💳
</h3>

<h4 align="center">
	🚧   Concluído 🚀 🚧
</h4>

### 💻 Sobre o projeto

Valex é um aplicativo que possibilita às empresas e colaboradores o gerenciamento dos mais diversos tipos de cartões de benefícios.

### ⚙️ Funcionalidades

- [x] Empresas ou entidades podem cadastrar cartões de benefícios para seus colaboradores
- [x] Empresas ou entidades podem realizar a recarga mensal dos cartões de benefícios ativados
- [x] Colaboradores podem realizar a ativação do seu cartão de benefício
- [x] Colaboradores podem verificar o saldo disponível e as compras realizadas com o cartão
- [x] Colaboradores podem realizar o bloqueio e desbloqueio do seu cartão de benefício
- [x] Colaboradores podem realizar compras com seu cartão físico

### 🚀 Como executar o projeto

Este projeto é composto pelo Backend

#### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o servidor

```bash

# Clone este repositório
$ git clone https://github.com/jaquecaye2/Valex.git

# Acesse a pasta do projeto no terminal/cmd

# Instale as dependências
$ npm install

# Informe a porta e a url para acesso ao banco de dados no arquivo .env
const PORT = 4000;
const DATABASE_URL = postgres://{user}:{password}@{hostname}:{port}/{database-name};

# Execute a aplicação em modo de desenvolvimento
$ npm run dev
```

### 🛠 Tecnologias

<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>

### 📄 Documentação da API

➡️ <span style="color:yellow"> **POST** </span> `/create-card/:idEmployee/:type`

Nessa rota, empresas com uma chave de API válida podem criar cartões para os seus empregados. Para um cartão ser criado precisamos do identificador do empregado e do tipo do cartão.

A chave de API deverá ser recebida no header `apiKey`.

A rota recebe dois parâmetros, em que: 
  - idEmployee: id do colaborador --> para quem a empresa deseja criar o cartão 
  - type: tipo do cartão a ser criado --> deve ser: 'groceries', 'restaurant', 'transport', 'education', 'health'

➡️ <span style="color:yellow"> **POST** </span> `/activate-card/:id`

Nessa rota, empregados podem criar ativar seus cartões, isso significa, gerar uma senha para o cartão. Para um cartão ser ativado precisamos do identificador, do CVC do mesmo e da senha que será cadastrada.

O "id" passado na rota é o id do cartão criado na rota mencionada anteriormente.

O Body da requisição deve ser feito no seguinte formato:

```bash
{
   "cvc": "031", #string
   "password": "1234" #string
}
```

➡️ <span style="color:green"> **GET** </span> `/view-balance/:id`

Nessa rota, empregados podem visualizar o saldo de um cartão e as transações do mesmo. Para isso, precisamos do identificador do cartão.

O "id" passado na rota é o id do cartão criado.

A resposta da requisição virá no seguinte formato:

```bash
"balance": 35000,
  "transactions": [
		{ "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	]
  "recharges": [
		{ "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
	]
```

➡️ <span style="color:yellow"> **POST** </span> `/block-card/:id`

Nessa rota, empregados podem bloquear cartões. Para um cartão ser bloqueado precisamos do identificador e da senha do mesmo.

O "id" passado na rota é o id do cartão criado.

O Body da requisição deve ser feito no seguinte formato:

```bash
{
   "password": "1234" #string
}
```

➡️ <span style="color:yellow"> **POST** </span> `/unlock-card/:id`

Nessa rota, empregados podem desbloquear cartões. Para um cartão ser desbloqueado precisamos do identificador e da senha do mesmo.

O "id" passado na rota é o id do cartão criado.

O Body da requisição deve ser feito no seguinte formato:

```bash
{
   "password": "1234" #string
}
```

➡️ <span style="color:yellow"> **POST** </span> `/recharge-card/:id`

Nessa rota, empresas com uma chave de API válida podem recarregar cartões de seus empregados. Para um cartão ser recarregado precisamos do identificador do mesmo.

A chave de API deverá ser recebida no header `apiKey`.

O "id" passado na rota é o id do cartão criado.

O Body da requisição deve ser feito no seguinte formato:

```bash
{
  "amount": 1000 #number
}
```

➡️ <span style="color:yellow"> **POST** </span> `/purchase/:id`

Nessa rota, empregados podem comprar em Points of Sale (maquininhas). Para uma compra em um POS ser efetuada precisamos do identificador do cartão utilizado e da senha do mesmo, do identificador do estabelecimento e do montante da compra.

O Body da requisição deve ser feito no seguinte formato:

```bash
{
  "password": "1234", #string
  "businessesId": 1, #number
  "amount": 1000 #number
}
```

### 👩🏻 Autora
<img style="border-radius: 200" src="https://avatars.githubusercontent.com/u/102393976?s=400&u=aba5f19bf20b58d80146b343326cdb4fac491351&v=4" width="100" alt=""/>          |           <b>Jaqueline Caye</b>

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jaqueline-caye-614449137/)](https://www.linkedin.com/in/jaqueline-caye-614449137/)
[![Instagram Badge](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white&link=https://www.instagram.com/jaquecaye/?hl=pt)](https://www.instagram.com/jaquecaye/?hl=pt)

## Valex

### Rotas de criação e gerenciamento de cartões:

#### Rota <span style="color:yellow"> **POST** </span>/create-card/:idEmployee/:type

Em que: 
  - idEmployee: id do colaborador --> para quem a empresa deseja criar o cartão 
  - type: tipo do cartão a ser criado --> deve ser: 'groceries', 'restaurant', 'transport', 'education', 'health'

Essa é uma rota autenticada com um header http do tipo "apikey". Sua função é criar novos cartões para os funcionários.


#### Rota <span style="color:orange"> **POST** </span>/activate-card/:id

Essa é uma rota não autenticada. Sua função é ativar os cartões criados.

O "id" passado na rota é o id do cartão criado na rota mencionada anteriormente.

O Body da requisição deve ser feito no seguinte formato:

```json
{
   "cvc": "031", //string
   "password": "1234" //string
}
```

#### Rota <span style="color:green"> **GET** </span>/view-balance/:id

Essa é uma rota não autenticada. Sua função é verificar o extrato dos cartões.

O "id" passado na rota é o id do cartão criado.

A resposta da requisição virá no seguinte formato:

```json
"balance": 35000,
  "transactions": [
		{ "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	]
  "recharges": [
		{ "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
	]
```

#### Rotas <span style="color:orange"> **POST** </span>/block-card/:id e /unlock-card/:id

Rotas não autenticadas, mesmo funcionamento, com o intuito de permitir ao usuário respectivamente bloquear e desbloquear um cartão.

O "id" passado na rota é o id do cartão criado.

O Body da requisição deve ser feito no seguinte formato:

```json
{
   "password": "1234" //string
}
```

### Rotas de compra e recarga:

#### Rota <span style="color:yellow"> **POST** </span>/recharge-card/:id

Essa é uma rota autenticada com um header http do tipo "apikey". Sua função é recarregar os cartões para os funcionários.

O "id" passado na rota é o id do cartão criado.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "amount": 1000 //number
}
```

#### Rota <span style="color:yellow"> **POST** </span>/purchase/:id

Essa é uma rota não autenticada. Sua função é permitir aos funcionários fazerem compras em estabelecimentos **do mesmo tipo** dos seus cartões.

```json
{
  "password": "1234", //string
  "businessesId": 1, //number
  "amount": 1000 //number
}
```

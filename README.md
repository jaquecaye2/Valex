## Valex

### Cartões:
 - Criação
     - Header: recebe uma "apikey" que é a chave de API da empresa
     - Rota: POST /create-card/:idEmployee/:type
        - idEmployee: id do colaborador --> para quem a empresa deseja criar o cartão 
        - type: tipo do cartão a ser criado --> deve ser: 'groceries', 'restaurant', 'transport', 'education', 'health'
    
 - Ativação de cartão
    - Rota: POST /activate-card/:id (id do cartão)
    - Body:
  {
    cvc: "031",
    password: "1234"
  }
    
 - Visualização de saldo e transações
    - Rota: GET /view-balance/:id (id do cartão)
 
 - Bloqueio de cartão
    - Rota: POST /block-card/:id (id do cartão)
    - Body:
  {
    password: "1234"
  }
 
 - Desbloqueio de cartão 
    - Rota: POST /unlock-card/:id (id do cartão)
    - Body:
  {
    password: "1234"
  }
 
 ### Recargas
 
 - Recargas:
     - Rota: POST /recharge-card/:id (id do cartão)
     - Header: recebe uma "apikey" que é a chave de API da empresa
     - Body:
  {
    amount: 1000
  }
 
 ### Compra em POS
 - Compras:
     - Rota: POST /purchase/:id (id do cartão)
     - Body:
{
  password: "1234",
  businessesId: 1,
  amount: 1000
}

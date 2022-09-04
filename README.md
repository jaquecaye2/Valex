## Valex

### Cartões:
 - Criação
     - Header: recebe uma "apikey" que é a chave de API da empresa
     - Rota: recebe dois parâmetros:
        - idEmployee: id do colaborador --> para quem a empresa deseja criar o cartão 
        - type: tipo do cartão a ser criado --> deve ser: 'groceries', 'restaurant', 'transport', 'education', 'health'
    
 - Ativação de cartão
    - Rota: id do cartão
    - Body:
  {
    cvc: "031",
    password: "1234"
  }
    
 - Visualização de saldo e transações
    - Rota: id do cartão
 
 - Bloqueio de cartão
    - Rota: id do cartão
    - Body:
  {
    password: "1234"
  }
 
 - Desbloqueio de cartão 
    - Rota: id do cartão
    - Body:
  {
    password: "1234"
  }
 
 ### Recargas
 
 - Recargas:
     - Rota: id do cartão
     - Header: recebe uma "apikey" que é a chave de API da empresa
     - Body:
  {
    amount: 1000
  }
 
 ### Compra em POS
 - Compras:
     - Rota: id do cartão
     - Body:
{
  password: "1234",
  businessesId: 1,
  amount: 1000
}

Transactions = new Mongo.Collection( 'transactions' );

Transactions.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Transactions.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

TransactionSchema = new SimpleSchema({
  "date": {
    type: Date,
    label: "Data da transação"
  },
  "from": {
    type: String,
    label: "Endereço remetente"
  },
  "to": {
    type: String,
    label: "Endereço destinatário"
  },
  "value": {
    type: Number,
    label: "Valor transferido",
    decimal:true
  },
  "token": {
    type: String,
    label: "Token que fez a transação"
  },
  "hash": {
    type: String,
    label: "Hash da Transação no Blockchain"
  },
  "clientId": {
    type: String,
    label: "Id do cliente"
  }
});

Transactions.attachSchema( TransactionSchema );

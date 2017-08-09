Template.index.helpers({
  countTransactions: function () {
    return Transactions.find().count();
  },
  sumTransactions: function(){
    var total = Transactions.find().sum('value');
    return total.toFixed(8) + " ether";
   }
});

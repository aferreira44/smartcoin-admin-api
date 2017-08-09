Template.transactions.onCreated( function() {
  this.subscribe( 'transactions', function() {
    console.log( "Transactions data ready.");
  });
});

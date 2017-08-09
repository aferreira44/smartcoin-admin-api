Template.index.onCreated( function() {
  this.subscribe( 'transactions', function() {
    console.log( "transactions data ready.");
  })
});

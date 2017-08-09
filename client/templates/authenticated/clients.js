Template.clients.onCreated( function() {
  this.subscribe( 'clients', function() {
    console.log( "Clientes data ready.");
  });
});

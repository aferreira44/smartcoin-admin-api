const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'index' } );
  }
});

authenticatedRoutes.route( '/clients', {
  name: 'clients',
  action() {
    BlazeLayout.render( 'default', { yield: 'clients' } );
  }
});

authenticatedRoutes.route( '/transferir-fundos', {
  name: 'transactions',
  action() {
    BlazeLayout.render( 'default', { yield: 'transactions' } );
  }
});

authenticatedRoutes.route( '/report', {
  name: 'report',
  action() {
    BlazeLayout.render( 'default', { yield: 'report' } );
  }
});

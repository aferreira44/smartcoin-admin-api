Meteor.methods({

  insertClient: function( client ) {
    check( client, Clients.simpleSchema() );

    if(typeof web3 === 'undefined')
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

    var newAddress = web3.personal.newAccount("123456");

    var newClient = {
      "ownerId" : client.ownerId,
      "name": client.name,
      "description": client.description,
      "active": client.active,
      "ethAccount": newAddress,
      "ethAccountBalance": parseFloat(web3.eth.getBalance(newAddress).toString(10)),
      "token": client.token
    };

    try {
      var clientId = Clients.insert( newClient );
      return clientId;
    } catch( exception ) {
      return exception;
    }
  },
  updateClient: function( updates ) {
    check( updates, Object );

    try {
      Clients.update( { "_id": updates._id }, {
        $set: updates
      } );
    } catch( exception ) {
      return exception;
    }
  },
  removeClient: function( clientId ) {
    check( clientId, String );

    try {
      Client.remove( clientId );
    } catch( exception ) {
      return exception;
    }
  },
  regenerateApiKey: function( clientId ){
    check( clientId, String );
    var newKey = Random.hexString( 32 );
    try {
        Clients.update( { "_id": clientId }, {
        $set: { "token": newKey }
      });
    } catch(exception) {
      return exception;
    }
  }
});

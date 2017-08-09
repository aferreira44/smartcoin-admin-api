Template.transactions.helpers({
  transactions: function () {
    return Transactions.find();
  }

});

Template.transactions.events({
  'submit #new-transaction'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var newTransaction = {
      "date" : new Date(),
      "from": $('#from').val(),
      "to": $('#to').val(),
      "value": parseFloat($('#value').val()),
      "hash": '',
      "token": '0c9393a5b58590803de5ea540e113a48',
      "clientId": Meteor.userId()
    };

    Meteor.call( "insertTransaction", newTransaction, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Transação realizada com Sucesso!", "success" );
      }
    });

  }
});

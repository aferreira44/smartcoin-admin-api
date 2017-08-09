Template.report.helpers({
  transactions: function () {
    return Session.get("transactions");
  },
  clients : function () {
    return Clients.find().fetch();
  },

  countTransactionsRpt: function () {
    return Session.get("countTransactionsRpt");
  },
  sumTransactionsRpt: function(){
    return Session.get("sumTransactionsRpt");
   }

});

Template.report.events({
    'click #btnPesquisar': function(){

      let pickerStart   = $( '#txtStart' ).val();
      let pickerEnd   = $( '#txtEnd' ).val();
      let clientId = $( '#ddlClients' ).val();

      if ( clientId && pickerStart  && pickerEnd  ) {

        let arrStart = pickerStart.split('/');
        let startDate = new Date(arrStart[2], arrStart[1]-1, arrStart[0],0,0,0);

        let arrEnd = pickerEnd.split('/');
        let endDate = new Date(arrEnd[2], arrEnd[1]-1, arrEnd[0],23,59,59);

        Transactions.join(Clients,"clientId", "client",["name"]);

        let count = Transactions.find({clientId : clientId ,
                                    date : { $gte : startDate, $lt: endDate }}
                                  ).count();

        let total = Transactions.find({clientId : clientId ,
                                    date : { $gte : startDate, $lt: endDate }}
                                  ).sum('value');

        let ret = Transactions.find({clientId : clientId ,
                                    date : { $gte : startDate, $lt: endDate }}
                                    ).fetch();

        Session.set( "countTransactionsRpt" ,  count ) ;
        Session.set( "sumTransactionsRpt" ,  total.toFixed(8) + " ether" ) ;
        Session.set( "transactions" ,  ret ) ;

      }else{
        Bert.alert( "Todos os filtros são obrigatórios.", "danger" );
      }
    }
  });

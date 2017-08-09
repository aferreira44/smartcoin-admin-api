Template.report.rendered=function() {
	$('#date-container .input-daterange').datepicker({
    orientation: "auto left",
    language: "pt-BR",
    autoclose: true,
    todayHighlight: true
});
}

Template.report.onCreated( function() {
  this.subscribe( 'transactions', function() {
    console.log( "Transactions data ready.");
  });

  this.subscribe( 'clients', function() {
    console.log( "Clients data ready.");
  });


});

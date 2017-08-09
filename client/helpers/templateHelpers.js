Template.registerHelper('prettifyDate', ( date ) => {
  if ( date ) {
    return moment(new Date(date)).format("DD/MM/YYYY");
  }
});

Template.registerHelper('prettifyDateTime', ( date ) => {
  if ( date ) {
    return moment(new Date(date)).format("DD/MM/YYYY hh:mm");
  }
});

Meteor.methods({
  insertCollaborator: function( collaborator ) {
    check( collaborator, Collaborator.simpleSchema() );

    try {
      var collaboratorId = Collaborator.insert( project );
      return collaboratorId;
    } catch( exception ) {
      return exception;
    }
  },
  updateCollaborator: function( updates ) {
    check( updates, Object );

    try {
      Collaborator.update( { "_id": updates._id }, {
        $set: updates
      } );
    } catch( exception ) {
      return exception;
    }
  },
  removeCollaborator: function( collaboratorId ) {
    check( collaboratorId, String );

    try {
      Collaborator.remove( collaboratorId );
    } catch( exception ) {
      return exception;
    }
  }
});

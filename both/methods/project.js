Meteor.methods({
  insertProject: function( project ) {
    check( project, Project.simpleSchema() );

    try {
      var projectId = Project.insert( project );
      return projectId;
    } catch( exception ) {
      return exception;
    }
  },
  updateProject: function( updates ) {
    check( updates, Object );

    try {
      Project.update( { "_id": updates._id }, {
        $set: updates
      } );
    } catch( exception ) {
      return exception;
    }
  },
  removeProject: function( projectId ) {
    check( projectId, String );

    try {
      Project.remove( projectId );
    } catch( exception ) {
      return exception;
    }
  }
});

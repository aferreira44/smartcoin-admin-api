Meteor.publish('collaborators', function() {
  return Collaborators.find();
});

Collaborators = new Mongo.Collection( 'collaborators' );

Collaborators.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Collaborators.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

CollaboratorSchema = new SimpleSchema({

  "_id": {
    type:  String,
    label: "ID"
  },
  "name": {
    type: String,
    label: "Collaborator name"
  },
  "clientId": {
    type: String,
    label: "Client ID"
  },
  "cpf": {
    type: String,
    label: "Cpf"
  },
  "active": {
    type: Boolean,
    label: "Collaborator isActive?"
  },
  "walletAddress": {
    type: String,
    label: "Collaborator Wallet Address"
  }});
Collaborators.attachSchema( CollaboratorSchema );

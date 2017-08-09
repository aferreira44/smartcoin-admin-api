Clients = new Mongo.Collection( 'clients' );

Clients.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Clients.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

ClientSchema = new SimpleSchema({
  "ownerId": {
    type: String,
    label: " Owner"
  },
  "name": {
    type: String,
    label: "Project Name"
  },
  "description": {
    type: String,
    label: "Project Description"
  },
  "active": {
    type: Boolean,
    label: "Project isActive?"
  },
  "ethAccount": {
    type: String,
    label: "ETH Account Address"
  },
  "ethAccountBalance": {
    type: Number,
    label: "ETH Account Balance"
  },
  "token": {
    type: String,
    label: "Token"
  }
});


Clients.attachSchema( ClientSchema );

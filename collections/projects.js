Projects = new Mongo.Collection( 'projects' );

Projects.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Projects.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

ProjectSchema = new SimpleSchema({
  "_id": {
    type:  String,
    label: "ID"
  },

  "clientId": {
    type: String,
    label: "Client ID"
  },

  "projectId": {
    type: String,
    label: "Project ID"
  },

  "userId": {
    type: String,
    label: "User ID"
  },


  "name": {
    type: String,
    label: "Nome do Projeto"
  },

  "description": {
    type: String,
    label: "Descricão do Projeto"
  },

  "isActive":{
    type: Boolean,
    label: "Projeto Ativo"
  },

  "walletAddress": {
    type: String,
    label: "Project Wallet Address"
  }
});

Projects.attachSchema( ProjectSchema );

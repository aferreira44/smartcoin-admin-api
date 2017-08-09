let resetPassword = ( options ) => {
  _validate( options.form, options.template );
};

let _validate = ( form, template ) => {
  $( form ).validate( validation( template ) );
};

let validation = ( template ) => {
  return {
    rules: {
      newPassword: {
        required: true,
        minlength: 6
      },
      repeatNewPassword: {
        required: true,
        minlength: 6,
        equalTo: '[name="newPassword"]'
      }
    },
    messages: {
      newPassword: {
        required: "Por favor, informe uma nova senha.",
        minlength: "Por favor, utilize pelo menos 6 caracteres na sua senha."
      },
      repeatNewPassword: {
        required: "Por favor, repita a sua nova senha.",
        equalTo: "As duas senhas digitadas devem ser idênticas. Tente novamente!"
      }
    },
    submitHandler() { _handleReset( template ); }
  };
};

let _handleReset = ( template ) => {
  var token    = FlowRouter.current().params.token,
      password = template.find( '[name="newPassword"]' ).value;

  Accounts.resetPassword( token, password, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'danger' );
    } else {
      Bert.alert( 'Nova senha cadastrada!!', 'success' );
    }
  });
};

Modules.client.resetPassword = resetPassword;

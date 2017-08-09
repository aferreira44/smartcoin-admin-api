let signup = ( options ) => {
  _validate( options.form, options.template );
};

let _validate = ( form, template ) => {
  $( form ).validate( validation( template ) );
};

let validation = ( template ) => {
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      emailAddress: {
        required: 'Você precisa informar um e-mail aqui.',
        email: 'E-mail inválido.'
      },
      password: {
        required: 'Você precisa informar um e-mail aqui.',
        minlength: 'Por favor, utilize pelo menos 6 caracteres na sua senha.'
      }
    },
    submitHandler() { _handleSignup( template ); }
  };
};

let _handleSignup = ( template ) => {
  let user = {
    email: template.find( '[name="emailAddress"]' ).value,
    password: template.find( '[name="password"]' ).value
  };

  Accounts.createUser( user, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'danger' );
    } else {
      Bert.alert( 'Seja bem-vindo!', 'success' );
    }
  });
};

Modules.client.signup = signup;

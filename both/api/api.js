//Players = new Meteor.Collection("players");

if (Meteor.isServer) {

  // Global API configuration
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    apiPath: 'smartcoin',
    version: 'v1',
    defaultHeaders: {
      'Content-Type': 'application/json'
    }

  });


  //Metododo responsavel em cadatrar projeto
  //Retorna json com o projeto cadastrado

  Api.addRoute('project',{
    get :{
        action: function(){
          if(typeof web3 === 'undefined')
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

            var token = this.queryParams.token;
            var client = Clients.findOne({'token': token});
            var userId = this.queryParams.userId;

            console.log("Inicio Consulta Saldo de Projetos");

            if(client){
              try {

                let projectUser = Projects.find({userId : userId});

                console.log("Total de Carteiras -> " +  Projects.find({userId : userId}).count())

                var sumBalance = 0.0;

                projectUser.forEach(function(prj){

                  console.log("Carteira do Projeto -> " + prj.walletAddress);
                  //var balance = web3.eth.getBalance(prj.walletAddress);
                  var balance = parseFloat(web3.eth.getBalance(prj.walletAddress));
                  console.log("Saldo da Carteira do Projeto -> " + balance);
                  sumBalance = sumBalance + balance;

                });

                console.log("Sum Balance - " + sumBalance );
                console.log("Cliente - " + client.name );
                console.log("userId - " + userId);

                var walletBalance =  { "userId":userId,
                                       "balance": EthTools.formatBalance(sumBalance, '0,0.0[00] unit', 'ether'),
                                       "usd" : EthTools.formatBalance(sumBalance.toString(), '0,0.0[00] unit', 'usd'),
                                       "btc" :EthTools.formatBalance(sumBalance.toString(), '0,0.0[00] unit', 'btc')
                                     };

                console.log("Saldo Projeto - " +  walletBalance.balance);
                return {statusCode: 200,
                        status : "success",
                        data: walletBalance
                };
              } catch( exception ) {

                console.log("Erro ao recuperar saldo." + exception);
                return {statusCode: 404,
                        status : "error",
                        body: 'Erro ao recuperar saldo.' + exception
                      };
              }
            }else{
              console.log("Token Invalido");
              return {statusCode: 404,
                      status : "error",
                      body: 'Token Inválido'};
            }

            return {};
        }
    },

    post: {
      action: function(){

        //verifica se o objeto web3 está instaciado,
        //Se não instacia passando como paramentro o servidor que esta rodadno o ethereum
        if(typeof web3 === 'undefined')
          web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

        //Recupera o Token passado como paramentro na chamado do serviço
        token = this.bodyParams.token;
        //Busca o cliente que tenha o token cadastrado
        client = Clients.findOne({'token': token});
        //Se existir o cliente continua  na criação do projeto. Caso contrario retorna erro 404, token invalido
        if(client){
            //Recupera os pararamentro para criação do projeto
            name = this.bodyParams.name;
            description = this.bodyParams.description;
            projectIdCli = this.bodyParams.projectId;
            userId = this.bodyParams.userId;
            isActive = true;

            //Verifica se o projeto já foi cadastrado com o mesmo ID. Se sim retorna erro 404. Projeto já cadastrado.
            //if(Projects.find({'projectId':projectIdCli}).count() <= 0){

                //Monta o objeto Json para salvar no mongoDb
                var project =  { "_id" : incrementCounter('countCollection', 'projectId'),
                                 "clientId" : client._id,
                                 "projectId": projectIdCli,
                                 "userId": userId,
                                 "name" : name,
                                 "description":description,
                                 "isActive": isActive,
                                 //Cria a carteira do projeto chamando o serviço do ethereum
                                 "walletAddress": web3.personal.newAccount("123456") };

                console.log(project);
                try {
                    //Insere o projeto no MongoDb
                    var projectId = Projects.insert( project );
                    //Busca o projeto inserido para devolver como retorno da metodo.
                    var prj = Projects.findOne({"_id":projectId});
                    console.log(prj);
                    //Retorna 200 Sucesso e projeto cadastrado com a carteira do projeto no formato json
                    return {statusCode: 200,
                            status : "success",
                            data: prj };
                }catch( exception ) {
                    //Se der alguma exceção quando for inserir o projeto, retorna 404 Erro e a execeção no formato json
                    return {statusCode: 404,
                            status : "error",
                            body: 'Erro ao salvar o projeto.' + exception };
                }
            //}else{

            //    return {statusCode: 404,
            //            status : "error",
            //            body: 'Id do Projeto já foi salvo'};
            //}
        }else{
            return {statusCode: 404,
                    status : "error",
                    body: 'Token Inválido'};
        }

        return {};
      }
    }
  });

  //Metododo responsavel em vericar saldo de uma carteira.
  //Recebe como paramentro :
  //token -> Validar qual o cliente está realizado a solicitação.
  //walletAddress -> Endereço da carteira que deseja consultar o saldo disponivel.
  //Retorna o saldo disponivel da carteira.
  Api.addRoute('balance',{
    get: {
      action: function(){

        //verifica se o objeto web3 está instaciado,
        //Se não instacia passando como paramentro o servidor que esta rodadno o ethereum
        if(typeof web3 === 'undefined')
          web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

        //Recupera o Token passado como paramentro na chamado do serviço
        var token = this.queryParams.token;
        //Busca o cliente que tenha o token cadastrado
        var client = Clients.findOne({'token': token});
        var walletAddress = this.queryParams.walletAddress;

        console.log("Inicio Consulta Saldo Carteira");
        //Se existir o cliente continua  na consulta de saldo. Caso contrario retorna erro 404, token invalido
        if(client){
          try {

            console.log("Cliente - " + client.name );
            console.log("Wallet - " +  walletAddress);

            //Chama o serviço do ethereum que consulta o saldo carteira.
            var balance = web3.eth.getBalance(walletAddress);

            //Monta o objeto Json para retornar o saldo da carteira
            var walletBalance =  { "walletAddress":walletAddress,
                                   "balance": EthTools.formatBalance(balance, '0,0.0[00] unit', 'ether'),
                                   "usd" : EthTools.formatBalance(balance, '0,0.0[00] unit', 'usd'),
                                   "btc" :EthTools.formatBalance(balance, '0,0.0[00] unit', 'btc')
                                 };

            console.log("Saldo - " +  walletBalance.balance);
            return {statusCode: 200,
                    status : "success",
                    data: walletBalance
            };
          } catch( exception ) {

            console.log("Erro ao recuperar saldo." + exception);
            return {statusCode: 404,
                    status : "error",
                    body: 'Erro ao recuperar saldo.' + exception
                  };
          }
        }else{
          console.log("Token Invalido");
          return {statusCode: 404,
                  status : "error",
                  body: 'Token Inválido'};
          }

        return {};
      }
    }
  });

  //Metododo responsavel em realizar tarnsferecia de fundos .
  //Recebe como paramentro :
  //token -> Validar qual o cliente está realizado a solicitação.
  //walletAddressFrom->Endereço da carteira de onde irá debitar o valor.
  //walletAddressTo->Endereço da carteira de onde irá creditar o valor
  //-> Endereço da carteira de onde irá debitar o valor .
  //Retorna o saldo disponivel da carteira.
  Api.addRoute('transaction',{
    post: {
      action: function(){

        //verifica se o objeto web3 está instaciado,
        //Se não instacia passando como paramentro o servidor que esta rodadno o ethereum
        if(typeof web3 === 'undefined')
          web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

        //Recupera o Token passado como paramentro na chamado do serviço
        token = this.bodyParams.token;
        //Se existir o cliente continua na transferencia de fundos. Caso contrario retorna erro 404, token invalido
        client = Clients.findOne({'token': token});

        if(client){
          try {

            console.log("*********************************************************************")
            console.log("Transferencia de Fundos");
            walletAddressFrom = this.bodyParams.walletAddressFrom;
            walletAddressTo = this.bodyParams.walletAddressTo;
            value = this.bodyParams.value;
            //valida se existe saldo para transferencia
            var balance = web3.eth.getBalance(walletAddressFrom);
            console.log(balance);

            if(balance < value ){
              return {statusCode: 404,
                      status : "error",
                      body: 'Saldo insuficiente.'
                    };
            }


            console.log("Conta desbloqueada ? " + web3.personal.unlockAccount(walletAddressFrom, "123456"));

            var ethTransaction = {
              "from": walletAddressFrom,
              "to": walletAddressTo,
              "value": web3.toWei(value, "ether")
            };

            console.log(ethTransaction);
            var hashTransaction = web3.eth.sendTransaction(ethTransaction);

            console.log("Transferencia de Fundos - Efetuada");

            console.log("Transferencia de Fundos - Salvar Transação");
            var newTransaction = {
              "date" : new Date(),
              "from": walletAddressFrom,
              "to": walletAddressTo,
              "value": value,
              "hash": hashTransaction,
              "token": token,
              "clientId": client._id
            };

            console.log(newTransaction);
            var transactionId = Transactions.insert( newTransaction );
            var ethTransaction = web3.eth.getTransaction(hashTransaction);

            console.log("Transferencia de Fundos - " );
            console.log(ethTransaction);
            console.log("*********************************************************************")
            return {statusCode: 200,
                    status : "success",
                    data: ethTransaction
            };
          } catch( exception ) {
            console.log("*********************************************************************")
            return {statusCode: 404,
                    status : "error",
                    body: 'Erro realizar transferecia de fundos.' + exception
                  };
          }
        }else{
          console.log("*********************************************************************")
          return {statusCode: 404,
                  status : "error",
                  body: 'Token Inválido'};
          }

        return {};
      }
    }
  });

  //Metododo responsavel em cadastrar colaborador e criar a sua carteira
  //Retorna json com o colaborador cadastrado
  Api.addRoute('collaborator',{
    post: {
      action: function(){

        console.log("Cadastro de Colaborador");

        //verifica se o objeto web3 está instaciado,
        //Se não instacia passando como paramentro o servidor que esta rodadno o ethereum
        if(typeof web3 === 'undefined')
          web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

        //Recupera o Token passado como paramentro na chamado do serviço
        token = this.bodyParams.token;
        //Busca o cliente que tenha o token cadastrado
        client = Clients.findOne({'token': token});
        //Se exisitir o cliente continua  na criação do colaborador. Caso contrario retorna erro 404, token invalido
        if(client){
          name = this.bodyParams.name;
          cpf = this.bodyParams.cpf;
          isActive = true;

          console.log("Cadstro de Colaborador - Cliente :" + client.name);
          var collaborator =  { "_id" : incrementCounter('countCollection', 'collaboratorId'),
                           "clientId" : client._id,
                           "name" : name,
                           "cpf":cpf,
                           "active":isActive,
                           "walletAddress": web3.personal.newAccount("123456") };

          console.log("Conta desbloqueada ? " + web3.personal.unlockAccount(collaborator.walletAddress, "123456"));

          console.log(collaborator);
          try {
            var collaboratorId = Collaborators.insert( collaborator );
            var cbt = Collaborators.findOne({"_id":collaboratorId});
            console.log("Cadstro de Colaborador - Cadastrado com Sucesso.");
            return {statusCode: 200,
                    status : "success",
                    data: cbt
            };
          } catch( exception ) {
            console.log("Cadstro de Colaborador - Error: :" + exception);
            return {statusCode: 404,
                    status : "error",
                    body: 'Erro ao salvar o colaborador.' + exception
                   }
          }
        }else{
          console.log("Cadstro de Colaborador - Token Invalido");
          return {statusCode: 404,
                  status : "error",
                  body: 'Token Inválido'};
        }

        return {};
      }
    }
  });


}

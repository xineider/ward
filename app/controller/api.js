// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var apiModel = require('../model/apiModel.js');
var control = new Control;
var model = new apiModel;
var data = '';
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {

	if (req.isAjaxRequest())
		res.send('request made through ajax.');

	res.send('normal http request');
});


router.post('/recuperar/senha', function(req, res, next) {
	var POST = req.body;
	var data_insert;
	var nova_senha;

	console.log('ESTOU NO RECUPERAR SENHA!!!!!!!!!!!!!!!!!');
	console.log(POST);
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');


	model.PesquisarEmail(POST.email).then(idEmail => {
		if(idEmail != ''){
			nova_senha = Math.random().toString(36).substring(7);
			data_insert = {id: idEmail[0].id, senha: nova_senha};
			model.AlterarSenhaUsuarioPorId(data_insert).then(data_alterado_sucesso =>{
				var html = "Olá, você está recebendo este e-mail pois pediu para recuperar sua senha"+
				"<br>Sua nova senha no Ward é: "+nova_senha+
				"<br>Caso não pediu para recuperar a sua senha entre em contato com o Administrador."+
				'<br><br>Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'<br>Não responda esta mensagem, ela é enviada automaticamente.';
				var text = "Olá, você está recebendo este e-mail pois pediu para recuperar sua senha"+
				"Sua nova senha no Ward é: "+nova_senha+
				"Caso não pediu para recuperar a sua senha entre em contato com o Administrador."+
				'Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'Não responda esta mensagem, ela é enviada automaticamente.';
				console.log(html);
				control.SendMail(POST.email, 'Recuperação de Senha - MurOn', html, text);				
				res.json(data_alterado_sucesso);
			});

		}else{
			res.json(['email_nao_cadastrado']);
		}
	});
});


module.exports = router;

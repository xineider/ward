// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var UsuariosModel = require('../model/usuariosModel.js');
var model = new UsuariosModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));


/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelecionarUsuarios().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/index', data: data, usuario: req.session.usuario});
	});
});
router.get('/criar', function(req, res, next) {
	model.SelecionarSetores().then(data_setores => {
		data['setores'] = data_setores;
		console.log(data);
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_criar', data: data, usuario: req.session.usuario});
	});
});

router.get('/criar', function(req, res, next) {
	model.SelecionarSetores().then(data_setores => {
		data['setores'] = data_setores;
		console.log(data);
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_criar', data: data, usuario: req.session.usuario});
	});
});

router.get('/alterarSenha/:id', function(req, res, next) {
	model.SelecionarUsuario(req.params.id).then(data_usuario=>{
		data['usuario'] = data_usuario;
		console.log('|||||||||||||||||||||||||| DATA ||||||||||||||||||||||');
		console.log(data);
		console.log('||||||||||||||||||||||||||||||||||||||||||||||||||||||');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_atualizar_senha', data: data, usuario: req.session.usuario});
	});
});




router.get('/editar/:id', function(req, res, next) {
	model.SelecionarSetores().then(data_setores => {
		data['setores'] = data_setores;
		model.SelecionarUsuario(req.params.id).then(data_usuario => {
			data['usuario'] = data_usuario;
			console.log('&&&&&&&&&&&&& EDITAR USUARIOS &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
			console.log(data);
			console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');

			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_editar', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/permissoes/', function(req, res, next) {
	model.SelecionarSetores().then(data_setores => {
		data['setores'] = data_setores;
		model.SelecionarUsuario(req.params.id).then(data_usuario => {
			data['usuario'] = data_usuario;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuario_permissoes', data: data, usuario: req.session.usuario});
		});
	});
});



router.get('/editar/perfil/:id', function(req, res, next) {
	model.SelecionarUsuario(req.params.id).then(data_usuario => {
		data['usuario'] = data_usuario;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_perfil_editar', data: data, usuario: req.session.usuario});
	});
});

// POSTS
router.post('/cadastrar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		var senha = Math.random().toString(36).substr(2, 8);
		POST.senha = senha;
		console.log('UUUUUUUUUUUUUU UUUSUARIO UUUUUUUUUUUUUUUUUUUUUUUUUU');
		console.log(POST);
		console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');

		model.VerificarSeTemLogin(POST.login).then(tem_login => {
			console.log('ttttttttttt tem login ttttt');
			console.log(tem_login);
			console.log('ttttttttttttttttttttttttttt');

			if(tem_login == ''){
				model.CadastrarUsuario(POST).then(data => {
					var to = POST.email;
					var subject = 'Você foi Cadastro no Ward!';
					var html = 'Bem vindo ao sistema jurídico Ward. Segue abaixo as informações sobre sua conta. \
					<br> <b>Login:</b>'+POST.login+'<br> \
					<br> <b>Senha:</b>'+senha+'<br>\
					Recomendamos que você altera sua senha ao acessar as suas configurações.<br>\
					Acesse via o link <a href="www.young.adv.br/ward" target="_blank">www.young.adv.br/ward</a><br> \
					Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão.<br>\
					<br><b>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!</b>';
					var text = 'Bem vindo ao sistema jurídico Ward. Segue abaixo as informações sobre sua conta.\
					Login:'+POST.login+'Senha:'+senha+' Recomendamos que você altera sua senha ao acessar as suas configurações\
					Acesse via o link www.young.adv.br/ward \
					Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão.\
					Por-favor não responda essa mensagem, pois ela é enviada automaticamente!';
					control.SendMail(to, subject, html, text);
					res.json(data);
				});
			}else{
				res.json('possui_login');
			}
		});
	});

router.post('/atualizar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		console.log('>>>>>>>>>>>>>>>>> POST >>>>>>>>>>>>>>>>>>>>');
		console.log(POST);
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		var to = POST.email;
		var subject = 'Seus dados foram atualizados no Ward!';
		var html = 'Olá, o Admnistrador do sistema Ward alterou os seus dados no Ward.Segue abaixo o seu Login. \
		<br> <b>Login:</b>'+POST.login+'<br> \
		A sua Senha não foi alterada. Por-favor confirmar os dados alterados, através do link <a href="www.young.adv.br/ward" target="_blank">www.young.adv.br/ward</a><br> \
		Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão.<br>\
		<br><b>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!</b>';
		var text = 'Olá, o Admnistrador do sistema Ward alterou os seus dados no Ward.Segue abaixo o seu Login.\
		Login:'+POST.login+' sua Senha não foi alterada. Por-favor confirmar os dados alterados, através do link www.young.adv.br/ward \
		Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão.\
		Por-favor não responda essa mensagem, pois ela é enviada automaticamente!';


		model.VerificarSeTemLoginDiferentePorId(POST.login,POST.id).then(tem_login_igual => {
			console.log('ttttttttttt tem login ttttt');
			console.log(tem_login_igual);
			console.log('ttttttttttttttttttttttttttt');

			if(tem_login_igual != ''){
				model.VerificarSeTemEmailDiferente(POST).then(data_email=>{
					console.log('@@@@@@@@@@@@@@@ DATA EMAIL @@@@@@@@@@@@@@@@@@@@@@@@@@@@');
					console.log(data_email);
					console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
					if(data_email != ''){
						model.AtualizarUsuario(POST).then(data => {
							res.json(data);							
						});
					}else{
						console.log('EMAIL DIFERENTE');
						control.SendMail(to, subject, html, text);
						model.AtualizarUsuario(POST).then(data => {
							res.json(data);							
						});
					}
				});
			}else{
				console.log('Login diferente!!!!!!!!');
				model.VerificarSeTemLogin(POST.login).then(tem_login => {
					if(tem_login == ''){
						model.VerificarSeTemEmailDiferente(POST).then(data_email=>{
							console.log('++++++++++++++++++++ data_email DO LOGIN DIFERENTE! ++++++++++++++++++++++');
							console.log(data_email);
							console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
							if(data_email != ''){
								model.AtualizarUsuario(POST).then(data => {
									res.json(data);							
								});
							}else{
								console.log('EMAIL DIFERENTE');
								control.SendMail(to, subject, html, text);
								model.AtualizarUsuario(POST).then(data => {
									res.json(data);							
								});
							}
						});
					}else{
						res.json('possui_login');						
					}
				});

			}
		});
	});



router.post('/alterarSenha', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	var senha = Math.random().toString(36).substr(2, 8);
	POST.senha = senha;

	model.SelecionarUsuario(POST.id).then(data_usuario=>{

		console.log('°°°°°°°°°°°°°°°°°°°° ALTERAR SENHA POST °°°°°°°°°°°°°°°°°°°');
		console.log(POST)
		console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
		console.log('************************* DATA USUARIO *************************');
		console.log(data_usuario);
		console.log('****************************************************************');

		var to = data_usuario[0].email;
		var subject = 'Sua Senha foi atualizado no Ward!';
		var html = 'Olá, o Admnistrador do sistema Ward alterou a sua senha da sua conta no Ward.Segue abaixo os seus dados: \
		<br> <b>Login:</b>'+data_usuario[0].login+'<br> \
		<br> <b>Senha:</b>'+senha+'<br>\
		Recomendamos que você altera sua senha ao acessar as suas configurações.<br>Acesse via o link <a href="www.young.adv.br/ward" target="_blank">www.young.adv.br/ward</a><br> \
		Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão.<br>\
		<br><b>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!</b>';
		var text = 'Olá, o Admnistrador do sistema Ward alterou a sua senha da sua conta no Ward.Segue abaixo os seus dados:\
		Login:'+data_usuario[0].login+' Senha:'+senha+ 'Recomendamos que você altera sua senha ao acessar as suas configurações.\
		Acesse via o link www.young.adv.br/ward \
		Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão.\
		Por-favor não responda essa mensagem, pois ela é enviada automaticamente!';

		console.log(html);
		control.SendMail(to, subject, html, text);

		model.AtualizarUsuario(POST).then(data =>{
			res.json(data);
		});
	});
});





router.post('/desativar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.DesativarUsuario(POST).then(data=> {
			res.json(data);
		});
	});

router.post('/ver/perfil/', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.LoadPerfil(POST.id).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_perfil_header', data: data});
		});
	});

module.exports = router;

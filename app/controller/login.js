// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var LoginModel = require('../model/loginModel.js');
var model = new LoginModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	console.log('estou no login mesmo');
	if (typeof req.session.id_usuario != 'undefined' && req.session.id_usuario != 0) {
		model.SelecionarEmpresaAtual(empresa_atual).then(data_empresa_atual =>{
			data.empresa_atual = data_empresa_atual;
			res.redirect('/sistema');
		});
	} else {
		var empresa_atual = model.GetEmpresaAtualLogin();
		model.SelecionarEmpresaAtual(empresa_atual).then(data_empresa_atual =>{
			data.empresa_atual = data_empresa_atual;
			res.render('login/index', {data:data});
		});

	}
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.senha = control.Encrypt(POST.senha);
	console.log('estou enviando dados para o post');
	console.log(POST);
	console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
	model.Login(POST).then(data => {
		console.log(data != [] && data.length > 0);
		if (data.length > 0) {
			req.session.usuario = {};
			req.session.usuario.id = data[0].id;
			req.session.usuario.hash_login = data[0].hash_login;
			req.session.usuario.nivel = data[0].nivel;
			req.session.usuario.nome = data[0].nome;
			req.session.usuario.imagem = data[0].imagem;
			model.LoadConfig(data[0].id).then(data => {
				req.session.usuario.config = data[0];
				res.redirect('/sistema');
			});
		} else {
			var empresa_atual = model.GetEmpresaAtualLogin();
			model.SelecionarEmpresaAtual(empresa_atual).then(data_empresa_atual =>{
				data.empresa_atual = data_empresa_atual;
				console.log('estou aqui no post do login');
				res.render('login/index', { data:data, erro: 'Login ou senha incorreto(s).', tipo_erro: 'login' });
			});
		}
	});
});


router.get('/buscar_cpf/:cpf', function(req, res, next) {

	cpf = req.params.cpf;
	console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFF NOME FACULDADE FFFFFFFFFFFFFFFFFFFFFFF');
	console.log(cpf);
	console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');

	model.SelecioneClientesPorCpf(cpf).then(data => {
		console.log('========================= procurar faculdade ===================');
		console.log(data);
		console.log('===============================================================');
		res.json(data);
	});
});









module.exports = router;

// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var ContatosModel = require('../model/contatosModel.js');
var model = new ContatosModel;
var data = '';
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelecioneContatos().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'contatos/index', data: data, usuario: req.session.usuario});
	});
});
router.get('/criar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'contatos/contatos_criar', data: data, usuario: req.session.usuario});
});
router.get('/editar/:id', function(req, res, next) {
	var id = req.params.id;
	model.SelecionarContato(id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'contatos/contatos_editar', data: data, usuario: req.session.usuario});
	});
});
router.get('/ver/lista/:id', function(req, res, next) {
	var id = req.params.id;
	model.SelecionarContatoLista(id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'contatos/contatos_lista_todos', data: data, usuario: req.session.usuario});
	});
});
router.get('/adicionar/lista', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'contatos/contatos_lista', data: data, usuario: req.session.usuario});
});

	router.post('/pesquisar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.ProcurarContatos(POST).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'contatos/tabela_interna_only', data: data, usuario: req.session.usuario});
		});
	});

	router.post('/cadastrar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.CadastrarContato(POST).then(data => {
			console.log('°°°°°°°°°°°°°°°°°°°° CONTROLLER DO CADASTRO DE CONTATOS °°°°°°°°°°°°°°°°°°°°°°°°°°°');
			console.log(POST);
			console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
			res.json(data);
		});
	});

	router.post('/atualizar/', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.AtualizarContato(POST).then(data => {
			res.json(data);
		});
	});

	router.post('/desativar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
  	model.DesativarContato(POST).then(data=> {
  		res.json(data);
  	});
	});

module.exports = router;

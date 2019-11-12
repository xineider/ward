// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var FerramentasModel = require('../model/ferramentasModel.js');
var model = new FerramentasModel;
var data = '';
var app = express();
app.use(require('express-is-ajax-request'));

router.get('/', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'ferramentas/index', data: data, usuario: req.session.usuario});
});
router.get('/pesquisar/cep', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'ferramentas/cep', data: data, usuario: req.session.usuario});
});
router.get('/gerenciador/senhas', function(req, res, next) {
	model.GetSenhas(req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'ferramentas/gerenciador_senha', data: data, usuario: req.session.usuario});
	});
});
router.get('/gerenciador/senhas/criar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'ferramentas/gerenciador_senha_criar', data: data, usuario: req.session.usuario});
});
router.get('/gerenciador/senhas/editar/:id', function(req, res, next) {
	var id = req.params.id;
	model.GetSenha(id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'ferramentas/gerenciador_senha_editar', data: data, usuario: req.session.usuario});
	});
});

router.post('/gerenciador/senhas/cadastrar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.id_usuario = req.session.usuario.id;
	model.CadastrarSenha(POST).then(data => {
		res.json(data);
	});
});

router.post('/gerenciador/senhas/atualizar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.AtualizarSenha(POST).then(data => {
		res.json(data);
	});
});
router.post('/gerenciador/senhas/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarDocumento(POST).then(data=> {
		res.json(data);
	});
});


module.exports = router;

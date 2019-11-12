// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var SetoresModel = require('../model/setoresModel.js');
var model = new SetoresModel;
var data = '';
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelecioneSetores().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'setores/index', data: data, usuario: req.session.usuario});
	});
});
router.get('/criar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'setores/setores_criar', data: data, usuario: req.session.usuario});
});
router.get('/editar/:id', function(req, res, next) {
	var id = req.params.id;
	model.SelecionarSetor(id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'setores/setores_editar', data: data, usuario: req.session.usuario});
	});
});

	router.post('/cadastrar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.CadastrarSetor(POST).then(data => {
			res.json(data);
		});
	});

	router.post('/atualizar/', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.AtualizarSetor(POST).then(data => {
			res.json(data);
		});
	});

	router.post('/desativar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
  	model.DesativarSetor(POST).then(data=> {
  		res.json(data);
  	});
	});

module.exports = router;

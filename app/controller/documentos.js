// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var DocumentosModel = require('../model/documentosModel.js');
var model = new DocumentosModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

router.get('/', function(req, res, next) {
	model.GetDocumentosTarefas(req.session.usuario.id).then(data_tarefas => {
		data.tarefas = data_tarefas;
		model.GetPastas(req.session.usuario.id).then(data_docs => {
			data.docs = data_docs;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'documentos/index', data: data, usuario: req.session.usuario});
		});
	});
});
router.get('/arquivos/:id', function(req, res, next) {
	model.GetDocumentos(req.session.usuario.id, req.params.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'documentos/documentos', data: data, usuario: req.session.usuario});
	});
});
router.get('/adicionar', function(req, res, next) {
	model.GetPastasTodas(req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'documentos/documentos_adicionar', data: data, usuario: req.session.usuario});
	});
});
router.get('/adicionar/pasta', function(req, res, next) {
	model.GetPastasTodas(req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'documentos/documentos_adicionar_pasta', data: data, usuario: req.session.usuario});
	});
});
router.get('/ver/usuario/:id', function(req, res, next) {
	var id = req.params.id;
	model.VerDocumentosUsuario(id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'documentos/documentos_usuario_ver', data: data, usuario: req.session.usuario});
	});
});

router.post('/pesquisar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.ProcurarDocumentos(POST, req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'documentos/documentos_interna_index', data: data, usuario: req.session.usuario});
	});
});
router.post('/cadastrar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]] CADASTRAR DOCUMENTO ]]]]]]]]]]]]]]]]]]]]]]]]]]');
	console.log(POST);
	console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');

	model.CadastrarDocumento(POST).then(data => {
		res.json(data);
	});
});
router.post('/cadastrar/pasta', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.id_usuario = req.session.usuario.id;
	model.CadastrarPasta(POST).then(data => {
		res.json(data);
	});
});
router.post('/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarDocumento(POST).then(data=> {
		res.json(data);
	});
});
router.post('/uploadarquivo', function(req, res, next) {
  var sampleFile = req.files.arquivo;
  var nome = control.DateTimeForFile()+'_'+sampleFile.name;

  console.log('SSSSSSSSSSSSSSSSSSS sampleFile SSSSSSSSSSSSSSSSSSSSSS');
  console.log(sampleFile);
  console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./assets/uploads/'+nome, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

		res.json(nome);
  });
});


module.exports = router;

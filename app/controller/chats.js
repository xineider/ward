// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var chatsModel = require('../model/chatsModel.js');
var model = new chatsModel;
var data = '';
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	if(req.session.usuario.nivel)
	model.SelecioneChats(req.session.usuario.id,req.session.usuario.nivel).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'chats/index', data: data, usuario: req.session.usuario});
	});
});

router.get('/novidades/', function(req, res, next) {
	model.VerificarNovasMensagens(req.session.usuario.id).then(data => {
		res.json(data);
	});
});

// POSTS
router.post('/mensagens/', function(req, res, next) {
	POST = req.body;
	console.log('PPPPPPPPPPPPPPPPPPPPP POST MENSAGENS PPPPPPPPPPPPPPPPPP');
	console.log(POST);
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
	model.SelecioneMensagens(POST).then(data => {
		model.SetVisualizado(POST).then(data=>{

		});
		console.log('MMMMMMMMMMMMMMMMMM MENSAGENS MMMMMMMMMMMMMMMMMMM');
		console.log(data);
		console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'chats/chats_conteudo', data: data, id_para: POST.id_usuario_enviado});
	});
});

router.post('/mensagensGrupo/', function(req, res, next) {
	POST = req.body;
	console.log('QQQQQQQQQQQQQQQQQQ POST MENSAGENS QQQQQQQQQQQQQQQQQQQQQQ');
	console.log(POST);
	console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');
	model.SelecioneMensagensGrupo(POST).then(data => {
		model.SetVisualizadoGrupo(POST).then(data=>{

		});
		console.log('ççççççççççççççççççç MENSAGENS çççççççççççççç');
		console.log(data);
		console.log('çççççççççççççççççççççççççççççççççççççççççççç');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'chats/chats_conteudo_grupo', data: data,usuario: req.session.usuario});
	});
});


router.post('/enviarmensagem/', function(req, res, next) {
	POST = req.body;
	model.AdicionarMensagens(POST).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'chats/chats_conteudo', data: data, id_para: POST.id_usuario_enviado});
	});
});

router.post('/enviarmensagemgrupo/', function(req, res, next) {
	POST = req.body;
	console.log('êêêêêêêêêêê enviarmensagemgrupo êêêêêêêêêêêêêêêêêê');
	console.log(POST);
	console.log('êêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêê');
	model.AdicionarMensagensGrupo(POST).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'chats/chats_conteudo_grupo', data: data,usuario: req.session.usuario});
	});
});







module.exports = router;

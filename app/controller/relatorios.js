// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var RelatoriosModel = require('../model/relatoriosModel.js');
var model = new RelatoriosModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));


router.get('/', function(req, res, next) {

	model.SelecionarTodasParcelas().then(data_todas_parcelas => {
		console.log(data_todas_parcelas);
		data.todas_parcelas = data_todas_parcelas;
		console.log('rRrRrRrRrRrRrRrRrR Relatórios rRrRrRrRrRrRrRrRr');
		console.log(data.todas_parcelas);
		console.log('rRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRr');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'relatorios/index', data: data, usuario: req.session.usuario});
	});
});


router.get('/adicionar-parcela',function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'relatorios/cadastro_parcela', data: data, usuario: req.session.usuario});
});


router.get('/editar-parcela/:id',function(req, res, next){
	var id = req.params.id;

	console.log('•••••••••••••••••• ID DA PARCELA ••••••••••••••••••••');
	console.log(id);
	console.log('•••••••••••••••••••••••••••••••••••••••••••••••••••••');

	model.SelecionarParcelaPorId(id).then(data_parcela =>{
		data.parcela = data_parcela;
		console.log('EEEEEEEEEEEEEEEEEEEE EDITAR PARCELA EEEEEEEEEEEEEEEEEEEEEEE');
		console.log(data.parcela);
		console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'relatorios/editar_parcela', data: data, usuario: req.session.usuario});
	});
});





router.post('/desativar-parcela/:idProcesso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	var idProcesso = req.params.idProcesso;


	console.log('PPPPPPPPPPPPPP POST DESATIVAR PARCELA PPPPPPPPPPPPP');
	console.log(POST);
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');


	model.DesativarParcela(POST).then(datadeletado=> {
		model.SelecionarParcelasDoProcesso(idProcesso).then(data_parcelas_processo =>{
			data.parcelas = data_parcelas_processo;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/tabela_parcelas_only', data: data, usuario: req.session.usuario});
		});
	});
});


module.exports = router;

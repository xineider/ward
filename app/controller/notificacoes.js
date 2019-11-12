// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var NotificacoesModel = require('../model/notificacoesModel.js');
var model = new NotificacoesModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.GetNotificacoes(req.session.usuario.id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'notificacoes/index', data: data, usuario: req.session.usuario});
	});
});



router.get('/ultimasNotificacoes/', function(req, res, next) {
	model.GetUltimasNotificacoes(req.session.usuario.id).then(data=>{
		console.log('----------------- GetUltimasNotificacoes -----------------------');
		console.log(data);
		console.log('----------------------------------------------------------------');
		res.json(data);
	});
});




router.get('/remover_visto/:id', function(req, res, next) {
	var id = req.params.id;
	data_visto = {id:id,visto:1};
	console.log('=============== remover_visto ===================');
	console.log(data_visto);
	console.log('=============================================');
	model.AtualizarNotificacao(data_visto).then(data=>{
		res.json(data);
	});
});


router.post('/marcarTodosVistos', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP marcarTodosVistos PPPPPPPPPPPPPPPPPPPPPPPP');
	console.log(POST);
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
	model.GetTodasNotificacoesNaoVistas(req.session.usuario.id).then(data_id_nao_visto=>{
		console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC DATA_ID_NAO VISTO CCCCCCCCCCCCCCCCCC');
		console.log(data_id_nao_visto);
		console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
		console.log(data_id_nao_visto.length);

		if(data_id_nao_visto != ''){

			/*Crio um array com todos os id e depois coloco dentro de um objeto data.lista*/
			var arrayApoio = [];
			for(i=0; i < data_id_nao_visto.length; i++){
				arrayApoio.push(data_id_nao_visto[i].id);			
			}

			console.log(arrayApoio);
			data.lista = {id:arrayApoio};
			console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
			console.log(data);
			console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');

			model.AtualizarTodasNaoVistas(data).then(data_final=>{
				res.json(data);
			});
		}else{
			console.log('entrei no else');
			res.json('');
		}

	});
});



module.exports = router;

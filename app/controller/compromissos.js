// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var CompromissosModel = require('../model/compromissosModel.js');
var model = new CompromissosModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));


/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelecionarEventos().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/index', data: data, usuario: req.session.usuario});
	});
});




router.get('/criar_pessoal', function(req, res, next) {
	model.SelecionarProcesso().then(data_processo => {
		data.processo = data_processo;
		model.SelecionarAdvogados().then(data_advogados =>{
			data.advogados = data_advogados;
			model.SelecionarTempo().then(data_tempo =>{
				data.tempo = data_tempo;
				console.log(']]]]]]]]]]]]]]]]]]]]]]]] CRIAR COMPROMISSOS DATA ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
				console.log(data);
				console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/compromissos_criar_pessoal', data: data, usuario: req.session.usuario});
			});
		});
	});
});



router.get('/criar_distribuicao', function(req, res, next) {
	model.SelecionarProcesso().then(data_processo => {
		data.processo = data_processo;
		model.SelecionarAdvogados().then(data_advogados =>{
			data.advogados = data_advogados;
			model.SelecionarTempo().then(data_tempo =>{
				data.tempo = data_tempo;
				console.log(']]]]]]]]]]]]]]]]]]]]]]]] CRIAR COMPROMISSOS DATA ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
				console.log(data);
				console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/compromissos_criar_distribuicao', data: data, usuario: req.session.usuario});
			});
		});
	});
});


router.get('/criar_pauta_compromissos', function(req, res, next) {
	model.SelecionarProcesso().then(data_processo => {
		data.processo = data_processo;
		model.SelecionarAdvogados().then(data_advogados =>{
			data.advogados = data_advogados;
			console.log(']]]]]]]]]]]]]]]]]]]]]]]] CRIAR COMPROMISSOS DATA ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
			console.log(data);
			console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/compromissos_criar_pauta_compromissos', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/criar_pauta_julgamento', function(req, res, next) {
	model.SelecionarProcesso().then(data_processo => {
		data.processo = data_processo;
		model.SelecionarAdvogados().then(data_advogados =>{
			data.advogados = data_advogados;
			console.log(']]]]]]]]]]]]]]]]]]]]]]]] CRIAR COMPROMISSOS DATA ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
			console.log(data);
			console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/compromissos_criar_pauta_julgamento', data: data, usuario: req.session.usuario});
		});
	});
});



router.get('/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! cliquei no editar!!!!!!!!!!!!');
	console.log(id);
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	model.SelecionarEventoEspecifico(id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/compromissos_editar', data: data, usuario: req.session.usuario});
	});
});

router.get('/editar_controle_distribuicao/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! cliquei no editar!!!!!!!!!!!!');
	console.log(id);
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	model.SelecionarEventoEspecifico(id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/controle_distribuicao_editar', data: data, usuario: req.session.usuario});
	});
});

router.get('/editar_pauta_compromisso/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! cliquei no editar!!!!!!!!!!!!');
	console.log(id);
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	model.SelecionarEventoEspecifico(id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/pauta_compromisso_editar', data: data, usuario: req.session.usuario});
	});
});

router.get('/editar_pauta_julgamento/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! cliquei no editar!!!!!!!!!!!!');
	console.log(id);
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	model.SelecionarEventoEspecifico(id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/pauta_julgamento_editar', data: data, usuario: req.session.usuario});
	});
});


router.get('/eventos', function(req, res, next) {
	model.SelecionarEventos(req.session.usuario.id).then(data => {
		res.json(data);
	});
});

router.get('/pauta_compromisso', function(req, res, next) {
	model.SelecioneClientes().then(data_clientes => {
		data.clientes = data_clientes;
		model.SelecioneAdversos().then(data_adversos => {
			data.adversos = data_adversos;
			model.SelecioneComarcas().then(data_comarcas => {
				data.comarcas = data_comarcas;
				model.SelecionarAdvogados().then(data_advogados => {
					data.advogados = data_advogados;
					model.SelecionarEventosPorTipoCompromisso(0).then(data_compromisso => {
						data.compromisso = data_compromisso;
						model.SelecionarEventosRelatorioPorTipoCompromisso(0).then(data_relatorio => {
							data.relatorio = data_relatorio;
							data.link_editar = 'editar_pauta_compromisso';
							data.back = 'pauta_compromisso';
							data.link_pesquisar = 'pauta_compromisso/pesquisar/';
							console.log('====== data pauta compromisso =============');
							console.log(data);
							console.log('===========================================');
							res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/pauta_compromisso', data: data, usuario: req.session.usuario});
						});
					});
				});
			});
		});
	});
});


router.get('/controle_distribuicao', function(req, res, next) {
	model.SelecioneClientes().then(data_clientes => {
		data.clientes = data_clientes;
		model.SelecioneAdversos().then(data_adversos => {
			data.adversos = data_adversos;
			model.SelecioneComarcas().then(data_comarcas => {
				data.comarcas = data_comarcas;
				model.SelecionarAdvogados().then(data_advogados => {
					data.advogados = data_advogados;
					model.SelecionarEventosPorTipoCompromisso(1).then(data_compromisso => {
						data.compromisso = data_compromisso;
						model.SelecionarEventosRelatorioPorTipoCompromisso(1).then(data_relatorio => {
							data.relatorio = data_relatorio;
							data.link_editar = 'editar_controle_distribuicao';
							data.back = 'controle_distribuicao';
							data.link_pesquisar = 'controle_distribuicao/pesquisar/';

							console.log('‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼ DATA COMPROMISSO ‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼');
							console.log(data);
							console.log('‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼‼');
							res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/controle_distribuicao', data: data, usuario: req.session.usuario});
						});
					});
				});
			});
		});
	});
});


router.get('/pauta_julgamento', function(req, res, next) {
	model.SelecioneClientes().then(data_clientes => {
		data.clientes = data_clientes;
		model.SelecioneAdversos().then(data_adversos => {
			data.adversos = data_adversos;
			model.SelecioneComarcas().then(data_comarcas => {
				data.comarcas = data_comarcas;
				model.SelecionarAdvogados().then(data_advogados => {
					data.advogados = data_advogados;
					model.SelecionarEventosPorTipoCompromisso(2).then(data_compromisso => {
						data.compromisso = data_compromisso;
						model.SelecionarEventosRelatorioPorTipoCompromisso(2).then(data_relatorio => {
							data.relatorio = data_relatorio;
							data.link_editar='editar_pauta_julgamento';
							data.back = 'pauta_julgamento';
							data.link_pesquisar = 'pauta_julgamento/pesquisar/';
							res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/pauta_julgamento', data: data, usuario: req.session.usuario});
						});
					});
				});
			});
		});
	});
});




router.post('/cadastrar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		console.log('CCCCCCCCCCCCC CADASTRAR COMPROMISSO CCCCCCCCCCCCCCCCCCCCCCCCCC');
		console.log(POST);
		console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
		
		var texto_notf = 'Adicionado Compromisso "' + POST.nome+'"';

		data_notificacao = {id_usuario_criador:req.session.usuario.id,id_usuario: req.session.usuario.id,
			texto:texto_notf,link:'/compromissos',deletado:1}




			if(POST.tipo_compromisso == 1){
				data_notificacao = {id_usuario_criador:req.session.usuario.id, id_usuario: POST.id_advogado_setor,
					texto:texto_notf,link:'/compromissos/controle_distribuicao'};

				}else if(POST.tipo_compromisso == 2){
					data_notificacao = {id_usuario_criador:req.session.usuario.id, id_usuario: POST.id_advogado_setor,
						texto:texto_notf,link:'/compromissos/pauta_julgamento'};

					}else if(POST.tipo_compromisso == 0){
						data_notificacao = {id_usuario_criador:req.session.usuario.id, id_usuario: POST.id_advogado_setor,
							texto:texto_notf,link:'/compromissos/pauta_compromisso'};

						}

						console.log('NNNNNNNNNNNNN data_notificao NNNNNNNNNNNNNNNNNNNNNNNNN');
						console.log(data_notificacao);
						console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');

						model.CadastrarNotificacao(data_notificacao).then(data_not=>{
							model.CadastrarCompromisso(POST).then(data => {
								res.json(data);
							});
						});
					});

router.post('/atualizar/', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		console.log('=============== Atualizar ===================');
		console.log(POST);
		console.log('=============================================');

		/*para postagens próprias onde não há advogado do compromisso*/
		if(POST.id_advogado_compromisso != undefined){
			model.VerificarSeOutroAdvogadoNoCompromisso(POST.id_advogado_compromisso,POST.id).then(data_novo_advogado => {
				console.log('---------- DATA_ADVOGADO ------------------');
				console.log(data_novo_advogado);
				console.log('-------------------------------------------');
				if(data_novo_advogado == '' || data_novo_advogado == undefined){
					var texto_notf = 'Adicionado Compromisso "' + POST.nome+'"';
					data_notificacao = {id_usuario_criador:req.session.usuario.id, id_usuario: POST.id_advogado_compromisso,
						texto:texto_notf};

						if(POST.tipo_compromisso == 1){
							data_notificacao['link'] = '/compromissos/controle_distribuicao';
						}else if(POST.tipo_compromisso == 2){
							data_notificacao['link'] = '/compromissos/pauta_julgamento';
						}else if(POST.tipo_compromisso == 0){
							data_notificacao['link'] = '/compromissos/pauta_compromisso';
						}else{
							data_notificacao['link'] = '/compromissos/';
						}

						model.CadastrarNotificacao(data_notificacao).then(data_not=>{
							model.AtualizarCompromisso(POST).then(data => {
								res.json(data);
							});
						});

					}else{
						console.log('EEEEEEEE CAI NO ELSE EEEEEEEEEEEEEEEEEEE');
						console.log(POST);
						console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');

						model.AtualizarCompromisso(POST).then(data => {
							res.json(data);
						});
					}
				});
		}else{
			console.log('9999999999999999999999999999 else 9999999999999999999999999');
			console.log(POST);
			console.log('99999999999999999999999999999999999999999999999999999999999');

			model.AtualizarCompromisso(POST).then(data => {
				res.json(data);
			});
		}
	});

router.post('/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('---------------- Desativar ------------------------');
	console.log(POST);
	console.log('---------------------------------------------------');
	model.DesativarCompromisso(POST).then(data=> {
		res.json(data);
	});
});


router.post('/pauta_compromisso/pesquisar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺ Pesquisar ☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺');
	console.log(POST);
	console.log('☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺');
	model.ProcurarCompromisso(POST,0).then(data_compromisso => {
		console.log('┤┤┤┤┤┤┤┤ data_compromisso ┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤');
		console.log(data_compromisso);
		console.log('┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤');
		data.compromisso = data_compromisso;
		model.ProcurarCompromissoRelatorio(POST,0).then(data_relatorio => {
			data.relatorio = data_relatorio;
			data.link_editar = 'editar_pauta_compromisso';
			data.back = 'pauta_compromisso';
			console.log('♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪ DATA ♪♪♪♪♪♪♪♪');
			console.log(data_relatorio);
			console.log('♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/tabela_interna_e_relatorio', data: data, usuario: req.session.usuario});
		});
	});
});


router.post('/controle_distribuicao/pesquisar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺ Pesquisar ☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺');
	console.log(POST);
	console.log('☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺');
	model.ProcurarCompromisso(POST,1).then(data_compromisso => {
		console.log('┤┤┤┤┤┤┤┤ data_compromisso ┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤');
		console.log(data_compromisso);
		console.log('┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤');
		data.compromisso = data_compromisso;
		model.ProcurarCompromissoRelatorio(POST,1).then(data_relatorio => {
			data.relatorio = data_relatorio;
			data.link_editar = 'editar_controle_distribuicao';
			data.back='controle_distribuicao';
			console.log('♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪ DATA ♪♪♪♪♪♪♪♪');
			console.log(data_relatorio);
			console.log('♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/tabela_interna_e_relatorio', data: data, usuario: req.session.usuario});
		});
	});
});

router.post('/pauta_julgamento/pesquisar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺ Pesquisar ☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺');
	console.log(POST);
	console.log('☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺☺');
	model.ProcurarCompromisso(POST,2).then(data_compromisso => {
		console.log('┤┤┤┤┤┤┤┤ data_compromisso ┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤');
		console.log(data_compromisso);
		console.log('┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤┤');
		data.compromisso = data_compromisso;
		model.ProcurarCompromissoRelatorio(POST,2).then(data_relatorio => {
			data.relatorio = data_relatorio;
			data.link_editar='editar_pauta_julgamento';
			data.back = 'pauta_julgamento';
			console.log('♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪ DATA ♪♪♪♪♪♪♪♪');
			console.log(data_relatorio);
			console.log('♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'compromissos/tabela_interna_e_relatorio', data: data, usuario: req.session.usuario});
		});
	});
});




module.exports = router;

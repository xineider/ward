// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var IndexModel = require('../model/indexModel.js');
var model = new IndexModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	var id_usuario = req.session.usuario.id;
	// var id_usuario = 1;
	var empresa_atual = model.GetEmpresaAtualLogin();
	model.SelecionarEmpresaAtual(empresa_atual).then(data_empresa_atual =>{
		data.empresa_atual = data_empresa_atual;
		model.GetUltimasTarefas(id_usuario).then(data_tarefas => {
			data.tarefas = data_tarefas;
			model.GetUltimasTarefasPrazo(id_usuario).then(data_tarefas_prazo => {
				data.tarefas_prazo =data_tarefas_prazo;
				model.GetUltimasMensagens(id_usuario).then(data_mensagens => {
					data.mensagens = data_mensagens;
					model.GetUltimasNotificacoes(id_usuario).then(data_notificacoes => {
						data.notificacoes = data_notificacoes;
						model.GetNotificacoesQtdNaoVistas(id_usuario).then(data_notificacoes_qtd=>{
							data.qtdnotificacoes = data_notificacoes_qtd;
							console.log('----------------- ULTIMAS notificacoes -----------------------------');
							console.log(data);
							console.log('--------------------------------------------------------------------');
							res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'inicio/index', data: data, usuario: req.session.usuario});
						});
					});
				});
			});
		});
	});
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('estou aqui no post do index');
	console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
	model.Login(POST).then(data => {
		if (results.length > 0) {
			req.session.id_usuario = results[0].id;
			var empresa_atual = model.GetEmpresaAtualLogin();
			model.SelecionarEmpresaAtual(empresa_atual).then(data_empresa_atual =>{
				data.empresa_atual = data_empresa_atual;
				console.log('estou aqui no post do login');
				res.redirect('/sistema',{data:data});
			});
		} else {
			var empresa_atual = model.GetEmpresaAtualLogin();
			model.SelecionarEmpresaAtual(empresa_atual).then(data_empresa_atual =>{
				data.empresa_atual = data_empresa_atual;
				console.log('estou aqui no post do login');
				res.render('login/index', { erro: 'Login ou senha incorreto(s).', tipo_erro: 'login' });
			});
		}
	});

});

router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
		console.log(err);
	});

	var empresa_atual = model.GetEmpresaAtualLogin();
	model.SelecionarEmpresaAtual(empresa_atual).then(data_empresa_atual =>{
		data.empresa_atual = data_empresa_atual;
		res.render('login/index', {data:data});
	});

});

module.exports = router;

// PADRÃO
var express = require('express');
const fileUpload = require('express-fileupload');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var TarefasModel = require('../model/tarefasModel.js');
var model = new TarefasModel;
var data = {};
var app = express();
router.use(fileUpload());
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelecioneTodasTarefasDoUsuario(req.session.usuario.id,req.session.usuario.nivel).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'tarefas/index', data: data, usuario: req.session.usuario});
	});
});

router.get('/tarefas', function(req, res, next) {
	model.SelecioneTodasTarefasDoUsuario(req.session.usuario.id,req.session.usuario.nivel).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'tarefas/tarefas', data: data, usuario: req.session.usuario});
	});
});




router.get('/criar', function(req, res, next) {
	model.SelecioneUsuarios(req.session.usuario.nivel).then(data_usuarios => {
		data['usuarios'] = data_usuarios;
		model.SelecioneGerentes().then(data_gerentes => {
			data['gerentes'] = data_gerentes;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'tarefas/tarefas_criar', data: data, usuario: req.session.usuario});
		});
	});
});


router.get('/sac', function(req, res, next) {
	model.SelecioneRequisicoes().then(data_requisicoes => {
		data['requisicao'] = data_requisicoes;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'tarefas/pipeline', data: data, usuario: req.session.usuario});
	});
});



router.get('/administracao', function(req, res, next) {
	model.SelecioneRequisicoes().then(data_requisicoes => {
		data['requisicao'] = data_requisicoes;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'tarefas/indexAdministracao', data: data, usuario: req.session.usuario});
	});
});






router.get('/gettopico', function(req, res, next) {
	console.log('getTopico');
	console.log('gggggggggggggggggggggggggggggggggggggggggggggggggggggggg');
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'tarefas/tarefas_topico', data: data, usuario: req.session.usuario});
});

router.get('/ver/topico/:id', function(req, res, next) {
	var id = req.params.id;
	model.SelecioneTopicos(id).then(data_topicos => {
		data.topicos = data_topicos;
		model.SelecioneInfos(id).then(data_infos => {
			data.infos = data_infos;
			model.SelecioneUploads(id).then(data_uploads => {
				data.uploads = data_uploads;
				model.SelecioneComentarios(id).then(data_comentarios => {
					data.comentarios = data_comentarios;
					console.log('ttttttttttttttttt topico ttttttttttttttttttttttttttttttttt');
					console.log(data);
					console.log('tttttttttttttttttttttttttttttttttttttttttttttttttttttttttt');
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'tarefas/tarefas_topicos_index', id_tarefa: id, data: data, usuario: req.session.usuario});
				});
			});
		});
	});
});
router.get('/ver/tarefas/:id', function(req, res, next) {
	var id = req.params.id;
	model.SelecionarTarefa(id,req.session.usuario.nivel).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'tarefas/tarefas_usuario', id_tarefa: id, data: data, usuario: req.session.usuario});
	});
});

// POSTS
router.post('/concluir', function(req, res, next) {
	var id = req.session.usuario.id;
	var POST = req.body;

	model.SelecioneInfos(POST.id_tarefa).then(data_tarefa=>{
		var texto_notf = 'Concluída Tarefa "' + data_tarefa[0].nome+'"';
		data_notificacao = {id_usuario_criador:req.session.usuario.id,id_usuario: data_tarefa[0].id_responsavel,
			texto:texto_notf,link:'/tarefas/tarefas'};
			model.CadastrarNotificacao(data_notificacao).then(data_not=>{
				atualizarTarefa = {id:POST.id_tarefa,status:POST.status};
				model.AtualizarTarefa(atualizarTarefa).then(data => {
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'tarefas/tarefas_usuario', id_tarefa: id, data: data, usuario: req.session.usuario});
				});
			});
		});
});

router.post('/uploadarquivo', function(req, res, next) {
	var sampleFile = req.files.arquivo;
	var nome = control.DateTimeForFile()+'_'+sampleFile.name;
	var id = req.headers['authority-optima-id'];

	model.CadastraArquivo(id, nome).then(data => {
		  // Use the mv() method to place the file somewhere on your server
		  sampleFile.mv('./assets/uploads/'+nome, function(err) {
		  	if (err) {
		  		return res.status(500).send(err);
		  	}

		  	res.json(nome);
		  });
		});
});

router.post('/cadastrar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;

		console.log('CCCCCCCC CADASTRAR TAREFA CCCCCCCCCCCCCC');
		console.log(POST);
		console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');

		var texto_notf = 'Criada a Tarefa "' + POST.tarefa.nome+'"';

		if(req.session.usuario.id == POST.tarefa.id_usuario){

			data_notificacao = {id_usuario_criador:req.session.usuario.id,id_usuario: POST.tarefa.id_responsavel,
				texto:texto_notf,link:'/tarefas/tarefas'};
				console.log('NNNNN NOTIFICACAO NNNNNNNNN');
				console.log(data_notificacao);
				console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN');
				model.CadastrarNotificacao(data_notificacao).then(data_not=>{
					model.CadastrarTarefa(POST).then(data => {
						res.json(data);
					});
				});

			}else if (req.session.usuario.id == POST.tarefa.id_responsavel){
				data_notificacao = {id_usuario_criador:req.session.usuario.id,id_usuario: POST.tarefa.id_usuario,
					texto:texto_notf,link:'/tarefas/tarefas'};
					console.log('NNNNN NOTIFICACAO NNNNNNNNN else if');
					console.log(data_notificacao);
					console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN');
					model.CadastrarNotificacao(data_notificacao).then(data_not=>{
						model.CadastrarTarefa(POST).then(data => {
							res.json(data);
						});
					});
				}else{

					data_notificacao1 = {id_usuario_criador:req.session.usuario.id,id_usuario: POST.tarefa.id_responsavel,
						texto:texto_notf,link:'/tarefas/tarefas'};

						data_notificacao2 = {id_usuario_criador:req.session.usuario.id,id_usuario: POST.tarefa.id_usuario,
							texto:texto_notf,link:'/tarefas/tarefas'};

							console.log('NNNNN NOTIFICACAO 1 NNNNNNNNN');
							console.log(data_notificacao1);
							console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN');

							console.log('NNNNN NOTIFICACAO 2 NNNNNNNNN');
							console.log(data_notificacao2);
							console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN');

							model.CadastrarNotificacao(data_notificacao1).then(data_not=>{
								model.CadastrarNotificacao(data_notificacao2).then(data_not2=>{
									model.CadastrarTarefa(POST).then(data => {
										res.json(data);
									});
								});
							});


						}

					});

router.post('/cadastrar/comentario', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		atualizarTarefa = {id:POST.id_tarefa,status:POST.status};

		console.log('------------- POST----------');
		console.log(POST);
		console.log('----------------------------');
		console.log(POST.status);

		if(POST.texto != ''){
			comentario = {id_tarefa:POST.id_tarefa,texto:POST.texto};
			model.CadastrarTarefaComentario(comentario, req.session.usuario.id).then(data_c => {
				
				if(POST.status == 3){
					model.SelecioneInfos(POST.id_tarefa).then(data_tarefa=>{
						var texto_notf = 'Concluída Tarefa "' + data_tarefa[0].nome+'"';
						data_notificacao = {id_usuario_criador:req.session.usuario.id,id_usuario: data_tarefa[0].id_responsavel,
							texto:texto_notf,link:'/tarefas/tarefas'};
							model.CadastrarNotificacao(data_notificacao).then(data_not=>{
								model.AtualizarTarefa(atualizarTarefa).then(data => {
									res.json('novo_comentario');
								});
							});
						});
				}else{
					model.AtualizarTarefa(atualizarTarefa).then(data => {
						res.json('novo_comentario');
					});
				}

			});

		}else{
			if(POST.status == 3){
				model.SelecioneInfos(POST.id_tarefa).then(data_tarefa=>{
					var texto_notf = 'Concluída Tarefa "' + data_tarefa[0].nome+'"';
					data_notificacao = {id_usuario_criador:req.session.usuario.id,id_usuario: data_tarefa[0].id_responsavel,
						texto:texto_notf,link:'/tarefas/tarefas'};
						model.CadastrarNotificacao(data_notificacao).then(data_not=>{
							model.AtualizarTarefa(atualizarTarefa).then(data => {
								res.json(data);
							});
						});
					});
			}else{
				model.AtualizarTarefa(atualizarTarefa).then(data => {
					res.json(data);
				});
			}

		}
	});

router.post('/atualizar/topico/:id', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.AtualizarTopico(POST).then(data => {
			model.GetPorcentagem(POST).then(data => {
				res.json(data);
			});
		});
	});

router.post('/atualizar/tempo_contado', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.AtualizarTarefa(POST).then(data => {
			res.json(data);
		});
	});

router.post('/desativar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.DesativarTarefa('tarefas', POST).then(data=> {
			res.json(data);
		});
	});


module.exports = router;

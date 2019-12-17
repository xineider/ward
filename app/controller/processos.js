// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var ProcessosModel = require('../model/processosModel.js');
var model = new ProcessosModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelecioneUsuarios().then(data_usuarios => {
		data.usuarios = data_usuarios;
		model.SelecioneClientes().then(data_clientes => {
			data.clientes = data_clientes;
			model.SelecioneAdversos().then(data_adversos => {
				data.adversos = data_adversos;
				model.SelecioneProcessos().then(data_processos => {
					data.processos = data_processos;
					model.UltimoProcessoAtivo().then(id_ultimo_processo =>{
						if(id_ultimo_processo == ''){
							res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/index', data: data, usuario: req.session.usuario});
						}else{
							//id_ultimo_processo[0].id - retorna o último processo que não está deletado
							model.SelecioneMaisDetalhesDoProcesso(id_ultimo_processo[0].id).then(data_mais_processos =>{
								data.detalhes_processo = data_mais_processos;
								model.SelecionarEnvolvidosCliente(id_ultimo_processo[0].id).then(data_envolvidos_processo =>{
									data.envolvidos_cliente = data_envolvidos_processo;
									model.SelecionarEnvolvidosAdverso(id_ultimo_processo[0].id).then(data_envolvidos_adverso =>{
										data.envolvidos_adverso = data_envolvidos_adverso;
										model.SelecioneAndamentosDoProcesso(id_ultimo_processo[0].id).then(data_andamento_processo =>{
											data.andamentos = data_andamento_processo;
											model.SelecionarTempo().then(data_tempo=>{
												data.tempo = data_tempo;
												model.SelecioneCompromissosDoProcesso(id_ultimo_processo[0].id).then(data_compromisso_processo =>{
													data.compromissos = data_compromisso_processo;
													model.SelecioneCalculosFinanceirosDoProcesso(id_ultimo_processo[0].id).then(data_calculos_financeiros =>{
														data.calculos_financeiro = data_calculos_financeiros;
														res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/index', data: data, usuario: req.session.usuario});
													});
												});
											});
										});
									});
								});
							});
						}
					});
				});
			});
		});
	});
});

router.get('/detalhes/:id', function(req, res, next) {
	model.SelecioneMaisDetalhesDoProcesso(req.params.id).then(data_mais_processo => {
		data.detalhes_processo = data_mais_processo;
		model.SelecionarEnvolvidosCliente(req.params.id).then(data_envolvidos_processo =>{
			data.envolvidos_cliente = data_envolvidos_processo;
			model.SelecionarEnvolvidosAdverso(req.params.id).then(data_envolvidos_adverso =>{
				data.envolvidos_adverso = data_envolvidos_adverso;
				console.log('MMMMMMMMMMMMMMMMMMMM MAIS DETALHES MMMMMMMMMMMMMMMMMMMMMMMMMMM');
				console.log(data);
				console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/mais_processo', data: data, usuario: req.session.usuario});
			});
		});
	});
});


router.get('/andamentos/:id', function(req, res, next) {
	model.SelecioneAndamentosDoProcesso(req.params.id).then(data_andamento_processo => {
		data.andamentos = data_andamento_processo;
		model.SelecionarTempo().then(data_tempo=>{
			data.tempo = data_tempo;
			model.SelecioneCalculosFinanceirosDoProcesso(req.params.id).then(data_calculos_financeiros =>{
				data.calculos_financeiro = data_calculos_financeiros;
				data.id_processo = req.params.id;
				console.log('aaaaaaaaaaaaaaaaaa andamentos aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
				console.log(data);
				console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/andamentos', data: data, usuario: req.session.usuario});
			});
		});
	});
});

router.get('/compromissos/:id', function(req, res, next) {
	model.SelecioneCompromissosDoProcesso(req.params.id).then(data_compromisso_processo => {
		data.compromissos = data_compromisso_processo;
		data.id_processo = req.params.id;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/compromissos_processo', data: data, usuario: req.session.usuario});
	});
});

router.get('/captacao/:id', function(req, res, next) {
	model.SelecioneCaptacaoDoProcesso(req.params.id).then(data_captacao => {
		data.captacao = data_captacao;
		console.log('?????????????????????? DATA CAPTACAO ???????????????????????????????????????????');
		console.log(data);
		console.log('????????????????????????????????????????????????????????????????????????????????');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/captacao', data: data, usuario: req.session.usuario});
	});
});


router.get('/criar', function(req, res, next) {
	model.SelecioneUsuarios().then(data_usuarios => {
		data.usuarios = data_usuarios;
		model.SelecioneClientes().then(data_clientes => {
			data.clientes = data_clientes;
			model.SelecioneAdversos().then(data_adversos => {
				data.adversos = data_adversos;
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/processos_criar_previo', data: data, usuario: req.session.usuario});
			});
		});
	});
});
router.get('/abrir/:id', function(req, res, next) {
	var id = req.params.id;
	model.SelecionarProcesso(id).then(data_processos => {
		data.processos = data_processos;
		model.SelecioneMaisDetalhesDoProcesso(id).then(data_mais_processos =>{
			data.detalhes_processo = data_mais_processos;
			model.SelecioneAndamentosDoProcesso(id).then(data_andamento_processo =>{
				data.andamentos = data_andamento_processo;
				model.SelecioneApensosDoProcesso(id).then(data_apenso_processo =>{
					data.apensos = data_apenso_processo;
					model.SelecioneRecursosDoProcesso(id).then(data_recurso_processo =>{
						data.recursos = data_recurso_processo
						model.SelecionarTempo().then(data_tempo=>{
							data.tempo = data_tempo;
							model.SelecioneCompromissosDoProcesso(id).then(data_compromisso_processo =>{
								data.compromissos = data_compromisso_processo;
								model.SelecioneTodosCompromissosDoApensoDoProcesso(id).then(data_compromissos_apenso =>{
									data.compromissos_apensos = data_compromissos_apenso;
									model.SelecioneTodosCompromissosDoRecursoDoProcesso(id).then(data_compromissos_recurso =>{
										data.compromissos_recursos = data_compromissos_recurso;
										model.SelecioneTodosAndamentosDoApensoDoProcesso(id).then(data_andamentos_apenso => {
											data.andamentos_apensos = data_andamentos_apenso;
											model.SelecioneTodosAndamentosDoRecursoDoProcesso(id).then(data_andamentos_recurso =>{
												data.andamentos_recursos = data_andamentos_recurso;
												model.SelecioneCalculosFinanceirosDoProcesso(id).then(data_calculos_financeiros =>{
													data.calculos_financeiro = data_calculos_financeiros;
													console.log(':::::::::::::::::::::: Inicio Abrir um processo :::::::::::::::::::::');
													console.log(data);
													console.log(':::::::::::::::::::::: Fim Abrir um processo ::::::::::::::::::::::::');
													res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/processos_abrir', data: data, usuario: req.session.usuario});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});


router.get('/editar-apenso/:id',function(req, res, next){
	var id = req.params.id;

	console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII ID DO APENSO EDITAR IIIIIIIIIIIIIIIIIIIIII');
	console.log(id);
	console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');

	model.SelecionarApenso(id).then(data_apenso =>{
		data.apenso = data_apenso;
		model.SelecionarCompromissosDoApenso(id).then(data_compromissos_apenso =>{
			data.compromissos_apenso = data_compromissos_apenso;
			model.SelecionarAndamentosDoApenso(id).then(data_andamentos_apenso =>{
				data.andamentos_apenso = data_andamentos_apenso
				console.log('EEEEEEEEEEEEEEEEEEEE EDITAR APENSO EEEEEEEEEEEEEEEEEEEEEEE');
				console.log(data);
				console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/editar_apenso', data: data, usuario: req.session.usuario});
			});
		});
	});
});


router.get('/editar-descricao-generico/:id',function(req, res, next) {
	var id = req.params.id;
	model.SelecionarDescricaoGenericoPorId(id).then(data_desc_gen=>{
		data.descricao_generico = data_desc_gen;
		console.log('EEEEEEEEEEEEEEE EDITAR DESCRICAO GENERICO EEEEEEEEEEEEEEEEEEEEEEE');
		console.log(data);
		console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_editar_descricao_generico', data: data, usuario: req.session.usuario});
	});
});


router.get('/editar-dados-para-calculo/:id',function(req, res, next) {
	var id = req.params.id;
	model.SelecionarDadosParaCalculoPorId(id).then(data_dados_para_calculo=>{
		data.calculos_financeiro = data_dados_para_calculo;
		console.log('EEEEEEEEEEEEEEE EDITAR DESCRICAO GENERICO EEEEEEEEEEEEEEEEEEEEEEE');
		console.log(data);
		console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/editar_dados_para_calculo', data: data, usuario: req.session.usuario});
	});
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
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/editar_parcela_financeiro', data: data, usuario: req.session.usuario});
	});
});




router.get('/pesquisar-processo-por-numero-autocomplete/:numero_processo', function(req, res, next) {

	numero_processo = req.params.numero_processo;
	console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFF numero_processo FFFFFFFFFFFFFFFFFFFFFFF');
	console.log(numero_processo);
	console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');

	model.PesquisarNumeroProcessoAutocomplete(numero_processo).then(data => {
		console.log('========================= procurar faculdade ===================');
		console.log(data);
		console.log('===============================================================');
		res.json(data);
	});
});


router.get('/editar-recurso/:id',function(req, res, next){
	var id = req.params.id;

	model.SelecionarRecurso(id).then(data_recurso =>{
		data.recurso = data_recurso;
		model.SelecionarOrigemRecurso(data_recurso[0].id).then(data_origem =>{
			data.origem = data_origem;
			model.SelecionarCompromissosDoRecurso(id).then(data_compromissos_recurso =>{
				data.compromissos_recurso = data_compromissos_recurso;
				model.SelecionarAndamentosDoRecurso(id).then(data_andamentos_recurso =>{
					data.andamentos_recurso = data_andamentos_recurso
					console.log('FFFFFFFFFFFFFFFFF EDITAR RECURSO FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
					console.log(data);
					console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/editar_recurso', data: data, usuario: req.session.usuario});
				});
			});
		});
	});
});



router.get('/adicionar-apenso-simples/',function(req, res, next){
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/cadastro_apenso_simples', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-recurso-simples/:id',function(req, res, next){
	var id = req.params.id;
	model.SelecionarOrigemRecurso(id).then(data_origem =>{
		data.origem = data_origem;
		console.log('êêêêêêêêêêêêêêêêêêêêê ESTOU NO ADICIONAR RECURSO SIMPLES êêêêêêêêêêêêêêêêêê');
		console.log(data);
		console.log('êêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêêê');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/cadastro_recurso_simples', data: data, usuario: req.session.usuario});
	});
});



router.get('/adicionar-compromisso/',function(req, res, next){
	data.cadastrar_link = '/sistema/processos/cadastrar_compromisso';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/cadastro_compromisso', data: data, usuario: req.session.usuario});
});


router.get('/editar-compromisso/:id',function(req, res, next){
	var id = req.params.id;
	data.cadastrar_link = '/sistema/processos/editar_compromisso';
	console.log('EEEEEEEEEEEEEEEEE EDITAR-COMPROMISSO EEEEEEEEEEEEEEEEEEEEEE');
	console.log('eEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');

	model.SelecionarCompromissoDoProcesso(id).then(data_compromisso => {
		data.compromisso = data_compromisso;
		console.log('222222222222222222222 EDITAR COMPROMISSO 22222222222222222222222222222');
		console.log(data);
		console.log('2222222222222222222222222222222222222222222222222222222222222222222222');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/editar_compromisso', data: data, usuario: req.session.usuario});
	});
});




router.get('/adicionar-compromisso-apenso/',function(req, res, next){
	data.cadastrar_link = '/sistema/processos/cadastrar_compromisso_apenso';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/cadastro_compromisso_apenso', data: data, usuario: req.session.usuario});
});


router.get('/adicionar-compromisso-recurso/',function(req, res, next){
	data.cadastrar_link = '/sistema/processos/cadastrar_compromisso_recurso';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/cadastro_compromisso_recurso', data: data, usuario: req.session.usuario});
});


router.get('/adicionar-andamento-apenso/',function(req, res, next){
	data.cadastrar_link = '/sistema/processos/cadastrar_andamento_apenso';
	data.nome_requirido = 'apenso';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/cadastro_andamento', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-andamento-recurso/',function(req, res, next){
	data.cadastrar_link = '/sistema/processos/cadastrar_andamento_recurso';
	data.nome_requirido = 'recurso';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/cadastro_andamento', data: data, usuario: req.session.usuario});
});




router.get('/cruzamento', function(req, res, next) {
	model.SelecioneProcessos().then(data_processos => {
		data.processos = data_processos;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/processos_cruzamento_filtro', data: data, usuario: req.session.usuario});
	});
});



router.get('/selecionar-todos-clientes', function(req, res, next) {
	model.SelecioneTodosClientes().then(data_dados =>{
		data.dados = data_dados;
		model.SelecioneCpfCnpjExtraTodosClientes().then(data_cpf_cnpj=>{
			data.nome_campo_extra = 'CPF/CNPJ';
			data.campo_extra = data_cpf_cnpj;
			data.mensagem = '';
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_no_edit', data: data, usuario: req.session.usuario});
		});
	});
});


router.get('/pesquisar-todos-clientes-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarClientesAutocomplete(pesquisa).then(data =>{
		res.json(data);
	});
});

router.get('/selecionar-todos-clientes-por-categoria', function(req, res, next) {
	model.SelecioneTodosClientesPorCategoria().then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/clientes/criar';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-clientes-por-categoria-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarClientesCategoriaAutocomplete(pesquisa).then(data =>{
		res.json(data);
	});
});


router.get('/selecionar-todos-adversos', function(req, res, next) {
	model.SelecioneTodosAdversos().then(data_dados =>{
		data.dados = data_dados;
		model.SelecioneCpfCnpjExtraTodosAdversos().then(data_cpf_cnpj=>{
			data.nome_campo_extra = 'CPF/CNPJ';
			data.campo_extra = data_cpf_cnpj;
			data.mensagem = '';
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_no_edit', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/pesquisar-todos-adversos-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarAdversosAutocomplete(pesquisa).then(data =>{
		res.json(data);
	});
});


router.get('/selecionar-todos-tipo-causa', function(req, res, next) {
	console.log('CAI AQUI NO SELECIONAR TODOS TIPO CAUSA');
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
	model.SelecioneTodosDescricaoGenerica(13).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-tipo-causa';
		data.nome_relatorio = 'TipoCausa';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});


router.get('/pesquisar-todos-tipo-causa-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,13).then(data =>{
		res.json(data);
	});
});


router.get('/selecionar-todos-tipo-causa-apenso', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(14).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-tipo-causa-apenso';
		data.nome_relatorio = 'TipoCausaApenso';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-tipo-causa-apenso-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,14).then(data =>{
		res.json(data);
	});
});


router.get('/selecionar-todos-posicao-apenso', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(7).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-posicao-apenso';
		data.nome_relatorio = 'PosicaoApenso';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-posicao-apenso-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,7).then(data =>{
		res.json(data);
	});
});


router.get('/selecionar-todos-relator-recurso', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(10).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-relator-recurso';
		data.nome_relatorio = 'RelatorRecurso';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-relator-recurso-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,10).then(data =>{
		res.json(data);
	});
});


router.get('/selecionar-todos-situacao-apenso', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(11).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-situacao-apenso';
		data.nome_relatorio = 'SituacaoApenso';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-situacao-apenso-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,11).then(data =>{
		res.json(data);
	});
});


router.get('/selecionar-todos-foro', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(4).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-foro';
		data.nome_relatorio = 'Foro';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-foro-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,4).then(data =>{
		res.json(data);
	});
});



router.get('/selecionar-todos-assunto', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(0).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-assunto';
		data.nome_relatorio = 'Assunto';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-assunto-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,0).then(data =>{
		res.json(data);
	});
});


router.get('/selecionar-todos-captadores', function(req, res, next) {
	model.SelecioneTodosCaptadores().then(data_dados =>{
		data.dados = data_dados;
		data.nome_relatorio = 'Captadores';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});


router.get('/selecionar-todos-origem-captacao', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(5).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-origem-captacao';
		data.nome_relatorio = 'OrigemCaptacao';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});


router.get('/pesquisar-todos-origem-captacao-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,5).then(data =>{
		res.json(data);
	});
});




router.get('/selecionar-todos-processos', function(req, res, next) {
	model.SelecioneTodosProcessos().then(data_dados =>{
		data.dados = data_dados;
		model.SelecioneNomeClienteExtraTodosProcessos().then(data_nome =>{
			data.nome_campo_extra = 'Nome';
			data.campo_extra = data_nome;
			data.mensagem = '';
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_no_edit', data: data, usuario: req.session.usuario});
		});
	});
});



router.get('/selecionar-todos-comarca', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(19).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-comarca';
		data.nome_relatorio = 'Comarca';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});


router.get('/pesquisar-todos-comarca-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,19).then(data =>{
		res.json(data);
	});
});



router.get('/selecionar-todos-tipo-acao-rito', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(12).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-tipo-acao-rito';
		data.nome_relatorio = 'TipoAcaoRito';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-tipo-acao-rito-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,12).then(data =>{
		res.json(data);
	});
});

router.get('/selecionar-todos-tipo-recurso', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(15).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-tipo-recurso';
		data.nome_relatorio = 'TipoRecurso';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-tipo-recurso-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,15).then(data =>{
		res.json(data);
	});
});

router.get('/selecionar-todos-posicao-cliente', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(9).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-posicao-cliente';
		data.nome_relatorio = 'PosicaoCliente';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-posicao-cliente-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,9).then(data =>{
		res.json(data);
	});
});

router.get('/selecionar-todos-tribunal-recurso', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(16).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-tribunal';
		data.nome_relatorio = 'Tribunal';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-tribunal-recurso-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,16).then(data =>{
		res.json(data);
	});
});

router.get('/selecionar-todos-turma-camara-recurso', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(17).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-turma-camara-recurso';
		data.nome_relatorio = 'TurmaCamaraRecurso';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-turma-camara-recurso-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,17).then(data =>{
		res.json(data);
	});
});


router.get('/selecionar-todos-vara', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(18).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-vara';
		data.nome_relatorio = 'Vara';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-vara-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,18).then(data =>{
		res.json(data);
	});
});


router.get('/selecionar-todos-categoria', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(1).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-categorias';
		data.nome_relatorio = 'Categorias';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-categoria-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,1).then(data =>{
		res.json(data);
	});
});


router.get('/selecionar-todos-fase', function(req, res, next) {
	model.SelecioneTodosDescricaoGenerica(3).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-fase';
		data.nome_relatorio = 'Fase';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});

router.get('/pesquisar-todos-fase-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,3).then(data =>{
		res.json(data);
	});
});


router.get('/selecionar-todos-banco', function(req, res, next) {
	console.log('CAI AQUI NO SELECIONAR TODOS TIPO CAUSA');
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
	model.SelecioneTodosDescricaoGenerica(20).then(data_dados =>{
		data.dados = data_dados;
		data.adicionar_link = '/processos/adicionar-banco';
		data.nome_relatorio = 'Banco';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});


router.get('/pesquisar-todos-bancos-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	model.PesquisarDescricaoGenericaAutocomplete(pesquisa,20).then(data =>{
		res.json(data);
	});
});


router.get('/andamento_financeiro_cadastro_dados_para_calculo/:idProcesso',function(req, res, next){
	var idProcesso = req.params.idProcesso;
	console.log('999999 cai no andamento_financeiro_dados_para_calculo 9999999');
	console.log('9999999999999999999999999999999999999999999999999999999999999');
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/cadastro_dados_para_calculo', data: data, usuario: req.session.usuario});
});





router.post('/cadastrar_compromisso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('---------------------- CADASTRAR_COMPROMISSO -------------------');
	console.log(POST);
	console.log('----------------------------------------------------------------');


	data_insert = {id_usuario: req.session.usuario.id,
		id_processo:POST.id,id_advogado_setor: POST.id_advogado_setor,
		id_advogado_compromisso:POST.id_advogado_compromisso,tipo_compromisso:POST.tipo_compromisso, tipo:POST.tipo,
		nome:POST.nome_compromisso,data_inicial:POST.data_inicial_compromisso,
		hora_inicial: POST.hora_inicial_compromisso, data_final:POST.data_final_compromisso,
		hora_final: POST.hora_final_compromisso,local: POST.local_compromisso, 
		complemento:POST.complemento_compromisso};

		console.log('================== DATA_INSERT =============');
		console.log(data_insert);
		console.log('============================================');

		model.CadastrarCompromisso(data_insert).then(data_cad_comp => {
			var linkNotificacao = '/processos/abrir/'+POST.id;
			var texto_notf = 'Adicionado Compromisso "' + POST.nome_compromisso+'"';

			data_notificacao = {id_usuario_criador:req.session.usuario.id, id_usuario: POST.id_advogado_compromisso,
				texto:texto_notf,link:linkNotificacao};
				model.CadastrarNotificacao(data_notificacao).then(data_not=>{
					model.SelecioneCompromissosDoProcesso(POST.id).then(data_compromisso_processo =>{
						data.compromissos = data_compromisso_processo;
						res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/tabela_compromissos_only', data: data, usuario: req.session.usuario});
					});
				});
			});
	});


router.post('/cadastrar_parcela', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('---------------------- CADASTRAR PARCELA -------------------');
	console.log(POST);
	console.log('----------------------------------------------------------------');

	model.SelecionarDadosParaCalculoPorId(POST.id_dados_para_calculo).then(data_dados_para_calculo => {
		console.log('♠♠♠♠♠♠♠♠♠♠ dados para calculo ♠♠♠♠♠♠♠♠♠♠♠');
		console.log(data_dados_para_calculo);
		console.log('♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠');


		var vhe = data_dados_para_calculo[0].porc_honorario_escritorio;
		var vhp = data_dados_para_calculo[0].porc_honorario_perito;
		var vir = data_dados_para_calculo[0].porc_imposto_renda;

		var valorParcelaOriginal = POST.valor_parcela;

		if(valorParcelaOriginal == '' || valorParcelaOriginal == undefined){
			valorParcelaOriginal = 0;
		}

		var vheParcela = valorParcelaOriginal * (vhe/100);
		var vhpParcela = valorParcelaOriginal * (vhp/100);
		var virParcela = valorParcelaOriginal * (vir/100);

		var acessor_juridico = POST.acessor_juridico;
		if(acessor_juridico == '' || acessor_juridico == undefined){
			acessor_juridico = 0;
		}

		var imposto_renda = POST.imposto_renda_parcela;
		if(imposto_renda == '' || imposto_renda == undefined){
			imposto_renda = 0;
		}

		var inss = POST.inss_parcela;
		if(inss == '' || inss == undefined){
			inss = 0;
		}

		var outros_descontos = POST.outros_descontos_parcela;
		if(outros_descontos == '' || outros_descontos == undefined){
			outros_descontos = 0;
		}


		var valor_pagar_reclamante = valorParcelaOriginal - vheParcela - vhpParcela - virParcela - acessor_juridico - imposto_renda - inss - outros_descontos;
		if(valor_pagar_reclamante<0){
			valor_pagar_reclamante = 0;
		}

		data_insert = {id_processo:POST.id,
			valor:valorParcelaOriginal,data_vencimento:POST.data_vencimento_parcela,
			data_recebimento_reclamada:POST.data_recebimento_reclamada,
			data_pago_reclamante:POST.data_pago_reclamante,
			acessor_juridico:acessor_juridico,imposto_renda:imposto_renda,
			inss:inss,outros_descontos:outros_descontos,
			observacoes:POST.observacoes_parcela,valor_pagar_reclamante:valor_pagar_reclamante,
			despesa_bancaria:POST.despesa_bancaria_parcela,numero_nota_fiscal:POST.numero_nota_fiscal_parcela,
			id_banco:POST.id_banco
		};


		console.log('================== DATA_INSERT =============');
		console.log(data_insert);
		console.log('============================================');


		model.CadastrarParcela(data_insert).then(data_cad_par => {			
			model.SelecionarParcelasDoProcesso(POST.id).then(data_parcelas =>{
				data.parcelas = data_parcelas;
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/tabela_parcelas_only', data: data, usuario: req.session.usuario});
			});
		});
	});
});



router.post('/cadastrar_compromisso_apenso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('AAAAAAAAAAAAAAAAAA CADASTRAR COMPROMISSO APENSO AAAAAAAAAAAAAAAAAAAAA');
	console.log(POST);
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

	data_insert = {id_usuario: req.session.usuario.id, id_processo:POST.id,
		id_apenso: POST.id_apenso, id_advogado_setor: POST.id_advogado_setor_apenso,
		id_advogado_compromisso:POST.id_advogado_compromisso_apenso,tipo_compromisso:POST.tipo_compromisso_apenso,
		tipo:POST.tipo_apenso,nome:POST.nome_compromisso_apenso, data_inicial:POST.data_inicial_compromisso_apenso,
		hora_inicial: POST.hora_inicial_compromisso_apenso,data_final:POST.data_final_compromisso_apenso, 
		hora_final: POST.hora_final_compromisso_apenso, local: POST.local_compromisso_apenso, 
		complemento:POST.complemento_compromisso_apenso};

		console.log('================== DATA_INSERT =============');
		console.log(data_insert);
		console.log('============================================');

		model.CadastrarCompromisso(data_insert).then(data => {
			res.json(data);
		});
	});

router.post('/cadastrar_compromisso_recurso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('AAAAAAAAAAAAAAAAAA CADASTRAR COMPROMISSO RECURSO AAAAAAAAAAAAAAAAAAAAA');
	console.log(POST);
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

	data_insert = {id_usuario: req.session.usuario.id, id_processo:POST.id,
		id_recurso: POST.id_recurso, id_advogado_setor: POST.id_advogado_setor_recurso,
		id_advogado_compromisso:POST.id_advogado_compromisso_recurso,tipo_compromisso:POST.tipo_compromisso_recurso, 
		tipo:POST.tipo_recurso,nome:POST.nome_compromisso_recurso, data_inicial:POST.data_inicial_compromisso_recurso,
		hora_inicial: POST.hora_inicial_compromisso_recurso,data_final:POST.data_final_compromisso_recurso, 
		hora_final: POST.hora_final_compromisso_recurso, local: POST.local_compromisso_recurso, 
		complemento:POST.complemento_compromisso_recurso};

		console.log('================== DATA_INSERT =============');
		console.log(data_insert);
		console.log('============================================');

		model.CadastrarCompromisso(data_insert).then(data => {
			res.json(data);
		});
	});




router.post('/cadastrar_andamento_apenso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('BBBBBBBBBBBBBBBBBBBBB CADASTRAR ANDAMENTO APENSO BBBBBBBBBBBBBBBBBBBBBBBBB');
	console.log(POST);
	console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');

	data_insert = {id_usuario: req.session.usuario.id, 
		id_processo:POST.id,id_apenso: POST.id_apenso, 
		descricao: POST.andamento_descricao_apenso, data: POST.andamento_data_apenso, 
		tipo: POST.andamento_tipo_apenso};

		console.log('================== DATA_INSERT ANDAMENTO APENSO =============');
		console.log(data_insert);
		console.log('=============================================================');

		model.CadastrarAndamento(data_insert).then(data => {
			res.json(data);
		});
	});

router.post('/cadastrar_andamento_recurso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('BBBBBBBBBBBBBBBBBBBBB CADASTRAR ANDAMENTO RECURSO BBBBBBBBBBBBBBBBBBBBBBBBB');
	console.log(POST);
	console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');

	data_insert = {id_usuario: req.session.usuario.id, 
		id_processo:POST.id,id_recurso: POST.id_recurso, 
		descricao: POST.andamento_descricao_recurso, data: POST.andamento_data_recurso, 
		tipo: POST.andamento_tipo_recurso};

		console.log('================== DATA_INSERT ANDAMENTO RECURSO =============');
		console.log(data_insert);
		console.log('=============================================================');

		model.CadastrarAndamento(data_insert).then(data => {
			res.json(data);
		});
	});


router.post('/editar-apenso/', function(req, res, next) {


	POST = req.body;
	console.log('---------------------- EDITAR_APENSO ------------------------');
	console.log(POST);
	console.log('----------------------------------------------------------------');


	data_insert= {id:POST.id_apenso, id_usuario: req.session.usuario.id, id_processo:POST.id, id_advogado: POST.id_advogado_apenso,
		id_tipo_causa_apenso: POST.id_tipo_causa_apenso , id_posicao_apenso: POST.id_posicao_apenso ,id_comarca: POST.id_comarca_apenso, id_vara: POST.id_vara_apenso ,id_foro: POST.id_foro_apenso ,
		id_situacao_apenso: POST.id_situacao_apenso ,numero: POST.numero_apenso , distribuicao: POST.distribuicao_apenso, citacao: POST.citacao_apenso, sentenca: POST.sentenca_apenso}

		console.log('================== DATA_INSERT =============');
		console.log(data_insert);
		console.log('============================================');

		model.AtualizarApenso(data_insert).then(data => {
			res.json(data);
		});
	});



router.post('/editar-recurso/', function(req, res, next) {
	POST = req.body;
	console.log('RRRRRRRRRRRRRRRR EDITAR RECURSO RRRRRRRRRRRRRRRRRRRRRRRR');
	console.log(POST);
	console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');

	data_insert= {id: POST.id_recurso, id_usuario: req.session.usuario.id, id_processo:POST.id, id_advogado: POST.id_advogado_recurso,
		id_apenso: POST.id_apenso_recurso , id_relator: POST.id_relator_recurso ,id_tipo_recurso: POST.id_tipo_recurso, id_posicao_cliente: POST.id_posicao_cliente_recurso ,id_tribunal: POST.id_tribunal_recurso ,
		id_turma_camara: POST.id_turma_camara_recurso ,numero: POST.numero_recurso , interposicao: POST.interposicao_recurso, ajuizado: POST.ajuizado_recurso
	};

	console.log('================== DATA_INSERT =============');
	console.log(data_insert);
	console.log('============================================');

	model.AtualizarRecurso(data_insert).then(data => {
		res.json(data);
	});
});

router.post('/editar_compromisso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('---------------------- CADASTRAR_COMPROMISSO -------------------');
	console.log(POST);
	console.log('----------------------------------------------------------------');


	data_insert = {id:POST.id_compromisso,id_usuario: req.session.usuario.id,
		id_processo:POST.id,id_advogado_setor: POST.id_advogado_setor,
		id_advogado_compromisso:POST.id_advogado_compromisso,tipo_compromisso:POST.tipo_compromisso, tipo:POST.tipo,
		nome:POST.nome_compromisso,data_inicial:POST.data_inicial_compromisso,
		hora_inicial: POST.hora_inicial_compromisso, data_final:POST.data_final_compromisso,
		hora_final: POST.hora_final_compromisso,local: POST.local_compromisso, 
		complemento:POST.complemento_compromisso
	};

	console.log('================== DATA_INSERT =============');
	console.log(data_insert);
	console.log('============================================');

	model.AtualizarCompromisso(data_insert).then(data_cad_comp => {
		model.SelecioneCompromissosDoProcesso(POST.id).then(data_compromisso_processo =>{
			data.compromissos = data_compromisso_processo;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/tabela_compromissos_only', data: data, usuario: req.session.usuario});
		});
	});
});

router.post('/editar-dados-para-calculo/', function(req, res, next) {

	POST = req.body;
	console.log('---------------------- EDITAR DADOS PARA CALCULO ------------------------');
	console.log(POST);
	console.log('-------------------------------------------------------------------------');

	//vhe=valor_honorario_escritorio,vhp = valor_honorario_perito, vir = valor_imposto_renda
	var vhe = POST.porc_honorario_escritorio;
	var vhp = POST.porc_honorario_perito;
	var vir = POST.porc_imposto_renda;

	data_insert = {id:POST.id_dados_calculo,id_processo:POST.id, data_sentenca_acordo: POST.data_sentenca_acordo, 
		porc_honorario_escritorio:vhe,
		porc_honorario_perito:vhp,
		porc_imposto_renda:vir
	};


	console.log('================== DATA_INSERT =============');
	console.log(data_insert);
	console.log('============================================');

	model.AtualizarDadosParaCalculo(data_insert).then(data => {
		res.json(data);
	});
});

router.post('/editar_parcela/', function(req, res, next) {

	POST = req.body;
	console.log('---------------------- EDITAR PARCELA ------------------------');
	console.log(POST);
	console.log('--------------------------------------------------------------');

	model.SelecionarDadosParaCalculoPorId(POST.id_dados_para_calculo).then(data_dados_para_calculo => {
		console.log('♠♠♠♠♠♠♠♠♠♠ dados para calculo ♠♠♠♠♠♠♠♠♠♠♠');
		console.log(data_dados_para_calculo);
		console.log('♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠♠');


		var vhe = data_dados_para_calculo[0].porc_honorario_escritorio;
		var vhp = data_dados_para_calculo[0].porc_honorario_perito;
		var vir = data_dados_para_calculo[0].porc_imposto_renda;

		var valorParcelaOriginal = POST.valor_parcela;

		if(valorParcelaOriginal == '' || valorParcelaOriginal == undefined){
			valorParcelaOriginal = 0;
		}

		var vheParcela = valorParcelaOriginal * (vhe/100);
		var vhpParcela = valorParcelaOriginal * (vhp/100);
		var virParcela = valorParcelaOriginal * (vir/100);

		var acessor_juridico = POST.acessor_juridico;
		if(acessor_juridico == '' || acessor_juridico == undefined){
			acessor_juridico = 0;
		}

		var imposto_renda = POST.imposto_renda_parcela;
		if(imposto_renda == '' || imposto_renda == undefined){
			imposto_renda = 0;
		}

		var inss = POST.inss_parcela;
		if(inss == '' || inss == undefined){
			inss = 0;
		}

		var outros_descontos = POST.outros_descontos_parcela;
		if(outros_descontos == '' || outros_descontos == undefined){
			outros_descontos = 0;
		}


		var valor_pagar_reclamante = valorParcelaOriginal - vheParcela - vhpParcela - virParcela - acessor_juridico - imposto_renda - inss - outros_descontos;
		if(valor_pagar_reclamante<0){
			valor_pagar_reclamante = 0;
		}

		data_insert = {id:POST.id_parcela,
			valor:valorParcelaOriginal,data_vencimento:POST.data_vencimento_parcela,
			data_recebimento_reclamada:POST.data_recebimento_reclamada,
			data_pago_reclamante:POST.data_pago_reclamante,
			acessor_juridico:acessor_juridico,imposto_renda:imposto_renda,
			inss:inss,outros_descontos:outros_descontos,
			observacoes:POST.observacoes_parcela,valor_pagar_reclamante:valor_pagar_reclamante,
			despesa_bancaria:POST.despesa_bancaria_parcela,numero_nota_fiscal:POST.numero_nota_fiscal_parcela,
			id_banco:POST.id_banco
		};

		console.log('================== DATA_INSERT =============');
		console.log(data_insert);
		console.log('============================================');

		model.AtualizarParcela(data_insert).then(data_atu_parc => {
			model.SelecionarParcelasDoProcesso(POST.id).then(data_parcelas =>{
				data.parcelas = data_parcelas;
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/tabela_parcelas_only', data: data, usuario: req.session.usuario});
			});
		});
	});
});


router.post('/cadastrar_apenso_simples', function(req, res, next) {

	POST = req.body;
	console.log('************************** CADASTRAR APENSO SIMPLESS ****************');
	console.log(POST);
	console.log('********************************************************************');

	data_insert = {id_usuario: req.session.usuario.id, 
		id_processo: POST.id, 
		numero:POST.numero_apenso};

		console.log('KKKKKKKKKKKKKKK DATA INSERT KKKKKKKKKKKKKKKKKKKKKK');
		console.log(data_insert);
		console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK');


		model.CadastrarApensoSimples(data_insert).then(id_apenso_simples =>{
			console.log('cccccccccc cadastrado apenso simples ccccccccccccccc');
			console.log(id_apenso_simples);
			console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccc');

			res.json({desc:'cadastro_apenso', id_apenso: id_apenso_simples});

		// res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/cadastro_apenso', data: data, usuario: req.session.usuario});
		// res.json(data);
	});

	// data_insert= {id_usuario: req.session.usuario.id, id_processo:POST.id, id_advogado: POST.id_advogado_compromisso,
	// 	id_tipo_causa_apenso: POST.id_tipo_causa_apenso , id_posicao_apenso: POST.id_posicao_apenso ,id_comarca: POST.id_comarca_apenso, id_vara: POST.id_vara_apenso ,id_foro: POST.id_foro_apenso ,
	// 	id_situacao_apenso: POST.id_situacao_apenso ,numero: POST.numero_apenso , distribuicao: POST.distribuicao_apenso, citacao: POST.citacao_apenso, sentenca: POST.sentenca_apenso}

	// 	console.log('================== DATA_INSERT =============');
	// 	console.log(data_insert);
	// 	console.log('============================================');

	// 	model.CadastrarApenso(data_insert).then(data => {
	// 		res.json(data);
	// 	});
});


router.post('/editar-descricao-generico/', function(req, res, next) {
	POST = req.body;
	console.log('RRRRRRRRRRRRRRRR EDITAR DESCRICAO GENERICO RRRRRRRRRRRRRRRRRRRRRRRR');
	console.log(POST);
	console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');


	model.AtualizarDescricaoGenerico(POST).then(data => {
		model.SelecionarTipoDoGenericoPorId(POST.id).then(data_tipo => {
			console.log('TTTTTTTTTTTTTTTIPPPPPPPPPPPOOOOOOOOOO');
			console.log(data_tipo[0].tipo);
			console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');

			model.SelecioneTodosDescricaoGenerica(data_tipo[0].tipo).then(data_dados =>{
				data.dados = data_dados;

				switch(data_tipo[0].tipo){
					case 0:
					data.adicionar_link = '/processos/adicionar-assunto';
					data.nome_relatorio = 'Assunto';
					break;
					case 1:
					data.adicionar_link = '/processos/adicionar-categorias';
					data.nome_relatorio = 'Categorias';
					break;
					case 2:
					break;
					case 3:
					data.adicionar_link = '/processos/adicionar-fase';
					data.nome_relatorio = 'Fase';
					break;
					case 4:
					data.adicionar_link = '/processos/adicionar-foro';
					data.nome_relatorio = 'Foro';
					break;
					case 5:
					data.adicionar_link = '/processos/adicionar-origem-captacao';
					data.nome_relatorio = 'OrigemCaptacao';
					break;
					case 6:
					break;
					case 7:
					data.adicionar_link = '/processos/adicionar-posicao-apenso';
					data.nome_relatorio = 'PosicaoApenso';
					break;
					case 8:
					break;
					case 9:
					data.adicionar_link = '/processos/adicionar-posicao-cliente';
					data.nome_relatorio = 'PosicaoCliente';
					break;
					case 10:
					data.adicionar_link = '/processos/adicionar-relator-recurso';
					data.nome_relatorio = 'RelatorRecurso';
					break;
					case 11:
					data.adicionar_link = '/processos/adicionar-situacao-apenso';
					data.nome_relatorio = 'SituacaoApenso';
					break;
					case 12:
					data.adicionar_link = '/processos/adicionar-tipo-acao-rito';
					data.nome_relatorio = 'TipoAcaoRito';
					break;
					case 13:
					data.adicionar_link = '/processos/adicionar-tipo-causa';
					data.nome_relatorio = 'TipoCausa';
					break;
					case 14:
					data.adicionar_link = '/processos/adicionar-tipo-causa-apenso';
					data.nome_relatorio = 'TipoCausaApenso';
					break;
					case 15:
					data.adicionar_link = '/processos/adicionar-tipo-recurso';
					data.nome_relatorio = 'TipoRecurso';
					break;
					case 16:
					data.adicionar_link = '/processos/adicionar-tribunal';
					data.nome_relatorio = 'Tribunal';
					break;
					case 17:
					data.adicionar_link = '/processos/adicionar-turma-camara-recurso';
					data.nome_relatorio = 'TurmaCamaraRecurso';
					break;
					case 18:
					data.adicionar_link = '/processos/adicionar-vara';
					data.nome_relatorio = 'Vara';
					break;
					case 19:
					data.adicionar_link = '/processos/adicionar-comarca';
					data.nome_relatorio = 'Comarca';
					break;
					case 20:
					data.adicionar_link = '/processos/adicionar-banco';
					data.nome_relatorio = 'Banco';
					break;
				}

				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
			});
		});
	});
});



router.post('/cadastrar_recurso_simples', function(req, res, next) {

	POST = req.body;
	console.log('|||||||||||||||||||||||||||| CADASTRAR RECURSO SIMPLES ||||||||||||||||');
	console.log(POST);
	console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');


	var origemRecurso = POST.origem_recurso;

	console.log('QQQQQQQQQQQQQQ DECIDIR ONDE QQQQQQQQQQQQQQQQ');
	console.log(origemRecurso);
	console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');

	var cadastroOrigem = origemRecurso.split(' - ');


	console.log('RRRRRRRRRRRRRRRRRRRR TESTE RRRRRRRRRRRRRRRRRRRR');
	console.log(cadastroOrigem);
	console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');

	console.log('posicao do array');
	console.log(cadastroOrigem[1]);
	console.log('ssssssssssssssssssssssss');

	if(cadastroOrigem[1] == 'Apenso'){
		console.log('é apenso');
		data_insert = {id_usuario:req.session.usuario.id, id_processo:POST.id,id_apenso:cadastroOrigem[0], numero:POST.numero_recurso};
		model.CadastrarRecursoSimples(data_insert).then(data =>{
			console.log('cccccccccc cadastrado recurso simples ccccccccccccccc');
			console.log(data);
			console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccc');

			res.json({desc:'cadastro_recurso', id_recurso: data});
		});
	}else if(cadastroOrigem[1] == 'Processo'){
		console.log('é processo');
		data_insert = {id_usuario:req.session.usuario.id, id_processo:POST.id,numero:POST.numero_recurso};
		model.CadastrarRecursoSimples(data_insert).then(data =>{
			console.log('cccccccccc cadastrado recurso simples ccccccccccccccc');
			console.log(data);
			console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccc');
			res.json({desc:'cadastro_recurso', id_recurso: data});
		});
	}



});



router.get('/outros_envolvidos_adverso/:id',function(req, res, next){
	var idProcesso = req.params.id;
	console.log('OUTROS ENVOLVIDOS ADVERSO OOOOOOOOOOOOOOOOOOOOOOOOOOO');
	console.log(idProcesso);
	console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
	model.SelecionarAdversoPorProcesso(idProcesso).then(id_adverso =>{
		data.id_processo = idProcesso;
		data.id_adverso = id_adverso;
		model.SelecionarEnvolvidosAdverso(idProcesso).then(data_envolvidos =>{
			data.outros = data_envolvidos;
			model.SelecionarTiposOutrosEnvolvidos().then(data_tipos_posicoes =>{
				data.outros_posicoes = data_tipos_posicoes;			
				console.log('--------------------- DETALHES ENVOLVIDOS ----------------------');
				console.log(data.outros);
				console.log('----------------------------------------------------------------');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/outros_envolvidos_adverso', data: data, usuario: req.session.usuario});
			});
		});
	});
});



router.get('/outros_envolvidos_cliente/:id',function(req, res, next){
	var idProcesso = req.params.id;
	model.SelecionarClientePorProcesso(idProcesso).then(id_cliente =>{
		data.id_processo = idProcesso;
		data.id_cliente = id_cliente;
		model.SelecionarEnvolvidosCliente(idProcesso).then(data_envolvidos =>{
			data.outros = data_envolvidos;
			model.SelecionarTiposOutrosEnvolvidos().then(data_tipos_posicoes =>{
				data.outros_posicoes = data_tipos_posicoes;			
				console.log('--------------------- DETALHES ENVOLVIDOS ----------------------');
				console.log(data);
				console.log('----------------------------------------------------------------');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/outros_envolvidos_cliente', data: data, usuario: req.session.usuario});
			});
		});
	});
});







router.get('/selecionar-todos-clientes-outros/:id/:idProcesso', function(req, res, next) {
	var idCliente = req.params.id;
	var idProcesso = req.params.idProcesso;
	model.SelecioneTodosClientesMenosOEnvolvido(idCliente).then(data_dados =>{
		data.dados = data_dados;
		data.cadastrar_item = '/sistema/processos/cadastrar-envolvido-cliente';
		data.adicionar_link = '/clientes/criar-simples/'+idCliente+'/'+idProcesso;
		data.id_cliente = idCliente;
		data.id_processo = idProcesso;
		data.container = '.container_cliente_load';
		data.nome_relatorio = 'ClientesOutros';
		console.log('ggggggggggggggg Selecionar clientes outros gggggggggggggggggggggggg');
		console.log(data);
		console.log('gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar', data: data, usuario: req.session.usuario});
	});
});



router.get('/selecionar-todos-adversos-outros/:id/:idProcesso', function(req, res, next) {
	var idAdverso = req.params.id;
	var idProcesso = req.params.idProcesso;
	model.SelecioneTodosAdversosMenosOEnvolvido(idAdverso).then(data_dados =>{
		data.dados = data_dados;
		data.cadastrar_item = '/sistema/processos/cadastrar-envolvido-adverso';
		data.adicionar_link = '/adversos/criar-simples/'+idAdverso+'/'+idProcesso;
		data.id_adverso = idAdverso;
		data.id_processo = idProcesso;
		data.container = '.container_adverso_load';
		data.nome_relatorio = 'AdversosOutros';
		console.log('hhhhhhhhhhhhhhhhhhhhhhh Selecionar Adversos outros hhhhhhhhhhhhhhhhh');
		console.log(data);
		console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar', data: data, usuario: req.session.usuario});
	});
});

router.get('/parcelas/:id',function(req, res, next){
	var idProcesso = req.params.id;
	console.log('×××××××××××××× id processo ××××××××××××××');
	console.log(idProcesso);
	console.log('×××××××××××××××××××××××××××××××××××××××××');
	
	model.SelecionarParcelasDoProcesso(idProcesso).then(data_parcelas =>{
		data.id_processo = idProcesso;
		data.parcelas = data_parcelas;
		console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Parcelas do Processo ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑');
		console.log(data);	
		console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/area_parcelas_processo', data: data, usuario: req.session.usuario});
	});

});


router.post('/cadastrar-adverso-simples', function(req, res, next) {
	POST = req.body;
	console.log('DDDDDDDDDD CADASTRO DO ADVERSO SIMPLES DDDDDDDDDDDD');
	console.log(POST);
	console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
	data_insert = {nome:POST.nome,tipo:POST.tipo,cpf_cnpj:POST.cpf_cnpj,tel:POST.tel,
		email:POST.email,contato:POST.contato,cep:POST.cep,bairro:POST.bairro,rua:POST.rua,
		numero:POST.numero,estado:POST.estado,cidade:POST.cidade,advogado:POST.advogado};

		idAdverso = POST.id_adverso_nao_envolvido;
		idProcesso = POST.id_processo;

		model.CadastrarAdverso(data_insert).then(dataCadastroAdverso=> {
			model.SelecioneTodosAdversosMenosOEnvolvido(idAdverso).then(data_dados =>{
				data.dados = data_dados;
				data.cadastrar_item = '/sistema/processos/cadastrar-envolvido-adverso';
				data.adicionar_link = '/adversos/criar-simples/'+idAdverso+'/'+idProcesso;
				data.id_adverso = idAdverso;
				data.id_processo = idProcesso;
				data.container = '.container_adverso_load';
				data.nome_relatorio = 'AdversosOutros';
				console.log('hhhhhhhhhhhhhhhhhhhhhhh Selecionar Adversos outros hhhhhhhhhhhhhhhhh');
				console.log(data);
				console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar', data: data, usuario: req.session.usuario});
			});
		});
	});



router.post('/cadastrar-cliente-simples', function(req, res, next) {
	POST = req.body;
	console.log('DDDDDDDDDD CADASTRO DO CLIENTE SIMPLES DDDDDDDDDDDD');
	console.log(POST);
	console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
	data_insert = {nome:POST.nome,tipo:POST.tipo,tipo_cliente:POST.tipo_cliente,
		id_grupo:POST.id_grupo,cpf_cnpj:POST.cpf_cnpj,email:POST.email,
		rg:POST.rg,ctps:POST.ctps,serie:POST.serie,n_pis:POST.n_pis,n_beneficio:POST.n_beneficio,
		estado_civil:POST.estado_civil,profissao:POST.profissao,nascimento:POST.nascimento,
		inscricao_estadual:POST.inscricao_estadual,tel_pessoal:POST.tel_pessoal,
		tel_trabalho:POST.tel_trabalho,tel_contato:POST.tel_contato,tel_outro:POST.tel_outro,
		observacoes:POST.observacoes,banco:POST.banco,agencia:POST.agencia,
		n_conta_corrente:POST.n_conta_corrente,cep:POST.cep,bairro:POST.bairro,rua:POST.rua,
		numero:POST.numero,estado:POST.estado,cidade:POST.cidade};

		idCliente = POST.id_cliente_nao_envolvido;
		idProcesso = POST.id_processo;

		model.CadastrarCliente(data_insert).then(dataCadastroAdverso=> {
			model.SelecioneTodosClientesMenosOEnvolvido(idCliente).then(data_dados =>{
				data.dados = data_dados;
				data.cadastrar_item = '/sistema/processos/cadastrar-envolvido-cliente';
				data.adicionar_link = '/clientes/criar-simples/'+idCliente+'/'+idProcesso;
				data.id_cliente = idCliente;
				data.id_processo = idProcesso;
				data.container = '.container_cliente_load';
				data.nome_relatorio = 'ClientesOutros';
				console.log('hhhhhhhhhhhhhhhhhhhhhhh Selecionar Adversos outros hhhhhhhhhhhhhhhhh');
				console.log(data);
				console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar', data: data, usuario: req.session.usuario});
			});
		});
	});






router.get('/selecionar-todos-advogados', function(req, res, next) {
	model.SelecioneTodosAdvogados().then(data_dados =>{
		data.dados = data_dados;
		model.SelecioneOabExtraTodosAdvogados().then(data_oab=>{
			data.nome_relatorio = 'Advogados';
			data.nome_campo_extra = 'Oab';
			data.campo_extra = data_oab;
			data.mensagem = "*Se o Advogado Não estiver na lista por-favor pedir ao administrador para adicionar!*";
			console.log('------------- data todos advogados ----------');
			console.log(data);
			console.log('---------------------------------------------');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_no_edit', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/pesquisar-todos-advogados-autocomplete/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	console.log('@@@@@@@@ ESTOU PESQUISANDO UM ADVOGADO @@@@@@@@@@@@@@@@');
	console.log(pesquisa);
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	model.PesquisarTodosAdvogadosAutocomplete(pesquisa).then(data =>{
		res.json(data);
	});
});




router.get('/selecionar-todos-advogados-do-setor-compromisso', function(req, res, next) {
	model.SelecioneTodosAdvogados().then(data_dados =>{
		data.dados = data_dados;
		model.SelecioneOabExtraTodosAdvogados().then(data_oab=>{
			data.nome_relatorio = 'Advogados';
			data.nome_campo_extra = 'Oab';
			data.campo_extra = data_oab;
			data.nome_campo_extra_oab = 'Oab';
			data.mensagem = "*Se o Advogado Não estiver na lista por-favor pedir ao administrador para adicionar!*";
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_advogados_setor_compromisso', data: data, usuario: req.session.usuario});
		});
	});
});



router.get('/adicionar-tipo-causa',function(req, res, next) {
	data.tipo_generico = 13;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});


router.get('/adicionar-tipo-causa-apenso',function(req, res, next) {
	data.tipo_generico = 14;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});


router.get('/adicionar-posicao-apenso',function(req, res, next) {
	data.tipo_generico = 7;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-relator-recurso',function(req, res, next) {
	data.tipo_generico = 10;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-situacao-apenso',function(req, res, next) {
	data.tipo_generico = 11;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-foro',function(req, res, next) {
	data.tipo_generico = 4;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-assunto',function(req, res, next) {
	data.tipo_generico = 0;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-origem-captacao',function(req, res, next) {
	data.tipo_generico = 5;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-comarca',function(req, res, next) {
	data.tipo_generico = 19;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-tipo-acao-rito',function(req, res, next) {
	data.tipo_generico = 12;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-tipo-recurso',function(req, res, next) {
	data.tipo_generico = 15;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-posicao-cliente',function(req, res, next) {
	data.tipo_generico = 9;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-tribunal',function(req, res, next) {
	data.tipo_generico = 16;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-turma-camara-recurso',function(req, res, next) {
	data.tipo_generico = 17;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-vara',function(req, res, next) {
	data.tipo_generico = 18;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-categorias',function(req, res, next) {
	data.tipo_generico = 1;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-fase',function(req, res, next) {
	data.tipo_generico = 3;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});

router.get('/adicionar-banco',function(req, res, next) {
	data.tipo_generico = 20;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adicionar_descricao_generico', data: data, usuario: req.session.usuario});
});


router.get('/adicionar-parcela',function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/cadastro_parcela_financeiro', data: data, usuario: req.session.usuario});
});




router.get('/tipo-causa', function(req, res, next) {
	model.SelecioneTipoCausa().then(data_tipo_causa =>{
		data.dados = data_tipo_causa;
		console.log('************************** Dentro do Tipo Causa **************************');
		console.log(data);
		console.log('**************************************************************************');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
	});
});


router.get('/mortos', function(req, res, next) {
	model.SelecioneUsuarios().then(data_usuarios => {
		data.usuarios = data_usuarios;
		model.SelecioneClientes().then(data_clientes => {
			data.clientes = data_clientes;
			model.SelecioneAdversos().then(data_adversos => {
				data.adversos = data_adversos;
				model.SelecioneProcessosMortos().then(data_processos => {
					data.processos = data_processos;
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/index_mortos', data: data, usuario: req.session.usuario, morto: 1});
				});
			});
		});
	});
});




router.get('/alterar_cliente_processo/:id',function(req, res, next){
	var id = req.params.id;
	model.SelecionarCliente(id).then(data_cliente => {
		data.cliente = data_cliente;
		console.log('%%%%%%%%%%%%%%%% Alterar Cliente %%%%%%%%%%%%%%%%%%%%%%%%%%');
		console.log(data);
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/alterar_cliente_processo', data: data, usuario: req.session.usuario});
	});
});


router.get('/alterar_adverso_processo/:id',function(req, res, next){
	var id = req.params.id;
	model.SelecionarAdverso(id).then(data_adverso => {
		data.adverso = data_adverso;
		console.log('%%%%%%%%%%%%%%%% Alterar ADVERSO %%%%%%%%%%%%%%%%%%%%%%%%%%');
		console.log(data);
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'adversos/alterar_adverso_processo', data: data, usuario: req.session.usuario});
	});
});



router.post('/pesquisar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('------------------------- Pesquisar -------------------------');
	console.log(POST);
	console.log('-------------------------------------------------------------');
	model.ProcurarProcesso(POST).then(data_processo => {
		data.processos = data_processo;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/tabela_interna_only', data: data, usuario: req.session.usuario});
	});
});


router.post('/pesquisarcruzamento', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('------------------------- Pesquisar Cruzamento -------------------------');
	console.log(POST);
	console.log('-------------------------------------------------------------');
	model.ProcurarProcessoCruzamento(POST).then(data_processo => {
		data.processos = data_processo;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/tabela_interna_only', data: data, usuario: req.session.usuario});
	});
});





router.post('/cadastrar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.CadastrarProcesso(POST).then(data => {
			res.json(data);
		});
	});

router.post('/andamentos_cadastrar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('qqqqqqqqqqqqqqqqqqqq');
	console.log(POST);
	console.log('qqqqqqqqqqqqqqqqqqqqqq');

	if(POST.andamento_descricao != ''){
		data_insert = {id_processo: POST.id, id_usuario:req.session.usuario.id, descricao:POST.andamento_descricao, data: POST.andamento_data, tipo:POST.andamento_tipo};
		console.log('<<<<<<<<<<<<<<<<<<<< ANDAMENTOS CADASTRAR <<<<<<<<<<<<<<<<<<<<<<<<<');
		console.log(data_insert);
		console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
		model.CadastrarAndamento(data_insert).then(data_insert_and => {
			model.SelecioneAndamentosDoProcesso(POST.id).then(data_andamento_processo =>{
				data.andamentos = data_andamento_processo;
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/tabela_andamentos_only', data: data, usuario: req.session.usuario});

			});

			// res.send({result:'redirect',url:'/sistema/processos/abrir/'+POST.id});
		});
	}else{
		model.SelecioneAndamentosDoProcesso(POST.id).then(data_andamento_processo =>{
			data.andamentos = data_andamento_processo;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/tabela_andamentos_only', data: data, usuario: req.session.usuario});
		});
	}
});

router.post('/adicionar-outros-envolvidos',function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;

	console.log(':::::::::::::::::::::::::: DADOS DO CADASTRAR OUTROS ENVOLVIDOS :::::::::::::::::::');
	console.log(POST);
	console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
	// model.CadastrarOutrosEnvolvidos(POST).then(data => {
	// 	res.json(data);
	// });
});



router.post('/adicionar-tipo-causa',function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log(':::::::::::::::::::::::::: DADOS DO CADASTRAR TIPO-CAUSA :::::::::::::::::::');
	console.log(POST);
	console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
	model.CadastrarTipoCausa(POST).then(data => {
		res.json(data);
	});
});


router.post('/adicionar-descricao-generico/:tipo',function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.tipo = req.params.tipo;
	console.log(':::::::::::::::::::::::::: DADOS DO CADASTRAR GENERICO :::::::::::::::::::');
	console.log(POST);
	console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');


	model.CadastrarDescricaoGenerico(POST).then(data_d => {
		model.SelecioneTodosDescricaoGenerica(POST.tipo).then(data_dados =>{
			data.dados = data_dados;
			switch(POST.tipo){
				case 0:
				data.adicionar_link = '/processos/adicionar-assunto';
				data.nome_relatorio = 'Assunto';
				break;
				case 1:
				data.adicionar_link = '/processos/adicionar-categorias';
				data.nome_relatorio = 'Categorias';
				break;
				case 2:
				break;
				case 3:
				data.adicionar_link = '/processos/adicionar-fase';
				data.nome_relatorio = 'Fase';
				break;
				case 4:
				data.adicionar_link = '/processos/adicionar-foro';
				data.nome_relatorio = 'Foro';
				break;
				case 5:
				data.adicionar_link = '/processos/adicionar-origem-captacao';
				data.nome_relatorio = 'OrigemCaptacao';
				break;
				case 6:
				break;
				case 7:
				data.adicionar_link = '/processos/adicionar-posicao-apenso';
				data.nome_relatorio = 'PosicaoApenso';
				break;
				case 8:
				break;
				case 9:
				data.adicionar_link = '/processos/adicionar-posicao-cliente';
				data.nome_relatorio = 'PosicaoCliente';
				break;
				case 10:
				data.adicionar_link = '/processos/adicionar-relator-recurso';
				data.nome_relatorio = 'RelatorRecurso';
				break;
				case 11:
				data.adicionar_link = '/processos/adicionar-situacao-apenso';
				data.nome_relatorio = 'SituacaoApenso';
				break;
				case 12:
				data.adicionar_link = '/processos/adicionar-tipo-acao-rito';
				data.nome_relatorio = 'TipoAcaoRito';
				break;
				case 13:
				data.adicionar_link = '/processos/adicionar-tipo-causa';
				data.nome_relatorio = 'TipoCausa';
				break;
				case 14:
				data.adicionar_link = '/processos/adicionar-tipo-causa-apenso';
				data.nome_relatorio = 'TipoCausaApenso';
				break;
				case 15:
				data.adicionar_link = '/processos/adicionar-tipo-recurso';
				data.nome_relatorio = 'TipoRecurso';
				break;
				case 16:
				data.adicionar_link = '/processos/adicionar-tribunal';
				data.nome_relatorio = 'Tribunal';
				break;
				case 17:
				data.adicionar_link = '/processos/adicionar-turma-camara-recurso';
				data.nome_relatorio = 'TurmaCamaraRecurso';
				break;
				case 18:
				data.adicionar_link = '/processos/adicionar-vara';
				data.nome_relatorio = 'Vara';
				break;
				case 19:
				data.adicionar_link = '/processos/adicionar-comarca';
				data.nome_relatorio = 'Comarca';
				break;
			}
			console.log('CCCCCCCCCCCCCCCCCC DATA FINAL CADASTRAR CCCCCCCCCCCCCCCCCCC');
			console.log(data);
			console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');

			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
		});
	});
});



// router.post('/editar-descricao-generico/', function(req, res, next) {
// 	POST = req.body;
// 	console.log('RRRRRRRRRRRRRRRR EDITAR DESCRICAO GENERICO RRRRRRRRRRRRRRRRRRRRRRRR');
// 	console.log(POST);
// 	console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');


// 	model.AtualizarDescricaoGenerico(POST).then(data => {
// 		model.SelecionarTipoDoGenericoPorId(POST.id).then(data_tipo => {
// 			console.log('TTTTTTTTTTTTTTTIPPPPPPPPPPPOOOOOOOOOO');
// 			console.log(data_tipo[0].tipo);
// 			console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');

// 			model.SelecioneTodosDescricaoGenerica(data_tipo[0].tipo).then(data_dados =>{
// 				data.dados = data_dados;

// 				switch(data_tipo[0].tipo){
// 					case 0:
// 					data.adicionar_link = '/processos/adicionar-assunto';
// 					data.nome_relatorio = 'Assunto';
// 					break;
// 					case 1:
// 					data.adicionar_link = '/processos/adicionar-categorias';
// 					data.nome_relatorio = 'Categorias';
// 					break;
// 					case 2:
// 					break;
// 					case 3:
// 					data.adicionar_link = '/processos/adicionar-fase';
// 					data.nome_relatorio = 'Fase';
// 					break;
// 					case 4:
// 					data.adicionar_link = '/processos/adicionar-foro';
// 					data.nome_relatorio = 'Foro';
// 					break;
// 					case 5:
// 					data.adicionar_link = '/processos/adicionar-origem-captacao';
// 					data.nome_relatorio = 'OrigemCaptacao';
// 					break;
// 					case 6:
// 					break;
// 					case 7:
// 					data.adicionar_link = '/processos/adicionar-posicao-apenso';
// 					data.nome_relatorio = 'PosicaoApenso';
// 					break;
// 					case 8:
// 					break;
// 					case 9:
// 					data.adicionar_link = '/processos/adicionar-posicao-cliente';
// 					data.nome_relatorio = 'PosicaoCliente';
// 					break;
// 					case 10:
// 					data.adicionar_link = '/processos/adicionar-relator-recurso';
// 					data.nome_relatorio = 'RelatorRecurso';
// 					break;
// 					case 11:
// 					data.adicionar_link = '/processos/adicionar-situacao-apenso';
// 					data.nome_relatorio = 'SituacaoApenso';
// 					break;
// 					case 12:
// 					data.adicionar_link = '/processos/adicionar-tipo-acao-rito';
// 					data.nome_relatorio = 'TipoAcaoRito';
// 					break;
// 					case 13:
// 					data.adicionar_link = '/processos/adicionar-tipo-causa';
// 					data.nome_relatorio = 'TipoCausa';
// 					break;
// 					case 14:
// 					data.adicionar_link = '/processos/adicionar-tipo-causa-apenso';
// 					data.nome_relatorio = 'TipoCausaApenso';
// 					break;
// 					case 15:
// 					data.adicionar_link = '/processos/adicionar-tipo-recurso';
// 					data.nome_relatorio = 'TipoRecurso';
// 					break;
// 					case 16:
// 					data.adicionar_link = '/processos/adicionar-tribunal';
// 					data.nome_relatorio = 'Tribunal';
// 					break;
// 					case 17:
// 					data.adicionar_link = '/processos/adicionar-turma-camara-recurso';
// 					data.nome_relatorio = 'TurmaCamaraRecurso';
// 					break;
// 					case 18:
// 					data.adicionar_link = '/processos/adicionar-vara';
// 					data.nome_relatorio = 'Vara';
// 					break;
// 					case 19:
// 					data.adicionar_link = '/processos/adicionar-comarca';
// 					data.nome_relatorio = 'Comarca';
// 					break;
// 				}

// 				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral', data: data, usuario: req.session.usuario});
// 			});
// 		});
// 	});
// });
















router.post('/captacao_cadastrar',function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;

	console.log(':::::::::::::::::::::::::: DADOS DO CADASTRAR CAPTACAO :::::::::::::::::::');
	console.log(POST);
	console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
	console.log(POST.id_processo);

	/*Ver se já existe a captação*/
	model.SelecioneCaptacaoDoProcesso(POST.id_processo).then(data_captacao => {
		console.log('DDDDD DATA CAPTACAO DDDDDDDDDDDDDDDDDDDDDDDDD');
		console.log(data_captacao[0].id_captacao);
		console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
		if(data_captacao[0].id_captacao == undefined){
			console.log('!!!!!!!!!!!!!! ESTÁ VAZIO !!!!!!!!!!!!!!!!!');
			model.CadastrarCaptacao(POST).then(data => {
				res.json(data);
			});
		}else{
			console.log('@@@@@@@@@@@@@@ NÃO ESTÁ VAZIO @@@@@@@@@@@@@@@@@@@@@@');
			model.AtualizarCaptacao(POST).then(data => {
				res.json(data);
			});
		}

	});
});


router.post('/cadastrar-previo',function(req, res, next){
	POST = req.body;
	console.log('||||||||||||||||||| DADOS DO CADASTRAR PREVIO |||||||||||||||||||||||||');
	console.log(POST);
	console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');

	var dadosDocumentos = {id_usuario:req.session.usuario.id,arquivo:POST.numero,tipo:1,onde:2};

	model.CadastrarProcesso(POST).then(id_processo_cadastro => {
		model.CadastrarPasta(dadosDocumentos).then(id_documento =>{
			res.send({result:'redirect',url:'/sistema/processos/abrir/'+id_processo_cadastro});
					// res.redirect('/sistema/processos/abrir/'+id_processo_cadastro);
				});
	});
});


router.post('/cadastrar-envolvido-cliente',function(req, res, next){
	POST = req.body;
	data_insert = {id_processo:POST.id_processo, id_cliente:POST.id_cliente, id_outros_tipo:0};
	console.log('99999999999999999999 DADOS QUE ESTOU ENVIANDO PARA O POST 9999999999999999999');
	console.log(POST);
	console.log('99999999999999999999999999999999999999999999999999999999999999999999999999999');
	console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv DATA INSERT vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
	console.log(data_insert);
	console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');

	model.CadastrarOutrosEnvolvidosCliente(data_insert).then(data_c =>{
		model.SelecionarClientePorProcesso(POST.id_processo).then(id_cliente =>{
			data.id_processo = POST.id_processo;
			data.id_cliente = id_cliente;
			model.SelecionarEnvolvidosCliente(POST.id_processo).then(data_envolvidos =>{
				data.outros = data_envolvidos;
				model.SelecionarTiposOutrosEnvolvidos().then(data_tipos_posicoes =>{
					data.outros_posicoes = data_tipos_posicoes;			
					console.log('--------------------- DETALHES ENVOLVIDOS ----------------------');
					console.log(data);
					console.log('----------------------------------------------------------------');
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/outros_envolvidos_cliente', data: data, usuario: req.session.usuario});
				});
			});
		});
	});
});


router.post('/cadastrar-envolvido-adverso',function(req, res, next){
	POST = req.body;
	data_insert = {id_processo:POST.id_processo, id_adverso:POST.id_cliente, id_outros_tipo:0};
	console.log('99999999999999999999 DADOS QUE ESTOU ENVIANDO PARA O POST 9999999999999999999');
	console.log(POST);
	console.log('99999999999999999999999999999999999999999999999999999999999999999999999999999');
	console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv DATA INSERT vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
	console.log(data_insert);
	console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');

	model.CadastrarOutrosEnvolvidosAdverso(data_insert).then(data_o =>{
		model.SelecionarAdversoPorProcesso(POST.id_processo).then(id_adverso =>{
			data.id_processo = POST.id_processo;
			data.id_adverso = id_adverso;
			model.SelecionarEnvolvidosAdverso(POST.id_processo).then(data_envolvidos =>{
				data.outros = data_envolvidos;
				model.SelecionarTiposOutrosEnvolvidos().then(data_tipos_posicoes =>{
					data.outros_posicoes = data_tipos_posicoes;			
					console.log('--------------------- DETALHES ENVOLVIDOS ----------------------');
					console.log(data);
					console.log('----------------------------------------------------------------');
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/outros_envolvidos_adverso', data: data, usuario: req.session.usuario});
				});
			});

		});
	});
});


router.post('/cadastrar_dados_para_calculo_processo/', function(req, res, next) {

	
	POST = req.body;

	console.log('ååååååå POST ååååååååååååååååååååååååååååååå');
	console.log(POST);
	console.log('åååååååååååååååååååååååååååååååååååååååååååå');

	//vhe=valor_honorario_escritorio,vhp = valor_honorario_perito, vir = valor_imposto_renda
	var vhe = POST.porc_honorario_escritorio;
	var vhp = POST.porc_honorario_perito;
	var vir = POST.porc_imposto_renda;

	data_insert = {id_processo:POST.id, data_sentenca_acordo: POST.data_sentenca_acordo, 
		porc_honorario_escritorio:vhe,
		porc_honorario_perito:vhp,
		porc_imposto_renda:vir};

		console.log('╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚ data insert ╚╚╚╚╚╚╚╚╚╚╚╚');
		console.log(data_insert);
		console.log('╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚');

		model.CadastrarDadosParaCalculoFinanceiroProcesso(data_insert).then(id_dados_calculo =>{
			model.SelecionarDadosParaCalculoPorId(id_dados_calculo).then(data_dados_para_calculo=>{
				data.calculos_financeiro = data_dados_para_calculo;				
				model.SelecionarParcelasDoProcesso(POST.id).then(data_parcelas =>{
					data.id_processo = POST.id;
					data.parcelas = data_parcelas;
					console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Parcelas do Processo ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑');
					console.log(data);	
					console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/area_parcelas_processo', data: data, usuario: req.session.usuario});
				});
			});
		});

	});

router.post('/atualizar_envolvido_cliente/:iterador', function(req, res, next) {
	// Recebendo o valor do post
	var i = req.params.iterador;
	// var idProcesso = req.params.idProcesso;
	console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII ITERADOR IIIIIIIIIIIIIIIIIIII');
	console.log(i);
	console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
	POST = req.body;

	console.log('GGGGGGGGGGGGGGGGGGGGGGGGG ID CLIENTE OUTROS GGGGGGGGGGGGGGG');
	console.log(POST.id_outros[i]);

	console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');

	console.log('SEM ITTTTTTTTTTTTTTTTTTTTTTTTTTT');
	console.log(POST.id_outros);
	console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');


	console.log('AAAAAAAAAAAAAAAAAAAAAAAA ENVOLVIDO AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
	console.log(POST);
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
	console.log('TIPO PPPPPPPPPPPPPPPPPPPPP');
	console.log(POST.id_outros_tipo[i]);
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPP');

	if(Array.isArray(POST.id_outros)){
		data_insert = {id:POST.id_outros[i], id_outros_tipo:POST.id_outros_tipo[i]};
	}else{
		data_insert = {id:POST.id_outros, id_outros_tipo:POST.id_outros_tipo};
	}


	console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDD DATA INSERT DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
	console.log(data_insert);
	console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');

	model.AtualizarOutroEnvolvidoCliente(data_insert).then(data =>{
		res.json(data);
	});
});



router.post('/atualizar_envolvido_adverso/:iterador', function(req, res, next) {
		// Recebendo o valor do post
		var i = req.params.iterador;
		POST = req.body;

		if(Array.isArray(POST.id_outros)){
			data_insert = {id:POST.id_outros[i], id_outros_tipo:POST.id_outros_tipo[i]};
		}else{
			data_insert = {id:POST.id_outros, id_outros_tipo:POST.id_outros_tipo};
		}

		model.AtualizarOutroEnvolvidoAdverso(data_insert).then(data =>{
			res.json(data);
		});
	});





router.post('/alterar_cliente_processo', function(req, res, next) {
	POST = req.body;


	console.log('JJJJJJJJJJ ALTERAR CLIENTE PROCESSO JJJJJJJJJJJJJJJJJJJJJJJJJJJ');
	console.log(POST);
	console.log('JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ');
	data_insert = {id:POST.id, id_cliente: POST.id_cliente};

	model.AtualizarProcesso(data_insert).then(data => {
		res.json(data);
	});
});

router.post('/alterar_adverso_processo', function(req, res, next) {
	POST = req.body;

	console.log('GGGGGGGGGGGGGGGGGGGGGG ALTERAR ADVERSO PROCESSO GGGGGGGGGGGGGGGGGGGGGG');
	console.log(POST);
	console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');
	data_insert = {id:POST.id, id_adverso: POST.id_adverso};

	model.AtualizarProcesso(data_insert).then(data => {
		res.json(data);
	});
});


router.post('/atualizar/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('AAAAAAAAAAAAAAAAAAAAAAAA ATUALIZAR PROCESSO AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
	console.log(POST);
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');


	data_insert = {id:POST.id,id_usuario:req.session.usuario.id,id_posicao_cliente:POST.id_posicao_cliente, 
		numero:POST.numero, distribuicao: POST.distribuicao, citacao: POST.cituacao, 
		status: POST.status, id_tipo_causa: POST.id_tipo_causa, id_assunto:POST.id_assunto, 
		id_comarca:POST.id_comarca, id_tipo_acao_rito: POST.id_tipo_acao_rito, 
		id_vara: POST.id_vara, id_categoria: POST.id_categoria, id_fase:POST.id_fase, 
		id_advogado: POST.id_advogado, deletado: POST.deletado};

		console.log('dddddddddddddddddddddddddd data_insert ddddddddddddddddddddd');
		console.log(data_insert);
		console.log('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd');


		if(POST.id_advogado != ''){
			model.VerificarSeOutroAdvogadoFoiAtribuidoAoProcesso(POST.id_advogado,POST.id).then(data_novo_advogado=>{
				/*se não retornar nada ou diferente quer dizer que é outro advogado
				então é necessário notificá-lo*/
				if(data_novo_advogado == '' || data_novo_advogado == undefined){

					var linkNotificacao = '/processos/abrir/'+POST.id;
					var texto_notf = 'Atribuido Processo "' + POST.numero+'"';

					data_notificacao = {id_usuario_criador:req.session.usuario.id, id_usuario: POST.id_advogado,
						texto:texto_notf,link:linkNotificacao};
						model.CadastrarNotificacao(data_notificacao).then(data_not=>{
							model.AtualizarProcesso(data_insert).then(data => {
								res.json(data);
							});			
						});

					}

				});

		}else{
			model.AtualizarProcesso(data_insert).then(data => {
				res.json(data);
			});			
		}

	});

router.post('/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarProcesso(POST).then(data=> {
		res.json(data);
	});
});

router.post('/desativar-apenso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarApenso(POST).then(data=> {
		res.json(data);
	});
});


router.post('/desativar-recurso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarRecurso(POST).then(data=> {
		res.json(data);
	});
});

router.post('/desativar-descricao-generico', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarDescricaoGenerico(POST).then(data=> {
		res.json(data);
	});
});



router.post('/desativar-outros-envolvidos-adverso/:idProcesso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	var idProcesso = req.params.idProcesso;

	model.DesativarOutrosEnvolvidosAdverso(POST).then(datadeletado=> {
		model.SelecionarAdversoPorProcesso(idProcesso).then(id_adverso =>{
			data.id_processo = idProcesso;
			data.id_adverso = id_adverso;
			model.SelecionarEnvolvidosAdverso(idProcesso).then(data_envolvidos =>{
				data.outros = data_envolvidos;
				model.SelecionarTiposOutrosEnvolvidos().then(data_tipos_posicoes =>{
					data.outros_posicoes = data_tipos_posicoes;
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/outros_envolvidos_adverso', data: data, usuario: req.session.usuario});
				});
			});
		});
	});
});

router.post('/desativar-outros-envolvidos-cliente/:idProcesso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	var idProcesso = req.params.idProcesso;

	model.DesativarOutrosEnvolvidosCliente(POST).then(datadeletado=> {
		model.SelecionarClientePorProcesso(idProcesso).then(id_cliente =>{
			data.id_processo = idProcesso;
			data.id_cliente = id_cliente;
			model.SelecionarEnvolvidosCliente(idProcesso).then(data_envolvidos =>{
				data.outros = data_envolvidos;
				model.SelecionarTiposOutrosEnvolvidos().then(data_tipos_posicoes =>{
					data.outros_posicoes = data_tipos_posicoes;
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/outros_envolvidos_cliente', data: data, usuario: req.session.usuario});
				});
			});
		});
	});
});


router.post('/desativar-compromisso/:idProcesso', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	var idProcesso = req.params.idProcesso;

	console.log('PPPPPPPPPPPPPP POST DESATIVAR COMPROMISSO PPPPPPPPPPPPP');
	console.log(POST);
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');


	model.DesativarCompromisso(POST).then(datadeletado=> {
		model.SelecioneCompromissosDoProcesso(idProcesso).then(data_compromisso_processo =>{
			data.compromissos = data_compromisso_processo;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/tabela_compromissos_only', data: data, usuario: req.session.usuario});
		});
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

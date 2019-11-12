// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var AdversosModel = require('../model/adversosModel.js');
var model = new AdversosModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelecioneAdversos().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'adversos/index', data: data, usuario: req.session.usuario});
	});
});
router.get('/criar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'adversos/adversos_criar', data: data, usuario: req.session.usuario});
});

router.get('/criar-simples/:idAdverso/:idProcesso', function(req, res, next) {	
	var idAdverso = req.params.idAdverso;
	var idProcesso = req.params.idProcesso;	
	data.idAdversoNaoEnvolvido = idAdverso;
	data.idProcesso = idProcesso;
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'adversos/adversos_criar_simples', data: data, usuario: req.session.usuario});
});







router.get('/editar/:id', function(req, res, next) {
	var id = req.params.id;
	model.SelecionarAdverso(id).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'adversos/adversos_editar', data: data, usuario: req.session.usuario});
	});
});


router.get('/editar_dentro_processo/:id', function(req, res, next) {
	var id = req.params.id;
	model.SelecionarAdverso(id).then(data_adverso => {
		data.adversoCad = data_adverso;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'adversos/adversos_editar_no_processo', data: data, usuario: req.session.usuario});
	});
});




router.get('/selecionar-todos-modal', function(req, res, next) {
	model.SelecioneAdversosDescricao().then(data_adversos =>{
		data.dados = data_adversos;
		model.SelecionAdversosCpfCnpjExtra().then(data_cpf_cnpj =>{
			data.nome_campo_extra = 'CPF/CNPJ';
			data.campo_extra = data_cpf_cnpj;
			console.log('************************* Dentro do Adverso Modal **************************');
			console.log(data);
			console.log('**************************************************************************');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_no_edit', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/selecionar-todos-dados-modal', function(req, res, next) {
	model.SelecioneAdversosDescricao().then(data_adversos =>{
		console.log('^^^^^^^^^^^^^^^ data_adversos ^^^^^^^^^^^^');
		console.log(data_adversos)
		console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
		data.dados = data_adversos;
		data.adicionar_link = '/adversos/adicionar-simples';
		console.log('!!!!!!!!!!!!!!!!!!!!! Adverso Modal Todos !!!!!!!!!!!!!!!!!!!!!');
		console.log(data);
		console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_adverso', data: data, usuario: req.session.usuario});
	});
});


router.get('/listar_todos_processos/:id',function(req, res, next){
	var idAdverso = req.params.id;
	model.SelecionarTodosProcessosDoAdverso(idAdverso).then(data_processo =>{
		data.processos_adverso = data_processo;		
		console.log('======================== TODOS PROCESSOS ======================');
		console.log(data);
		console.log('===============================================================');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'adversos/todos_processos', data: data, usuario: req.session.usuario});
	});
});


router.get('/ver_cadastro/:id',function(req, res, next){
	var id = req.params.id;
	model.SelecionarAdverso(id).then(data_adverso => {
		data.adverso = data_adverso;
		console.log('$$$$$$$$$$$$$$$$$$$$$$$$ ADVERSO $$$$$$$$$$$$$$$$$$$$$$$$$$$');
		console.log(data);
		console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'adversos/ver_cadastro', data: data, usuario: req.session.usuario});
	});

});


router.get('/pesquisar-adverso-por-cpf-cnpj/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	console.log('aaaaaaaaaaaaaa POST DA PESQUISA DO ADVERSO NO CLIENTE aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
	console.log(pesquisa);
	console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
	model.PesquisarAdversoPorCpfCnpj(pesquisa).then(data_adverso=> {
		console.log('bbbbbbbbbbbbbbbbbbbbbbbbbb resultado do post da pesquisa bbbbbbbbbbbbbbbbbbbbbbb');
		console.log(data_adverso);
		console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
		if (data_adverso != ''){
			data.adverso = data_adverso;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'adversos/adversos_editar_no_cliente', data: data, usuario: req.session.usuario});

		}else{
			data.cpf_cnpj = pesquisa;
			console.log('nnnnnnnnnnnnnnnnnnnnnnn Nao existe cpf_cnpj nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
			console.log(data);
			console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'adversos/adversos_criar_no_cliente', data: data, usuario: req.session.usuario});
		}
	});
});


router.get('/pesquisar-adverso-por-cpf-cnpj-autocomplete/:cpf_cnpj', function(req, res, next) {

	cpf_cnpj = req.params.cpf_cnpj;
	console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFF cpf_cnpj FFFFFFFFFFFFFFFFFFFFFFF');
	console.log(cpf_cnpj);
	console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');

	model.PesquisarNomeAdversoPorCpfCnpjAutocomplete(cpf_cnpj).then(data => {
		console.log('========================= procurar faculdade ===================');
		console.log(data);
		console.log('===============================================================');
		res.json(data);
	});
});




router.post('/pesquisar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.ProcurarAdversos(POST).then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'adversos/tabela_interna_only', data: data, usuario: req.session.usuario});
	});
});

router.post('/cadastrar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.CadastrarAdverso(POST).then(data => {
		res.json(data);
	});
});

router.post('/atualizar/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.AtualizarAdverso(POST).then(data => {
		res.json(data);
	});
});


router.post('/atualizar_adverso_no_processo/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('AAAAAAAAAAAA ATUALIZAR ADVERSO AAAAAAAAAAAAAAAA');
	console.log(POST);
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

	data_insert = {id:POST.adverso_ver_cad_id,nome:POST.adverso_ver_cad_nome, 
		tipo:POST.adverso_ver_cad_tipo, cpf_cnpj: POST.adverso_ver_cad_cpf_cnpj, 
		tel:POST.adverso_ver_cad_tel, email: POST.adverso_ver_cad_email,
		contato: POST.adverso_ver_cad_contato, cep:POST.adverso_ver_cad_cep,
		bairro:POST.adverso_ver_cad_bairro,	rua:POST.adverso_ver_cad_rua,
		numero:POST.adverso_ver_cad_numero, cidade:POST.adverso_ver_cad_cidade,
		estado:POST.adverso_ver_cad_estado,advogado:POST.adverso_ver_cad_advogado};

		console.log('TTTTTTTTTTTTTTTTTT DATA INSERT TTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
		console.log(data_insert);
		console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');

		model.AtualizarAdverso(data_insert).then(data_update => {
			model.SelecionarAdverso(POST.adverso_ver_cad_id).then(data_adverso => {
				data.adversoCad = data_adverso;
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'adversos/adversos_editar_no_processo', data: data, usuario: req.session.usuario});
			});
		});
	});





router.post('/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarAdverso(POST).then(data=> {
		res.json(data);
	});
});







module.exports = router;

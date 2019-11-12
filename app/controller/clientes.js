// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var ClientesModel = require('../model/clientesModel.js');
var model = new ClientesModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelecioneGrupos().then(data_grupos => {
		data.grupos = data_grupos;
		model.SelecioneClientes().then(data_clientes => {
			data.clientes = data_clientes;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/index', data: data, usuario: req.session.usuario});
		});
	});
});
router.get('/criar', function(req, res, next) {
	model.SelecioneGrupos().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/clientes_criar', data: data, usuario: req.session.usuario});
	});
});
router.get('/criar-simples/:idCliente/:idProcesso', function(req, res, next) {	
	var idCliente = req.params.idCliente;
	var idProcesso = req.params.idProcesso;	
	data.idClienteNaoEnvolvido = idCliente;
	data.idProcesso = idProcesso;
	model.SelecioneGrupos().then(data_grupos => {
		data.grupos = data_grupos;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/cliente_criar_simples', data: data, usuario: req.session.usuario});
	});
});




router.get('/criar/grupo', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/grupos_criar', data: data, usuario: req.session.usuario});
});

router.get('/editar/:id', function(req, res, next) {
	var id = req.params.id;
	model.SelecioneGrupos().then(data_grupos => {
		model.SelecionarCliente(id).then(data => {
			data.grupos = data_grupos;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/clientes_editar', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/selecionar/:id',function(req, res, next){
	var id = req.params.id;
	model.SelecioneGrupos().then(data_grupos => {
		data.grupos = data_grupos;
		model.SelecionarCliente(id).then(data_cliente => {
			data.clientes = data_cliente;
			console.log('$$$$$$$$$$$$$$$$$$$$$$$$ Clientes $$$$$$$$$$$$$$$$$$$$$$$$$$$');
			console.log(data);
			console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/clientes_interna_index', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/editar_dentro_processo/:id', function(req, res, next) {
	var id = req.params.id;
	model.SelecioneGrupos().then(data_grupos => {
		data.gruposCliente = data_grupos;
		model.SelecionarCliente(id).then(data_cliente => {
			data.clientesCad = data_cliente;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/cliente_editar_no_processo', data: data, usuario: req.session.usuario});
		});
	});
});


router.get('/ver_cadastro/:id',function(req, res, next){
	var id = req.params.id;
	model.SelecionarCliente(id).then(data_cliente => {
		data.cliente = data_cliente;
		console.log('$$$$$$$$$$$$$$$$$$$$$$$$ Clientes $$$$$$$$$$$$$$$$$$$$$$$$$$$');
		console.log(data);
		console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/ver_cadastro', data: data, usuario: req.session.usuario});
	});

});

router.get('/listar_todos_processos/:id',function(req, res, next){
	var idCliente = req.params.id;
	model.SelecionarTodosProcessosDoCliente(idCliente).then(data_processo =>{
		data.processos_cliente = data_processo;		
		console.log('======================== TODOS PROCESSOS ======================');
		console.log(data);
		console.log('===============================================================');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/todos_processos', data: data, usuario: req.session.usuario});
	});
});


router.get('/pesquisar-cliente-por-cpf-cnpj/:pesquisa', function(req, res, next) {
	pesquisa = req.params.pesquisa;
	console.log('aaaaaaaaaaaaaa POST DA PESQUISA DO CLIENTE NO CLIENTE CRIAR aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
	console.log(pesquisa);
	console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
	model.PesquisarClientePorCpfCnpj(pesquisa).then(data=> {
		model.SelecioneGrupos().then(data_grupos => {
			data.grupos = data_grupos;
			console.log('bbbbbbbbbbbbbbbbbbbbbbbbbb resultado do post da pesquisa bbbbbbbbbbbbbbbbbbbbbbb');
			console.log(data);
			console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
			if (data != ''){
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/cliente_editar_no_cliente', data: data, usuario: req.session.usuario});
			}else{
				data.cpf_cnpj = pesquisa;
				console.log('nnnnnnnnnnnnnnnnnnnnnnn Nao existe cpf_cnpj nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
				console.log(data);
				console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/cliente_criar_no_cliente', data: data, usuario: req.session.usuario});
			}
		});
	});
});



router.get('/pesquisar-cliente-por-cpf-cnpj-autocomplete/:cpf_cnpj', function(req, res, next) {

	cpf_cnpj = req.params.cpf_cnpj;
	console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFF cpf_cnpj FFFFFFFFFFFFFFFFFFFFFFF');
	console.log(cpf_cnpj);
	console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');

	model.PesquisarNomeClientePorCpfCnpjAutocomplete(cpf_cnpj).then(data => {
		console.log('========================= procurar faculdade ===================');
		console.log(data);
		console.log('===============================================================');
		res.json(data);
	});
});




router.get('/selecionar-todos-modal', function(req, res, next) {
	model.SelecioneClientesDescricao().then(data_clientes =>{
		data.dados = data_clientes;
		model.SelecioneClientesCpfCnpjExtra().then(data_cpf_cnpj =>{
			data.nome_campo_extra = 'CPF/CNPJ';
			data.campo_extra = data_cpf_cnpj;
			console.log('************************** Dentro do Clientes Modal **************************');
			console.log(data);
			console.log('**************************************************************************');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'processos/modal_crud_geral_no_edit', data: data, usuario: req.session.usuario});
		});
	});
});


router.get('/buscar_cpf/:cpf', function(req, res, next) {
	model.SelecioneClientes().then(data_clientes => {
		console.log('------------- DATA DOS CLIENTES -------------------');
		console.log(data_clientes);
		console.log('---------------------------------------------------');
		res.json(data_clientes);
	});
	
});



router.get('/adicionar-simples',function(req, res, next) {
	data.descricao = "Nome";
	data.adicionar_link = '/clientes/adicionar-simples';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/clientes_adicionar_simples', data: data, usuario: req.session.usuario});
});


router.post('/pesquisar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.ProcurarClientes(POST).then(data_clientes => {
		data.clientes = data_clientes;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/tabela_interna_only', data: data, usuario: req.session.usuario});
	});
});

router.post('/adicionar-simples', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
		// model.CadastrarCliente(POST).then(data => {
			res.json(data);
	// });
});

router.post('/cadastrar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	
	console.log('LLLLLLLLLLLLLLLLLLLLLLLL Cliente Adicionado Simples LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
	console.log(POST);
	console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')

	var dadosCliente = {nome:POST.nome, tipo: POST.tipo,
		id_grupo: POST.id_grupo,cpf_cnpj: POST.cpf_cnpj, rg:POST.rg, 
		ctps:POST.ctps, serie:POST.serie, n_pis:POST.n_pis, 
		n_beneficio: POST.n_beneficio, profissao: POST.profissao, 
		nascimento: POST.nascimento ,inscricao_estadual:POST.inscricao_estadual, 
		email:POST.email, tel_pessoal:POST.tel_pessoal,tel_trabalho:POST.tel_trabalho,
		tel_contato:POST.tel_contato,tel_outro:POST.tel_outro, observacoes:POST.observacoes, 
		banco:POST.banco, agencia: POST.agencia, n_conta_corrente: POST.n_conta_corrente, 
		cep: POST.cep, rua: POST.rua, bairro:POST.bairro, numero: POST.numero, 
		cidade: POST.cidade, estado:POST.estado};

		console.log('DDDDDDDDD DADOS CLIENTES DDDDDDDD');
		console.log(dadosCliente);
		console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');




		var dadosAdverso = {nome:POST.nome_adverso, tipo:POST.tipo_adverso,
			cpf_cnpj: POST.cpf_cnpj_adverso, tel:POST.tel_adverso, email:POST.email_adverso, 
			contato:POST.contato_adverso, advogado:POST.advogado_adverso,rua: POST.rua_adverso, 
			bairro:POST.bairro_adverso, cep:POST.cep_adverso, cidade:POST.cidade_adverso, 
			estado:POST.estado_adverso, numero: POST.numero_adverso };

			console.log('jjjjjjjjjjjjjjjjjj DADOS ADVERSOS jjjjjjjjjjjjjjjjjj');
			console.log(dadosAdverso);
			console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');

			console.log('PPPPPPPPPPPPPPPPPPPP POST IDDDDDDDDDDDDDDDDDDDD');
			console.log(POST.id);
			console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');

			console.log(req.session.usuario.id);

			var dadosDocumentos = {id_usuario:req.session.usuario.id,arquivo:POST.numero_processo,
				tipo:1,onde:2};

				console.log('MMMMMMMMMMMMMMMMMMMMMMMMMM DOCUMENTOS MMMMMMMMMMMMMMMMMMM');
				console.log(dadosDocumentos);
				console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');


				/*quer dizer que foi selecionado um cliente*/
				if(POST.id != undefined){
					console.log('IDDDDDDDDDDDDDDDDDDDDDDD TENHO IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
					console.log(POST.id);
					console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');



					dadosCliente['id'] = POST.id;

					model.AtualizarCliente(dadosCliente).then(idCliente=>{

						/*é diferente do primeiro pq ele tá setado o id adverso para fazer com a pesquisa da lupa*/
						if(POST.id_adverso != ''){

							console.log('AAAAAAAAAAAAAAAAAAAA TENHO ID AAAAAAAAAAAAAAAAAAAAAAAAAAAA');
							console.log(POST.id_adverso);
							console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');


							dadosAdverso['id'] = POST.id_adverso;

							model.AtualizarAdverso(dadosAdverso).then(idAdverso=>{
								var dadosProcesso = {id_usuario: req.session.usuario.id, 
									id_cliente:POST.id, id_posicao_cliente: POST.id_posicao_cadastro_cliente, 
									id_adverso: POST.id_adverso, numero: POST.numero_processo};

									console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDD DADOS PROCESSO DDDDDDDDDDDDDDDDD');
									console.log(dadosProcesso);
									console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');

									model.CadastrarProcesso(dadosProcesso).then(id_processo_cad =>{
										model.CadastrarPasta(dadosDocumentos).then(id_documento =>{

											res.send({result:'redirect',url:'/sistema/processos/abrir/'+id_processo_cad});				
										});
									});

								});

							/*quer dizer que não foi selecionado um adverso*/
						}else{

							console.log('MMMMMMMMMMMMMM NÃO TENHO id adverso MMMMMMMMMMMMMMMMMMMMMMM');
							console.log(dadosAdverso);
							console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');


							model.CadastrarAdverso(dadosAdverso).then(id_adverso_cad =>{
								var dadosProcesso = {id_usuario: req.session.usuario.id, 
									id_cliente:POST.id, id_posicao_cliente: POST.id_posicao_cadastro_cliente,
									id_adverso: id_adverso_cad, numero: POST.numero_processo};

									console.log('000000000000 dados processo 000000000000000000000000000');
									console.log(dadosProcesso);
									console.log('0000000000000000000000000000000000000000000000000000000');

									model.CadastrarProcesso(dadosProcesso).then(id_processo_cad =>{
										model.CadastrarPasta(dadosDocumentos).then(id_documento =>{
											res.send({result:'redirect',url:'/sistema/processos/abrir/'+id_processo_cad});				
										});
									});
								});
						}



					});

					/*quer dizer que não foi selecionado um cliente*/
				}else{

					console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN NAO TENHO ID NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');
					console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');


					model.CadastrarCliente(dadosCliente).then(id_cliente_cad => {
						/*quer dizer que foi selecionado um adverso*/
						if(POST.id_adverso != ''){
							dadosAdverso['id'] = POST.id_adverso;


							model.AtualizarAdverso(dadosAdverso).then(idAdverso=>{
								var dadosProcesso = {id_usuario: req.session.usuario.id, 
									id_cliente:id_cliente_cad, id_posicao_cliente: POST.id_posicao_cadastro_cliente, 
									id_adverso: POST.id_adverso, numero: POST.numero_processo};

									console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDD DADOS PROCESSO DDDDDDDDDDDDDDDDD');
									console.log(dadosProcesso);
									console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');


									model.CadastrarProcesso(dadosProcesso).then(id_processo_cad =>{
										model.CadastrarPasta(dadosDocumentos).then(id_documento =>{
											res.send({result:'redirect',url:'/sistema/processos/abrir/'+id_processo_cad});				
										});
									});

								});

							/*quer dizer que não foi selecionado um adverso*/
						}else{

							model.CadastrarAdverso(dadosAdverso).then(id_adverso_cad =>{
								var dadosProcesso = {id_usuario: req.session.usuario.id, 
									id_cliente:id_cliente_cad, id_posicao_cliente: POST.id_posicao_cadastro_cliente,
									id_adverso: id_adverso_cad, numero: POST.numero_processo};

									console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDD DADOS PROCESSO DDDDDDDDDDDDDDDDD');
									console.log(dadosProcesso);
									console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');

									model.CadastrarProcesso(dadosProcesso).then(id_processo_cad =>{
										model.CadastrarPasta(dadosDocumentos).then(id_documento =>{
											res.send({result:'redirect',url:'/sistema/processos/abrir/'+id_processo_cad});				
										});
									});
								});
						}


					});
				}

			});





// model.CadastrarCliente(dadosCliente).then(id_cliente_cad => {

// 	//quer dizer que foi selecionado um adverso

// 	if(POST.id_adverso != ''){
// 		console.log('--------------------- SELECIONEI UM ADVERSO ------------');
// 		console.log(POST.id_adverso);
// 		console.log('--------------------------------------------------------');

// 		var dadosProcesso = {id_usuario: POST.id_usuario, id_cliente:id_cliente_cad, id_posicao_cliente: POST.id_posicao_cadastro_cliente, id_adverso: POST.id_adverso, numero: POST.numero_processo};
// 		console.log('DDDDDDDDDDDDDDDDD DADOS DO PROCESSO AO CADASTRAR COM ADVERSO SELECIONADO DDDDDDDDDDDDDDDD');
// 		console.log(dadosProcesso);
// 		console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
// 		model.CadastrarProcesso(dadosProcesso).then(id_processo_cad =>{
// 			res.send({result:'redirect',url:'/sistema/processos/abrir/'+id_processo_cad});				
// 		});

// 	}else{
// 		model.CadastrarAdverso(dadosAdverso).then(id_adverso_cad =>{
// 			console.log('========================= NÃO TINHA ADVERSO ==================');
// 			console.log(id_adverso_cad);
// 			console.log('==============================================================');
// 			var dadosProcesso = {id_posicao_cliente: POST.id_posicao_cadastro_cliente, id_usuario: POST.id_usuario, id_cliente:id_cliente_cad, id_adverso: id_adverso_cad, numero: POST.numero_processo};
// 			console.log('@@@@@@@@@@@@@@@@@@ DADOS DO PROCESSO NO CADASTRAR ADVERSO @@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
// 			console.log(dadosProcesso);
// 			console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

// 			model.CadastrarProcesso(dadosProcesso).then(id_processo_cad =>{
// 				res.send({result:'redirect',url:'/sistema/processos/abrir/'+id_processo_cad});				
// 			});

// 		});
// 	};
// });





router.post('/cadastrar/grupo', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.CadastrarGrupo(POST).then(data => {
		res.json(data);
	});
});

router.post('/atualizar_cliente_no_processo/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSS POST DO ATUALIZAR CLIENTES NO PROCESSO SSSSSSSSSSSSS');
	console.log(POST);
	console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');

	data_insert = {id:POST.cliente_ver_cad_id,nome:POST.cliente_ver_cad_nome, 
		tipo:POST.cliente_ver_cad_tipo, tipo_cliente: POST.cliente_ver_cad_tipo_cliente, 
		id_grupo: POST.cliente_ver_cad_id_grupo, cpf_cnpj: POST.cliente_ver_cad_cpf_cnpj, 
		email:POST.cliente_ver_cad_email, rg: POST.cliente_ver_cad_rg,
		ctps: POST.cliente_ver_cad_ctps, serie: POST.cliente_ver_cad_serie, 
		n_pis: POST.cliente_ver_cad_n_pis, n_beneficio: POST.cliente_ver_cad_n_beneficio,
		estado_civil:POST.cliente_ver_cad_estado_civil,profissao:POST.cliente_ver_cad_profissao,
		nascimento:POST.cliente_ver_cad_nascimento,inscricao_estadual:POST.cliente_ver_cad_inscricao_estadual,
		tel_pessoal:POST.cliente_ver_cad_tel_pessoal,tel_trabalho:POST.cliente_ver_cad_tel_trabalho,
		tel_contato:POST.cliente_ver_cad_tel_contato,tel_outro:POST.cliente_ver_cad_tel_outro,
		observacoes:POST.cliente_ver_cad_observacoes,banco:POST.cliente_ver_cad_banco,
		agencia:POST.cliente_ver_cad_agencia,n_conta_corrente:POST.cliente_ver_cad_n_conta_corrente,
		cep:POST.cliente_ver_cad_cep,bairro:POST.cliente_ver_cad_bairro,
		rua:POST.cliente_ver_cad_rua,numero:POST.cliente_ver_cad_numero,
		cidade:POST.cliente_ver_cad_cidade,estado:POST.cliente_ver_cad_estado};

		console.log('??????? DATA INSERT DO ATUALIZAR DENTRO DO PROCESSO ????????????');
		console.log(data_insert);
		console.log('?????????????????????????????????????????????????????????????????');

		model.AtualizarCliente(data_insert).then(data_update => {
			model.SelecioneGrupos().then(data_grupos => {
				data.gruposCliente = data_grupos;
				model.SelecionarCliente(POST.cliente_ver_cad_id).then(data_cliente => {
					data.clientesCad = data_cliente;
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'clientes/cliente_editar_no_processo', data: data, usuario: req.session.usuario});
				});
			});
		});
	});


router.post('/atualizar/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSS POST DO ATUALIZAR CLIENTES SSSSSSSSSSSSS');
	console.log(POST);
	console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');

	model.AtualizarCliente(POST).then(data => {
		res.json(data);
	});
});

router.post('/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarCliente(POST).then(data=> {
		res.json(data);
	});
});

module.exports = router;

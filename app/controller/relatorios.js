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






router.post('/cadastrar_parcela', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	console.log('---------------------- CADASTRAR PARCELA -------------------');
	console.log(POST);
	console.log('----------------------------------------------------------------');


	var vhe = POST.porc_honorario_escritorio;
	var vhp = POST.porc_honorario_perito;
	var vir = POST.porc_imposto_renda;

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


	var valor_pagar_reclamante = valorParcelaOriginal - vheParcela - vhpParcela - virParcela - imposto_renda - inss - outros_descontos;
	if(valor_pagar_reclamante<0){
		valor_pagar_reclamante = 0;
	}
	data_insert_dados_para_calculo = {
		id_processo:POST.id_processo, data_sentenca_acordo: POST.data_sentenca_acordo, 
		porc_honorario_escritorio:vhe,
		porc_honorario_perito:vhp,
		porc_imposto_renda:vir};

		data_insert_parcela = {id_processo:POST.id_processo,
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
		console.log(data_insert_parcela);
		console.log('============================================');

		console.log("OOOOOOOOOOOOOOOO DADOS PARA CALCULO OOOOOOOOOOOOOOOO");
		console.log(data_insert_dados_para_calculo);
		console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');

		model.CadastrarDadosParaCalculoFinanceiroProcesso(data_insert_dados_para_calculo).then(id_dados_calculo =>{
			model.CadastrarParcela(data_insert_parcela).then(data_cad_par => {			
				model.SelecionarTodasParcelas().then(data_todas_parcelas =>{
					data.todas_parcelas = data_todas_parcelas;
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'relatorios/tabela_interna_parcelas_only', data: data, usuario: req.session.usuario});
				});
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

'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class ProcessosModel {
	SelecioneProcessos() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*, \
				DATE_FORMAT(a.data_cadastro, '%d/%m/%Y %H:%i') as data_processo,\
				DATE_FORMAT(a.data_cadastro, '%Y%m%d %H:%i') as data_table_filtro,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as responsavel,\
				(SELECT c.nome FROM clientes as c WHERE c.id = a.id_cliente) as cliente,\
				(SELECT d.nome FROM adversos as d WHERE d.id = a.id_adverso) as adverso,\
				(SELECT e.cpf_cnpj FROM clientes as e WHERE e.id = a.id_cliente) as cpf_cnpj \
				FROM processos as a ORDER BY a.data_cadastro ASC", [0]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarCliente(id) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT *, DATE_FORMAT(nascimento, '%d/%m/%Y') as nascimento FROM clientes WHERE id = ? AND deletado = ?", [id, 0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecionarAdverso(id) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT * FROM adversos WHERE id = ? AND deletado = ?", [id, 0]).then(data => {
				resolve(data);
			});
		});
	}

	UltimoProcessoAtivo() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM processos WHERE deletado = ? ORDER BY id DESC LIMIT 1', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecionarTempo(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT DATE_FORMAT(NOW(),"%d/%m/%Y") as hoje \
				FROM processos as a WHERE a.deletado = ? LIMIT ?', [0,1]).then(data => {					
					resolve(data);
				});
			});
	}

	SelecioneAndamentosDoProcesso(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id_processo,a.tipo , a.descricao,DATE_FORMAT(a.data,"%d/%m/%y") as data,DATE_FORMAT(a.data_cadastro, "%d/%m/%Y %H:%i") as data_cadastro,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as usuario\
				FROM andamentos_processo as a WHERE a.deletado = ? AND a.id_processo = ? ORDER BY a.data_cadastro ASC', [0,id]).then(data => {					
					resolve(data);
				});
			});
	}


	SelecioneApensosDoProcesso(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,\
				(SELECT b.descricao FROM tipo_causa_apenso as b WHERE b.id = a.id_tipo_causa_apenso) as tipo_da_causa\
				FROM apenso as a WHERE a.deletado = ? AND a.id_processo = ? ORDER BY a.data_cadastro ASC', [0,id]).then(data => {					
					resolve(data);
				});
			});
	}

	SelecioneRecursosDoProcesso(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,\
				(SELECT b.descricao FROM tipo_causa_recurso as b WHERE b.id = a.id_tipo_recurso) as tipo_da_causa\
				FROM recurso as a WHERE a.deletado = ? AND a.id_processo = ? ORDER BY a.data_cadastro ASC', [0,id]).then(data => {					
					resolve(data);
				});
			});
	}



	SelecionarOrigemRecurso(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT CONCAT(a.id, " - Processo") as id, CONCAT(a.numero," - Processo") as numero FROM processos as a WHERE a.deletado = ? AND a.id = ? \
				UNION \
				SELECT CONCAT(b.id, " - Apenso") as id, CONCAT(b.numero, " - Apenso") as numero FROM apenso as b WHERE b.deletado = ? AND b.id_processo = ? ORDER BY id', [0,id,0,id]).then(data => {					
					resolve(data);
				});
			});
	}



	SelecioneTodosCompromissosDoApensoDoProcesso(id){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.id_processo, a.local,a.tipo_compromisso, a.tipo,a.nome,a.data_inicial,a.data_final,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y %H:%i') as data_inicial,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y %H:%i') as data_final,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_advogado_compromisso AND b.cargo = ?)as advogado, \
				(SELECT c.numero FROM apenso as c WHERE c.id = a.id_apenso)as numero \
				FROM compromissos as a WHERE a.deletado = ? AND a.id_processo = ? AND a.id_apenso != ? ORDER BY a.data_inicial ASC", [1,0,id,0]).then(data => {
					resolve(data);
				});
			});
	}

	SelecioneTodosCompromissosDoRecursoDoProcesso(id){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.id_processo, a.local, a.tipo_compromisso, a.tipo,a.nome,a.data_inicial,a.data_final,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y %H:%i') as data_inicial,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y %H:%i') as data_final,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_advogado_compromisso AND b.cargo = ?)as advogado, \
				(SELECT c.numero FROM recurso as c WHERE c.id = a.id_recurso)as numero \
				FROM compromissos as a WHERE a.deletado = ? AND a.id_processo = ? AND a.id_recurso != ? ORDER BY a.data_inicial ASC", [1,0,id,0]).then(data => {
					resolve(data);
				});
			});
	}

	SelecioneTodosAndamentosDoApensoDoProcesso(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id_processo,a.tipo , a.descricao,DATE_FORMAT(a.data,"%d/%m/%y") as data,DATE_FORMAT(a.data_cadastro, "%d/%m/%Y %H:%i") as data_cadastro,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as usuario,\
				(SELECT c.numero FROM apenso as c WHERE c.id = a.id_apenso)as numero \
				FROM andamentos_processo as a WHERE a.deletado = ? AND a.id_processo = ? AND a.id_apenso != ? ORDER BY a.data ASC', [0,id,0]).then(data => {					
					resolve(data);
				});
			});
	}

	SelecioneTodosAndamentosDoRecursoDoProcesso(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id_processo,a.tipo , a.descricao,DATE_FORMAT(a.data,"%d/%m/%y") as data,DATE_FORMAT(a.data_cadastro, "%d/%m/%Y %H:%i") as data_cadastro,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as usuario,\
				(SELECT c.numero FROM recurso as c WHERE c.id = a.id_recurso)as numero \
				FROM andamentos_processo as a WHERE a.deletado = ? AND a.id_processo = ? AND a.id_apenso != ? ORDER BY a.data ASC', [0,id,0]).then(data => {					
					console.log('RRRRRRRRRRRRRRR SELECIONE TODOS ANDAMENTOS DO RECURSO RRRRRRRRRRRRRRRRRR');
					console.log(data);
					console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
					resolve(data);
				});
			});
	}

	SelecioneCalculosFinanceirosDoProcesso(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,DATE_FORMAT(a.data_sentenca_acordo,"%d/%m/%y") as data_sentenca_acordo,DATE_FORMAT(a.data_cadastro, "%d/%m/%Y %H:%i") as data_cadastro\
				FROM calculo_processo_financeiro as a WHERE a.deletado = ? AND a.id_processo = ? LIMIT 1', [0,id]).then(data => {					
					console.log('RRRRRRRRRRRRRRR SELECIONE TODOS ANDAMENTOS DO RECURSO RRRRRRRRRRRRRRRRRR');
					console.log(data);
					console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
					resolve(data);
				});
			});
	}




	SelecioneCompromissosDoProcesso(id){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y %H:%i') as data_inicial,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y %H:%i') as data_final,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_advogado_setor AND b.cargo = ?)as advogado, \
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_advogado_compromisso AND b.cargo = ?)as advogado_compromisso \
				FROM compromissos as a WHERE a.deletado = ? AND a.id_processo = ? ORDER BY a.data_inicial ASC", [1,1,0,id]).then(data => {
					console.log('SSSSSSSSSSSSSS SelecioneCompromissosDoProcesso SSSSSS');
					console.log(data);
					console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
					resolve(data);
				});
			});
	}


	SelecionarCompromissoDoProcesso(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*,\
				(SELECT nome FROM usuarios as c WHERE c.id = a.id_advogado_setor) as nome_advogado_setor,\
				(SELECT nome FROM usuarios as d WHERE d.id = a.id_advogado_compromisso) as nome_advogado_compromisso,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y') as data_inicial,\
				DATE_FORMAT(a.data_inicial,'%H:%i') as hora_inicial, \
				DATE_FORMAT(a.data_final,'%H:%i') as hora_final,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y') as data_final\
				FROM compromissos as a WHERE a.id = ? AND a.deletado = ?", [id, 0]).then(data => {
					console.log('############# Dados do SelecionarEvento(id) ###################');
					console.log(data);
					console.log('###############################################################');
					resolve(data);
				});
			});
	}



	SelecionarCompromissosDoApenso(id){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.id_processo,  a.local, a.tipo,a.nome,a.data_inicial,a.data_final,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y %H:%i') as data_inicial,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y %H:%i') as data_final,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_advogado_compromisso AND b.cargo = ?)as advogado \
				FROM compromissos as a WHERE a.deletado = ? AND a.id_apenso = ? ORDER BY a.data_inicial ASC", [1,0,id]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarCompromissosDoRecurso(id){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.id_processo,  a.local, a.tipo,a.nome,a.data_inicial,a.data_final,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y %H:%i') as data_inicial,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y %H:%i') as data_final,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_advogado_compromisso AND b.cargo = ?)as advogado \
				FROM compromissos as a WHERE a.deletado = ? AND a.id_recurso = ? ORDER BY a.data_inicial ASC", [1,0,id]).then(data => {
					resolve(data);
				});
			});
	}


	SelecionarAndamentosDoApenso(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id_processo,a.tipo , a.descricao,DATE_FORMAT(a.data,"%d/%m/%y") as data,DATE_FORMAT(a.data_cadastro, "%d/%m/%Y %H:%i") as data_cadastro,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as usuario\
				FROM andamentos_processo as a WHERE a.deletado = ? AND a.id_apenso = ? ORDER BY a.data ASC', [0,id]).then(data => {					
					console.log('RRRRRRRRRRRRRRR SELECIONAR ANDAMENTOS DO APENSO RRRRRRRRRRRRRRRRRRRR');
					console.log(data);
					console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');

					resolve(data);
				});
			});
	}


	SelecionarAndamentosDoRecurso(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id_processo,a.tipo , a.descricao,DATE_FORMAT(a.data,"%d/%m/%y") as data,DATE_FORMAT(a.data_cadastro, "%d/%m/%Y %H:%i") as data_cadastro,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as usuario\
				FROM andamentos_processo as a WHERE a.deletado = ? AND a.id_recurso = ? ORDER BY a.data ASC', [0,id]).then(data => {					
					resolve(data);
				});
			});
	}

	SelecionarClientePorProcesso(idProcesso){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT id_cliente \
				FROM processos as a WHERE id = ? LIMIT 1", [idProcesso]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarAdversoPorProcesso(idProcesso){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT id_adverso \
				FROM processos as a WHERE id = ? LIMIT 1", [idProcesso]).then(data => {
					resolve(data);
				});
			});
	}




	SelecionarTiposOutrosEnvolvidos(){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT * FROM outros_envolvidos_tipo_processo WHERE deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}




	SelecionarEnvolvidosAdverso(idProcesso) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*, \
				(SELECT nome FROM adversos as b WHERE a.id_adverso = b.id) as nome,\
				(SELECT descricao FROM outros_envolvidos_tipo_processo as c WHERE a.id_outros_tipo = c.id)as posicao\
				FROM outros_envolvidos_adverso_processo as a WHERE deletado = ? AND id_processo = ?", [0,idProcesso]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarEnvolvidosCliente(idProcesso) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*, \
				(SELECT nome FROM clientes as b WHERE a.id_cliente = b.id) as nome,\
				(SELECT descricao FROM outros_envolvidos_tipo_processo as c WHERE a.id_outros_tipo = c.id)as posicao\
				FROM outros_envolvidos_cliente_processo as a WHERE deletado = ? AND id_processo = ?", [0,idProcesso]).then(data => {
					resolve(data);
				});
			});
	}


	SelecionarParcelasDoProcesso(idProcesso) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*,DATE_FORMAT(a.data_vencimento,'%d/%m/%y') as data_vencimento,\
				DATE_FORMAT(a.data_vencimento, '%Y%m%d') as data_vencimento_filtro,\
				DATE_FORMAT(a.data_recebimento_reclamada,'%d/%m/%y') as data_recebimento_reclamada,\
				DATE_FORMAT(a.data_recebimento_reclamada, '%Y%m%d') as data_recebimento_reclamada_filtro,\
				DATE_FORMAT(a.data_pago_reclamante,'%d/%m/%y') as data_pago_reclamante,\
				DATE_FORMAT(a.data_pago_reclamante, '%Y%m%d') as data_pago_reclamante_filtro,\
				(SELECT b.descricao FROM descricao_generico as b WHERE b.id=a.id_banco) as banco_nome\
				FROM parcela_processo as a WHERE a.deletado = ? AND a.id_processo = ?", [0,idProcesso]).then(data => {
					resolve(data);
				});
			});
	}




	CadastrarCliente(POST) {
		return new Promise(function(resolve, reject) {
			POST = helper.PrepareDates(POST, ['nascimento']);
			helper.Insert('clientes', POST).then(data => {
				resolve(data);
			});
		});
	}







	CadastrarAdverso(POST) {
		return new Promise(function(resolve, reject) {
			POST = helper.PrepareDates(POST, ['nascimento']);
			helper.Insert('adversos', POST).then(data => {
				resolve(data);
			});
		});
	}


	CadastrarCompromisso(POST) {
		POST = helper.PrepareDates(POST, ['data_inicial']);
		POST = helper.PrepareDates(POST, ['data_final']);
		POST.data_inicial = POST.data_inicial +' '+ POST.hora_inicial + ':00';
		POST.data_final = POST.data_final +' '+ POST.hora_final + ':00';
		delete POST.hora_inicial;
		delete POST.hora_final;

		// POST.id_processo = 1;
		// POST.id_advogado = 1;

		console.log('************** POST FINAL ********************');
		console.log(POST);
		console.log('**********************************************');

		return new Promise(function(resolve, reject) {
			helper.Insert('compromissos', POST).then(data => {
				// helper.Insert('compromissos',"SET @@time_zone = '-3:00';").then(dataTime =>{
					console.log(data);
					resolve(data);
				// });
			});
		});
	}

	CadastrarDadosParaCalculoFinanceiroProcesso(POST) {
		return new Promise(function(resolve, reject) {
			POST = helper.PrepareDates(POST, ['data_sentenca_acordo']);
			console.log('ÒÒÒÒ insert do cadastrar dados para calculo financeiro ÒÒÒ');
			console.log(POST);
			console.log('ÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒ');
			helper.Insert('calculo_processo_financeiro', POST).then(data => {
				resolve(data);
			});
		});
	}



	CadastrarCliente(POST) {
		return new Promise(function(resolve, reject) {
			POST = helper.PrepareDates(POST, ['nascimento']);
			helper.Insert('clientes', POST).then(data => {
				resolve(data);
			});
		});
	}

	AtualizarCompromisso(POST) {
		POST = helper.PrepareDates(POST, ['data_inicial']);
		POST = helper.PrepareDates(POST, ['data_final']);
		POST.data_inicial = POST.data_inicial +' '+ POST.hora_inicial + ':00';
		POST.data_final = POST.data_final +' '+ POST.hora_final + ':00';
		delete POST.hora_inicial;
		delete POST.hora_final;

		// POST.id_processo = 1;
		// POST.id_advogado = 1;

		console.log('************** POST FINAL ********************');
		console.log(POST);
		console.log('**********************************************');

		return new Promise(function(resolve, reject) {
			helper.Update('compromissos', POST).then(data => {
				// helper.Insert('compromissos',"SET @@time_zone = '-3:00';").then(dataTime =>{
					console.log(data);
					resolve(data);
				// });
			});
		});
	}


	AtualizarApenso(POST) {
		if (POST.id_processo == "")
			delete POST.id_processo;
		if (POST.id_advogado == "")
			delete POST.id_advogado;
		if (POST.id_tipo_causa_apenso == "")
			delete POST.id_tipo_causa_apenso;
		if (POST.id_posicao_apenso == "")
			delete POST.id_posicao_apenso;
		if (POST.id_comarca == "")
			delete POST.id_comarca;
		if (POST.id_vara == "")
			delete POST.id_vara;
		if (POST.id_foro == "")
			delete POST.id_foro;
		if (POST.id_situacao_apenso == "")
			delete POST.id_situacao_apenso;
		if(POST.distribuicao == "")
			delete POST.distribuicao
		if(POST.citacao == "")
			delete POST.citacao
		if(POST.sentenca == "")
			delete POST.sentenca


		POST = helper.PrepareDates(POST, ['distribuicao']);
		POST = helper.PrepareDates(POST, ['citacao']);
		POST = helper.PrepareDates(POST, ['sentenca']);
		console.log('************** POST FINAL ********************');
		console.log(POST);
		console.log('**********************************************');

		return new Promise(function(resolve, reject) {
			helper.Update('apenso', POST).then(data => {
				resolve(data);
			});
		});
	}

	AtualizarDadosParaCalculo(POST) {
		POST = helper.PrepareDates(POST, ['data_sentenca_acordo']);


		console.log('************** POST FINAL ********************');
		console.log(POST);
		console.log('**********************************************');

		return new Promise(function(resolve, reject) {
			helper.Update('calculo_processo_financeiro', POST).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}


	AtualizarRecurso(POST) {
		if (POST.id_processo == ""){
			delete POST.id_processo;
			console.log('id_processo');
		}
		if (POST.id_advogado == ""){
			delete POST.id_advogado;
			console.log('advogado');
		}
		if (POST.id_apenso == "" || POST.id_apenso == undefined || POST.id_apenso == 'undefined'){
			delete POST.id_apenso;
			console.log('APENSO');
		}
		if (POST.id_relator == ""){
			delete POST.id_relator;
			console.log('relator');
		}
		if (POST.id_tipo_recurso == ""){
			delete POST.id_tipo_recurso;
			console.log('id_tipo_recurso');
		}
		if (POST.id_posicao_cliente == ""){
			delete POST.id_posicao_cliente;
			console.log('id_posicao_cliente');
		}
		if (POST.id_tribunal == ""){
			delete POST.id_tribunal;
			console.log('id_tribunal');
		}
		if (POST.id_turma_camara == ""){
			delete POST.id_turma_camara;
			console.log('id_turma_camara');
		}
		if(POST.interposicao == ""){
			delete POST.interposicao;
			console.log('INTERPOSICAO')
		}else{
			;
			POST = helper.PrepareDates(POST, ['interposicao']);
		}
		if(POST.ajuizado == ""){
			delete POST.ajuizado;
			console.log('AJUIZADO');
		}else{
			
			POST = helper.PrepareDates(POST, ['ajuizado']);
		}

		console.log('************** POST FINAL ATUALIZA RECURSO ********************');
		console.log(POST);
		console.log('***************************************************************');

		return new Promise(function(resolve, reject) {
			helper.Update('recurso', POST).then(data => {
				resolve(data);
			});
		});
	}


	CadastrarNotificacao(POST){
		return new Promise(function(resolve, reject) {
			helper.Insert('notificacoes', POST).then(data => {				
				resolve(data);
			});
		});
	}




	CadastrarApensoSimples(POST){
		return new Promise(function(resolve, reject) {
			helper.Insert('apenso', POST).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarRecursoSimples(POST){
		return new Promise(function(resolve, reject) {
			helper.Insert('recurso', POST).then(data => {
				resolve(data);
			});
		});
	}


	SelecioneMaisDetalhesDoProcesso(id){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*,\
				DATE_FORMAT(a.distribuicao, '%d/%m/%Y') as distribuicao,\
				(SELECT b.nome FROM clientes as b WHERE b.id = a.id_cliente) as cliente,\
				(SELECT c.nome FROM adversos as c WHERE c.id = a.id_adverso) as adverso,\
				(SELECT d.descricao FROM descricao_generico as d WHERE d.id=a.id_tipo_causa AND tipo = ?) as tipo_causa,\
				(SELECT e.nome FROM usuarios as e WHERE e.id=a.id_advogado AND e.cargo = ?) as advogado,\
				(SELECT f.descricao FROM descricao_generico as f WHERE f.id=a.id_assunto AND tipo = ?) as assunto,\
				(SELECT g.descricao FROM descricao_generico as g WHERE g.id=a.id_comarca AND tipo = ?) as comarca,\
				(SELECT h.descricao FROM descricao_generico as h WHERE h.id=a.id_tipo_acao_rito AND tipo = ?) as tipo_acao_rito,\
				(SELECT i.descricao FROM descricao_generico as i WHERE i.id=a.id_vara AND tipo = ?) as vara,\
				(SELECT j.descricao FROM descricao_generico as j WHERE j.id=a.id_categoria AND tipo = ?) as categoria,\
				(SELECT k.descricao FROM descricao_generico as k WHERE k.id=a.id_fase AND tipo = ?) as fase\
				FROM processos as a WHERE a.id = ?", [13,1,0,19,12,18,1,3,id]).then(data => {
					resolve(data);
				});
			});
	}

	SelecioneCaptacaoDoProcesso(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, c.observacoes, c.id as id_captacao, \
				DATE_FORMAT(c.data,"%d/%m/%y") as data_captacao,\
				(SELECT d.descricao FROM captador_processo as d WHERE d.id = c.id_captador)as nome_captador,\
				(SELECT e.descricao FROM origem_captacao_processo as e WHERE e.id = c.id_captador)as origem  \
				FROM processos as a \
				LEFT JOIN captacao_processo as c ON a.id = c.id_processo \
				WHERE a.id = ?', [id]).then(data => {
					resolve(data);
				});
			});
	}


	SelecioneTodosTipoCausas(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM tipo_causa WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}



	SelecioneTodosDescricaoGenerica(tipo){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM descricao_generico WHERE deletado = ? AND tipo = ? ORDER BY descricao DESC', [0,tipo]).then(data => {
				resolve(data);
			});
		});
	}

	SelecionarTipoDoGenericoPorId(id) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT tipo	FROM descricao_generico as a WHERE deletado = ? AND id = ?", [0,id]).then(data => {
				resolve(data);
			});
		});
	}

	SelecionarDadosParaCalculoPorId(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*,\
				DATE_FORMAT(a.data_sentenca_acordo, '%d/%m/%Y') as data_sentenca_acordo\
				FROM calculo_processo_financeiro as a WHERE deletado = ? AND id = ?", [0,id]).then(data => {
					resolve(data);
				});
			});
	}



	VerificarSeOutroAdvogadoFoiAtribuidoAoProcesso(id_advogado,id_processo){
		console.log('id processo ikkkkkkkkkkkk');
		console.log(id_processo);
		console.log('id advogado iiiiiiiiiiiii');
		console.log(id_advogado);


		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id_advogado FROM processos WHERE id_advogado = ? AND id = ?', [id_advogado,id_processo]).then(data => {
				resolve(data);
			});
		});
	}






	SelecioneTodosTipoCausasApenso(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM tipo_causa_apenso WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosPosicaoApenso(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM posicao_apenso WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosRelatorRecurso(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM relator WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosTipoRecurso(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM tipo_causa_recurso WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosPosicaoClienteRecurso(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM posicao_recurso WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosTribunalRecurso(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM tribunal WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosTurmaCamaraRecurso(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM turma_camara WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosSituacaoApenso(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM situacao_apenso WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosForo(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM foro WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosAssuntos(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM assunto_processo WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosCaptadores(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM captador_processo WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosOrigemCaptacao(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM origem_captacao_processo WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}


	SelecioneTodosClientes(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, nome as descricao FROM clientes WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				console.log('HHHHHHHHHHHHHHHHHHHHHHH MODEL SELECIONETODOSCLIENTES HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
				console.log(data);
				console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
				resolve(data);
			});
		});
	}

	SelecioneCpfCnpjExtraTodosClientes(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT cpf_cnpj as extra FROM clientes WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				console.log('HHHHHHHHHHHHHHHHHHHHHHH MODEL SELECIONETODOSCLIENTES HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
				console.log(data);
				console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
				resolve(data);
			});
		});
	}



	SelecioneTodosAdversos(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, nome as descricao FROM adversos WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				console.log('HHHHHHHHHHHHHHHHHHHHHHH MODEL SELECIONETODOSCLIENTES HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
				console.log(data);
				console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
				resolve(data);
			});
		});
	}


	SelecioneCpfCnpjExtraTodosAdversos(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT cpf_cnpj as extra FROM adversos WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				console.log('HHHHHHHHHHHHHHHHHHHHHHH MODEL SELECIONETODOSCLIENTES HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
				console.log(data);
				console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
				resolve(data);
			});
		});
	}


	SelecioneTodosClientesPorCategoria() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT *,nome as descricao FROM grupos WHERE deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosClientesMenosOEnvolvido(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, nome as descricao FROM clientes WHERE deletado = ? AND id != ? ORDER BY descricao DESC', [0,id]).then(data => {
				console.log('HHHHHHHHHHHHHHHHHHHHHHH MODEL SELECIONETODOSCLIENTES HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
				console.log(data);
				console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
				resolve(data);
			});
		});
	}

	SelecioneTodosAdversosMenosOEnvolvido(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, nome as descricao FROM adversos WHERE deletado = ? AND id != ? ORDER BY descricao DESC', [0,id]).then(data => {
				console.log('HHHHHHHHHHHHHHHHHHHHHHH MODEL SELECIONETODOSCLIENTES HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
				console.log(data);
				console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
				resolve(data);
			});
		});
	}

	SelecioneTodosComarcas(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM comarca WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}


	SelecioneTodosTipoAcaoRitos(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM tipo_acao_rito_processo WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosVaras(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM vara_processo WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosCategorias(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM categoria_processo WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosFases(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM fase_processo WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosAdvogados(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, nome as descricao FROM usuarios WHERE deletado = ? AND cargo = ? ORDER BY nome DESC', [0,1]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneOabExtraTodosAdvogados(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT oab as extra FROM usuarios WHERE deletado = ? AND cargo = ? ORDER BY nome DESC', [0,1]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneTodosAdvogadosExtra(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, nome as descricao FROM usuarios WHERE deletado = ? AND cargo = ? ORDER BY nome DESC', [0,1]).then(data => {
				resolve(data);
			});
		});

	}


	PesquisarTodosAdvogadosAutocomplete(pesquisa){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id ,	a.nome as name	FROM usuarios as a WHERE a.deletado = ? AND cargo = ? AND \
				a.nome LIKE CONCAT (?, "%") LIMIT 5',[0,1,pesquisa]).then(data => {
					resolve(data);
				});
			});
	}







	SelecioneTodosProcessos(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, numero as descricao FROM processos WHERE deletado = ?', [0]).then(data => {
				console.log('000000000000000000000000000 TODOS PROCESSOS COMPROMISSO 000000000000000000000000000');
				console.log(data);
				console.log('00000000000000000000000000000000000000000000000000000000000000000000000000000000000');
				resolve(data);
			});
		});
	}

	SelecioneNomeClienteExtraTodosProcessos(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id_cliente,\
				(SELECT nome FROM clientes as b WHERE a.id_cliente = b.id) as extra \
				FROM processos as a WHERE a.deletado = ?', [0]).then(data => {
					console.log('000000000000000000000000000 TODOS PROCESSOS COMPROMISSO 000000000000000000000000000');
					console.log(data);
					console.log('00000000000000000000000000000000000000000000000000000000000000000000000000000000000');
					resolve(data);
				});
			});
	}

	// ProcurarProcesso(POST) {
	// 	return new Promise(function(resolve, reject) {
	// 		var where = '';
	// 		var array = [];

	// 		for (var key in POST) {
	// 			if (typeof POST[key] != 'undefined' && POST[key] != '') {
	// 				where += 'AND a.' + key + ' LIKE ? ';
	// 				array.push('%'+POST[key]+'%');
	// 			}
	// 		}

	// 		// Adicione a qury com scape(?) e os respectivos valores em um array simples
	// 		helper.Query("SELECT a.*, \
	// 			(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as responsavel,\
	// 			(SELECT c.nome FROM clientes as c WHERE c.id = a.id_cliente) as cliente,\
	// 			(SELECT d.nome FROM adversos as d WHERE d.id = a.id_adverso) as adverso\
	// 			FROM processos as a WHERE a.deletado = ? "+where,[0,array]).then(dataProcessoPorNumero => {

	// 				if(dataProcessoPorNumero == 0){
	// 					//PROCURAR POR Cliente		
	// 					// helper.Query("SELECT a.*,\
	// 					// 	(SELECT c.nome FROM clientes as c WHERE c.id = a.id_cliente AND c.cpf_cnpj LIKE %?% || c.nome LIKE %?%) as cliente\
	// 					// 	FROM processos as a WHERE a.deletado = ?",[POST.id,POST.id,0]).then(dataPorCliente => {
	// 					// 		console.log('------------- CPF DO CLIENTE --------');
	// 					// 		console.log(dataPorCliente);
	// 					// 		console.log('-------------------------------------');
	// 					// 		resolve(dataPorCliente);
	// 					// 	});

	// 				}else{
	// 					console.log(dataProcessoPorNumero == 0);
	// 					console.log(dataProcessoPorNumero);
	// 					resolve(dataProcessoPorNumero);
	// 				}
	// 			});
	// 		});
	// }



	ProcurarProcesso(POST) {
		return new Promise(function(resolve, reject) {
			var where = '';
			var array = [5];
			// console.log('000000000000000 POST 00000000000000000000');
			// console.log(POST);
			// console.log('00000000000000000000000000000000000000000');
			
			for (var key in POST) {
				if (typeof POST[key] != 'undefined' && POST[key] != '') {
					console.log('------------------- CHAVE ---------------');
					console.log(key);
					console.log('-----------------------------------------');
					console.log('PPPPPPPPPPPPPPPPPP POST[key] PPPPPPPPPPPPPPPPPPPPPPPP');
					console.log(POST[key]);
					console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');

					if(key == 'cnpj'){
						console.log('no if');
						where += 'AND c.cpf_cnpj LIKE ?';
						array.push('%'+POST[key]+'%');
						/*uso a função substring para ver se é um id (o padrão é id_usuario, id_qualquercoisa) 
						se for um id o mesmo deve ser igual a chave*/
					}else if(key.substring(0,3) == 'id_'){
						where += 'AND a.' + key + ' = ? ';
						array.push(POST[key]);
					}else{
						where += 'AND a.' + key + ' LIKE ? ';
						array.push('%'+POST[key]+'%');
						console.log('no else');
					}

				}
			}

			console.log('----------------- ARRAY --------------------');
			console.log(array);
			console.log('--------------------------------------------');
			console.log('============== WHERE =======================');
			console.log(where);
			console.log('============================================');

			/*boto 5 no deletado pq tem and nos array aí não dá problema pois tbm tenho que achar os
			deletados(gambiarra)*/
			helper.Query("SELECT a.*, \
				DATE_FORMAT(a.data_cadastro, '%d/%m/%Y %H:%i') as data_processo,\
				DATE_FORMAT(a.data_cadastro, '%Y%m%d %H:%i') as data_table_filtro,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as responsavel,\
				(SELECT c.nome FROM clientes as c WHERE c.id = a.id_cliente) as cliente,\
				(SELECT d.nome FROM adversos as d WHERE d.id = a.id_adverso) as adverso,\
				(SELECT e.cpf_cnpj FROM clientes as e WHERE e.id = a.id_cliente) as cpf_cnpj \
				FROM processos as a \
				LEFT JOIN clientes as c ON a.id_cliente = c.id \
				WHERE a.deletado != ? "+ where,array).then(dataProcessoPorNumero => {
					// console.log(dataProcessoPorNumero);
					resolve(dataProcessoPorNumero);
					
				});
			});
	}


	ProcurarProcessoCruzamento(POST) {
		return new Promise(function(resolve, reject) {
			var where = '';
			var array = [5];
			// console.log('000000000000000 POST 00000000000000000000');
			// console.log(POST);
			// console.log('00000000000000000000000000000000000000000');
			
			for (var key in POST) {
				if (typeof POST[key] != 'undefined' && POST[key] != '') {
					console.log('------------------- CHAVE ---------------');
					console.log(key);
					console.log('-----------------------------------------');
					console.log('PPPPPPPPPPPPPPPPPP POST[key] PPPPPPPPPPPPPPPPPPPPPPPP');
					console.log(POST[key]);
					console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');

					if(key == 'cnpj'){
						where += ' AND c.cpf_cnpj LIKE "%"?"%" ';
						console.log('no if');
					}else if(key == 'numero'){
						where += ' AND a.numero LIKE "%"?"%" ';
						console.log('no segundo if');
						/*colquei tudo sub para indicar os joins left e os wheres */
					}else if(key.substring(0,3) == 'sub'){
						var split = key.split('_');
						console.log('split: '+split);

						where += 'AND '+split[1]+'.'+split[2]+' LIKE "%"?"%" ';
					}else{
						where += 'AND a.' + key + ' = ? ';
						console.log('cai no else ÊêêÊ');
					}
					array.push(POST[key]);
				}
			}

			console.log('----------------- ARRAY --------------------');
			console.log(array);
			console.log('--------------------------------------------');
			console.log('============== WHERE =======================');
			console.log(where);
			console.log('============================================');


			/*boto 5 no deletado pq tem and nos array aí não dá problema pois tbm tenho que achar os
			deletados(gambiarra)*/

			helper.Query("SELECT a.*, \
				DATE_FORMAT(a.data_cadastro, '%d/%m/%Y %H:%i') as data_processo,\
				DATE_FORMAT(a.data_cadastro, '%Y%m%d %H:%i') as data_table_filtro,\
				u.nome as responsavel,\
				c.nome as cliente,\
				adve.nome as adverso,\
				c.cpf_cnpj \
				FROM processos as a \
				LEFT JOIN clientes as c ON a.id_cliente = c.id\
				LEFT JOIN adversos as adve ON a.id_adverso = adve.id\
				LEFT JOIN descricao_generico as tc ON a.id_tipo_causa = tc.id\
				LEFT JOIN descricao_generico as assu ON a.id_assunto = assu.id\
				LEFT JOIN descricao_generico as com ON a.id_comarca = com.id\
				LEFT JOIN descricao_generico as tar ON a.id_tipo_acao_rito = tar.id\
				LEFT JOIN descricao_generico as var ON a.id_vara = var.id\
				LEFT JOIN descricao_generico as cat ON a.id_categoria = cat.id\
				LEFT JOIN descricao_generico as fas ON a.id_fase = fas.id\
				LEFT JOIN usuarios as u ON a.id_advogado = u.id\
				WHERE a.deletado != ? "+ where,array).then(dataProcessoPorNumero => {
					console.log('♦♦♦♦♦♦♦♦♦♦♦♦ dataProcessoPorNumero ♦♦♦♦♦♦');
					console.log(dataProcessoPorNumero);
					console.log('♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦');
					resolve(dataProcessoPorNumero);
					
				});
			});
	}




	SelecioneProcessosMortos() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*, (SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as responsavel,\
				(SELECT c.nome FROM clientes as c WHERE c.id = a.id_cliente) as cliente,\
				(SELECT d.nome FROM adversos as d WHERE d.id = a.id_adverso) as adverso\
				FROM processos as a WHERE a.deletado = ?", [1]).then(data => {
					resolve(data);
				});
			});
	}
	SelecioneUsuarios() {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT * FROM usuarios WHERE deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}
	SelecioneClientes() {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT * FROM clientes WHERE deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}
	SelecioneAdversos() {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT * FROM adversos WHERE deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}
	SelecionarProcesso(id) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*,\
				DATE_FORMAT(a.distribuicao, '%d/%m/%Y') as distribuicao,\
				DATE_FORMAT(a.citacao, '%d/%m/%Y') as citacao,\
				DATE_FORMAT(a.data_cadastro, '%d/%m/%Y') as data_cadastro \
				FROM processos as a WHERE a.id = ?", [id]).then(data => {
					resolve(data);
				});
			});
	}

	PesquisarNumeroProcessoAutocomplete(numero) {
		return new Promise(function(resolve, reject) {

			console.log('000000000000000 numero 00000000000000000000');
			console.log(numero);
			console.log('00000000000000000000000000000000000000000');			


			helper.Query('SELECT a.id ,\
				CONCAT (a.numero," - ", SUBSTRING_INDEX(b.nome, " ",2), "(",b.cpf_cnpj,")") as name\
				FROM processos as a \
				LEFT JOIN clientes as b on a.id_cliente = b.id \
				LEFT JOIN adversos as c on a.id_adverso = c.id \
				WHERE a.deletado = ? and b.deletado = ? and c.deletado = ? AND \
				(a.numero LIKE CONCAT(?, "%")) OR \
				(b.nome LIKE CONCAT(?, "%")) OR \
				(b.cpf_cnpj LIKE CONCAT(?, "%")) OR \
				(c.nome LIKE CONCAT(?, "%")) OR \
				(c.cpf_cnpj LIKE CONCAT(?, "%")) LIMIT 5',[0,0,0,numero,numero,numero,numero,numero]).then(data => {
					console.log('------------------- PESQUISA DE NÚMERO DE PROCESSO ---------------');
					console.log(data);
					console.log('----------------------------------------------------------');
					resolve(data);
				});
			});
	}

	PesquisarDescricaoGenericaAutocomplete(pesquisa,tipo) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id ,	a.descricao as name	FROM descricao_generico as a WHERE a.deletado = ? AND tipo = ? AND \
				a.descricao LIKE CONCAT (?, "%") LIMIT 5',[0,tipo,pesquisa]).then(data => {
					resolve(data);
				});
			});
	}

	PesquisarClientesAutocomplete(pesquisa) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id ,	a.nome as name	FROM clientes as a WHERE a.deletado = ? AND \
				a.nome LIKE CONCAT (?, "%") LIMIT 5',[0,pesquisa]).then(data => {
					resolve(data);
				});
			});
	}

	PesquisarAdversosAutocomplete(pesquisa) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id ,	a.nome as name	FROM adversos as a WHERE a.deletado = ? AND \
				a.nome LIKE CONCAT (?, "%") LIMIT 5',[0,pesquisa]).then(data => {
					resolve(data);
				});
			});
	}

	PesquisarClientesCategoriaAutocomplete(pesquisa) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id ,	a.nome as name	FROM grupos as a WHERE a.deletado = ? AND \
				a.nome LIKE CONCAT (?, "%") LIMIT 5',[0,pesquisa]).then(data => {
					resolve(data);
				});
			});
	}

	SelecioneTodosTipoCausasApenso(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM tipo_causa_apenso WHERE deletado = ? ORDER BY descricao DESC', [0]).then(data => {
				resolve(data);
			});
		});
	}






	SelecionarApenso(id) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*,\
				(SELECT b.nome FROM usuarios as b WHERE b.id=a.id_advogado AND b.cargo = ?) as advogado,\
				(SELECT c.descricao FROM descricao_generico as c WHERE c.id=a.id_tipo_causa_apenso AND tipo = ?) as tipo_causa,\
				(SELECT d.descricao FROM descricao_generico as d WHERE d.id=a.id_posicao_apenso AND tipo = ?) as posicao,\
				(SELECT g.descricao FROM descricao_generico as g WHERE g.id=a.id_comarca AND tipo = ?) as comarca,\
				(SELECT i.descricao FROM descricao_generico as i WHERE i.id=a.id_vara AND tipo = ?) as vara,\
				(SELECT k.descricao FROM descricao_generico as k WHERE k.id=a.id_foro AND tipo = ?) as foro,\
				(SELECT l.descricao FROM descricao_generico as l WHERE l.id=a.id_situacao_apenso AND tipo = ?) as situacao,\
				DATE_FORMAT(a.distribuicao, '%d/%m/%Y') as distribuicao,\
				DATE_FORMAT(a.citacao, '%d/%m/%Y') as citacao,\
				DATE_FORMAT(a.sentenca, '%d/%m/%Y') as sentenca, \
				DATE_FORMAT(a.data_cadastro, '%d/%m/%Y') as data_cadastro \
				FROM apenso as a WHERE a.id = ? AND a.deletado = ?", [1,14,7,19,18,4,7,id,0]).then(data => {
					resolve(data);
				});
			});
	}


	SelecionarRecurso(id) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*,\
				(SELECT b.nome FROM usuarios as b WHERE b.id=a.id_advogado AND b.cargo = ?) as advogado,\
				(SELECT c.descricao FROM relator as c WHERE c.id=a.id_relator) as relator,\
				(SELECT d.descricao FROM tipo_causa_recurso as d WHERE d.id=a.id_tipo_recurso) as tipo_recurso,\
				(SELECT g.descricao FROM posicao_recurso as g WHERE g.id=a.id_posicao_cliente) as posicao_cliente,\
				(SELECT i.descricao FROM tribunal as i WHERE i.id=a.id_tribunal) as tribunal,\
				(SELECT k.descricao FROM turma_camara as k WHERE k.id=a.id_turma_camara) as turma_camara,\
				DATE_FORMAT(a.ajuizado, '%d/%m/%Y') as ajuizado,\
				DATE_FORMAT(a.data_cadastro, '%d/%m/%Y') as data_cadastro \
				FROM recurso as a WHERE a.id = ? AND a.deletado = ?", [1,id, 0]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarDescricaoGenericoPorId(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.* FROM descricao_generico as a WHERE a.id = ? AND a.deletado = ?", [id, 0]).then(data => {
				resolve(data);
			});
		});
	}


	SelecionarParcelaPorId(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*,DATE_FORMAT(a.data_vencimento,'%d/%m/%y') as data_vencimento,\
				DATE_FORMAT(a.data_recebimento_reclamada,'%d/%m/%y') as data_recebimento_reclamada,\
				DATE_FORMAT(a.data_pago_reclamante,'%d/%m/%y') as data_pago_reclamante,\
				(SELECT b.descricao FROM descricao_generico as b WHERE b.id=a.id_banco) as banco_nome\
				FROM parcela_processo as a WHERE a.deletado = ? AND a.id = ?", [0,id]).then(data => {
					resolve(data);
				});
			});
	}





	// SelecionarApenso(id) {
	// 	return new Promise(function(resolve, reject) {
	// 		// Adicione a query com scape(?) e os respectivos valores em um array simples

	// 		helper.Query("SELECT a.*, \
	// 			(SELECT b.nome FROM usuarios as b WHERE b.id=a.id_advogado AND b.cargo = ?) as advogado,\
	// 			(SELECT c.descricao FROM tipo_causa_apenso as c WHERE c.id=a.id_tipo_causa_apenso) as tipo_causa,\
	// 			(SELECT d.descricao FROM posicao_apenso as d WHERE d.id=a.id_posicao_apenso) as posicao,\
	// 			(SELECT g.descricao FROM comarca as g WHERE g.id=a.id_comarca) as comarca,\
	// 			(SELECT i.descricao FROM vara_processo as i WHERE i.id=a.id_vara) as vara,\
	// 			(SELECT k.descricao FROM fase_processo as k WHERE k.id=a.id_foro) as foro,\
	// 			(SELECT l.descricao FROM fase_processo as l WHERE l.id=a.id_situacao_apenso) as situacao,\
	// 			DATE_FORMAT(a.distribuicao, '%d/%m/%Y') as distribuicao,\
	// 			DATE_FORMAT(a.citacao, '%d/%m/%Y') as citacao,\	
	// 			DATE_FORMAT(a.sentenca, '%d/%m/%Y') as sentenca, \
	// 			DATE_FORMAT(a.data_cadastro, '%d/%m/%Y') as data_cadastro \
	// 			FROM apenso as a WHERE a.id = ? AND a.deletado = ? LIMIT 1", [1,id, 0]).then(data => {
	// 				resolve(data);
	// 			});
	// 		});
	// }




	CadastrarDescricaoGenerico(data) {
		return new Promise(function(resolve, reject) {
			console.log('777777777777777 CADASTRAR TIPO GENERICO MODEL 777777777777777777777777');
			console.log(data);
			console.log('7777777777777777777777777777777777777777777777777777777777777777777');
			helper.Insert('descricao_generico', data).then(data => {
				resolve(data);
			});
		});
	}





	CadastrarTipoCausa(data) {
		return new Promise(function(resolve, reject) {
			console.log('777777777777777 CADASTRAR TIPO CAUSA MODEL 777777777777777777777777');
			console.log(data);
			console.log('7777777777777777777777777777777777777777777777777777777777777777777');
			helper.Insert('tipo_causa', data).then(data => {
				resolve(data);
			});
		});
	}


	CadastrarParcela(POST){
		return new Promise(function(resolve, reject) {
			console.log('88888888888888888 CADASTRAR ANDAMENTOS DO PROCESSO MODEL 8888888888888888888888');
			console.log(POST);
			console.log('8888888888888888888888888888888888888888888888888888888888888888888888888888888');
			

			if(POST.data_vencimento == "" || POST.data_vencimento == "undefined" || POST.data_vencimento == undefined){
				delete POST.data_vencimento;
			}

			if(POST.data_recebimento_reclamada == "" || POST.data_recebimento_reclamada == "undefined" || POST.data_recebimento_reclamada == undefined){
				delete POST.data_recebimento_reclamada;
			}

			if(POST.data_pago_reclamante == "" || POST.data_pago_reclamante == "undefined" || POST.data_pago_reclamante == undefined){
				delete POST.data_pago_reclamante;
			}

			if(POST.id_banco == "" || POST.id_banco == "undefined" || POST.id_banco == undefined){
				delete POST.id_banco;
			}

			POST = helper.PrepareDates(POST, ['data_vencimento']);
			POST = helper.PrepareDates(POST, ['data_recebimento_reclamada']);
			POST = helper.PrepareDates(POST, ['data_pago_reclamante']);



			console.log('depois');
			console.log(POST);
			console.log('aadoapsd');

			helper.Insert('parcela_processo', POST).then(data => {
				resolve(data);
			});
		});
	}





	CadastrarAndamento(POST){
		return new Promise(function(resolve, reject) {
			console.log('88888888888888888 CADASTRAR ANDAMENTOS DO PROCESSO MODEL 8888888888888888888888');
			console.log(POST);
			console.log('8888888888888888888888888888888888888888888888888888888888888888888888888888888');
			POST = helper.PrepareDates(POST, ['data']);

			helper.Insert('andamentos_processo', POST).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarCaptacao(POST){
		return new Promise(function(resolve, reject) {
			console.log('88888888888888888 CADASTRAR CAPTACAO DO PROCESSO MODEL 8888888888888888888888');
			console.log(POST);
			console.log('8888888888888888888888888888888888888888888888888888888888888888888888888888888');
			POST = helper.PrepareDates(POST, ['data']);

			helper.Insert('captacao_processo', POST).then(data => {
				resolve(data);
			});
		});
	}


	CadastrarPasta(POST) {
		return new Promise(function(resolve, reject) {
			console.log('---------------- CADASTRAR PASTA -------------');
			console.log(POST);
			console.log('----------------------------------------------');
			
			helper.Query('SELECT id FROM documentos WHERE deletado = ? AND pasta_processos = ?', [0, 1]).then(data_id_documento => {
				console.log('PPPPPPPPPPPPPPPP PEGANDO O ID DOS DOCUMENTOS PARA COLOCAR COMO DOC PAI PPPPPPPPPPPPPPPPPPPPPP');
				console.log(data_id_documento);
				console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
				POST.id_doc_pai = data_id_documento[0].id;

				console.log(POST);



				helper.Insert('documentos', POST).then(id_arquivo => {
					resolve(id_arquivo);
				});
			});
		});
	}







	CadastrarOutrosEnvolvidosCliente(POST){
		return new Promise(function(resolve, reject) {
			console.log('88888888888888888 CADASTRAR OUTROS ENVOLVIDOS DO PROCESSO MODEL 8888888888888888888888');
			console.log(POST);
			console.log('8888888888888888888888888888888888888888888888888888888888888888888888888888888');

			helper.Insert('outros_envolvidos_cliente_processo', POST).then(data => {
				resolve(data);
			});
		});
	}


	CadastrarOutrosEnvolvidosAdverso(POST){
		return new Promise(function(resolve, reject) {
			console.log('88888888888888888 CADASTRAR OUTROS ENVOLVIDOS DO PROCESSO MODEL 8888888888888888888888');
			console.log(POST);
			console.log('8888888888888888888888888888888888888888888888888888888888888888888888888888888');

			helper.Insert('outros_envolvidos_adverso_processo', POST).then(data => {
				resolve(data);
			});
		});
	}





	CadastrarProcesso(data) {
		return new Promise(function(resolve, reject) {
			helper.Insert('processos', data).then(data => {
				resolve(data);
			});
		});
	}
	AtualizarProcesso(data) {
		return new Promise(function(resolve, reject) {
			if (data.id_tipo_causa == "")
				delete data.id_tipo_causa;
			if (data.id_assunto == "")
				delete data.id_assunto;
			if (data.id_comarca == "")
				delete data.id_comarca;
			if (data.id_tipo_acao_rito == "")
				delete data.id_tipo_acao_rito;
			if (data.id_vara == "")
				delete data.id_vara;
			if (data.id_categoria == "")
				delete data.id_categoria;
			if (data.id_fase == "")
				delete data.id_fase;
			if (data.id_advogado == "")
				delete data.id_advogado;
			if(data.distribuicao == ""){
				delete data.distribuicao
			}
			if(data.citacao == "" || data.citacao == "undefined" || data.citacao == undefined){
				delete data.citacao
			}

			POST = helper.PrepareDates(POST, ['distribuicao']);
			POST = helper.PrepareDates(POST, ['citacao']);

			console.log('00000000000000000000000 UPDATE DE PROCESSO 0000000000000000000000000000');
			console.log(data);
			console.log('00000000000000000000000000000000000000000000000000000000000000000000000');
			

			helper.Update('processos', data).then(data => {
				resolve(data);
			});
		});
	}


	AtualizarOutroEnvolvidoCliente(data) {
		return new Promise(function(resolve, reject) {
			helper.Update('outros_envolvidos_cliente_processo', data).then(data => {
				resolve(data);
			});
		});

	}

	AtualizarOutroEnvolvidoAdverso(data) {
		return new Promise(function(resolve, reject) {
			helper.Update('outros_envolvidos_adverso_processo', data).then(data => {
				resolve(data);
			});
		});

	}


	AtualizarDescricaoGenerico(data) {
		return new Promise(function(resolve, reject) {
			helper.Update('descricao_generico', data).then(data => {
				resolve(data);
			});
		});

	}


	AtualizarCaptacao(data) {
		return new Promise(function(resolve, reject) {

			if(data.id_captador == ''){
				console.log('ID CAPTADOR VAZIO jjjjjjjjjjjjjjjjjjjjjjj');
				delete data.id_captador;
			}
			if(data.id_origem == '')
				delete data.id_origem;

			data = helper.PrepareDates(POST, ['data']);

			console.log('QQQQQQQQQQQQQQ DATA DO ATUALIZAR QQQQQQQQQQQQQQQQQQQQ');
			console.log(data);
			console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');

			helper.Update('captacao_processo', data).then(data => {
				resolve(data);
			});
		});

	}

	AtualizarParcela(data) {
		return new Promise(function(resolve, reject) {

			if(data.data_vencimento == "" || data.data_vencimento == "undefined" || data.data_vencimento == undefined){
				delete data.data_vencimento;
			}

			if(data.data_recebimento_reclamada == "" || data.data_recebimento_reclamada == "undefined" || data.data_recebimento_reclamada == undefined){
				delete data.data_recebimento_reclamada;
			}

			if(data.data_pago_reclamante == "" || data.data_pago_reclamante == "undefined" || data.data_pago_reclamante == undefined){
				delete data.data_pago_reclamante;
			}

			if(data.id_banco == "" || data.id_banco == "undefined" || data.id_banco == undefined){
				delete data.id_banco;
			}

			data = helper.PrepareDates(data, ['data_vencimento']);
			data = helper.PrepareDates(data, ['data_recebimento_reclamada']);
			data = helper.PrepareDates(data, ['data_pago_reclamante']);

			console.log('WWWWWWWWWWWWW MODEL ATUALIZAR PARCELA WWWWWWWWWWWWWWW');
			console.log(data);
			console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');

			helper.Update('parcela_processo', data).then(data => {
				resolve(data);
			});
		});

	}





	DesativarProcesso(data) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('processos', data).then(data => {
				resolve(data);
			});
		});
	}

	DesativarApenso(data) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('apenso', data).then(data => {
				resolve(data);
			});
		});
	}

	DesativarRecurso(data) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('recurso', data).then(data => {
				resolve(data);
			});
		});
	}

	DesativarDescricaoGenerico(data) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('descricao_generico', data).then(data => {
				resolve(data);
			});
		});
	}


	DesativarOutrosEnvolvidosAdverso(data){
		return new Promise(function(resolve, reject) {
			helper.Desativar('outros_envolvidos_adverso_processo', data).then(data => {
				resolve(data);
			});
		});
	}


	DesativarOutrosEnvolvidosCliente(data){
		return new Promise(function(resolve, reject) {
			helper.Desativar('outros_envolvidos_cliente_processo', data).then(data => {
				resolve(data);
			});
		});
	}

	DesativarCompromisso(data){
		return new Promise(function(resolve, reject) {
			helper.Desativar('compromissos', data).then(data => {
				resolve(data);
			});
		});
	}

	DesativarParcela(data) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('parcela_processo', data).then(data => {
				resolve(data);
			});
		});
	}






}
module.exports = ProcessosModel;

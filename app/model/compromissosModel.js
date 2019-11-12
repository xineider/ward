'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class CompromissosModel {
	SelecioneCompromissos() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*, DATE_FORMAT(a.data_cadastro, '%d/%m/%Y') as data_cadastro,\
				(SELECT COUNT(b.id) FROM usuarios as b WHERE b.id_setor = a.id LIMIT 1) as qtd_usuario\
				FROM compromissos as a WHERE a.deletado = ?", [0]).then(data => {
					resolve(data);
				});
			});
	}
	SelecionarEvento(id) {
		return new Promise(function(resolve, reject) {
			// 
			helper.Query("SELECT a.*,\
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


	SelecionarEventoEspecifico(id) {
		return new Promise(function(resolve, reject) {
			// 
			helper.Query("SELECT a.*,\
				(SELECT numero FROM processos as b WHERE b.id = a.id_processo) as numero,\
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




	// SelecionarEventos(id_usuario){
	// 	return new Promise(function(resolve, reject) {
	// 		helper.Query("SELECT a.id, a.nome as title,\
	// 			CONVERT_TZ(a.data_inicial,'+00:00',@@global.time_zone) as start,\
	// 			CONVERT_TZ(a.data_final,'+00:00',@@global.time_zone) as end\
	// 			FROM compromissos as a WHERE a.deletado = ? AND (a.id_advogado_setor = ? OR a.id_advogado_compromisso = ? OR (tipo_compromisso = ? AND id_usuario = ?)) ", [0,id_usuario,id_usuario,3,id_usuario]).then(data => {
	// 				console.log('@@@@@@@@@@@@@ Dados Eventos do Model @@@@@@@@@@@@@');
	// 				console.log(data);
	// 				console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	// 				resolve(data);
	// 			});
	// 		});
	// }

	SelecionarEventos(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.id, \
				CASE \
				WHEN (a.tipo_compromisso = 0 AND a.tipo = 0) THEN 'Audiência'\
				WHEN (a.tipo_compromisso = 0 AND a.tipo = 1) THEN 'Reunião'\
				WHEN (a.tipo_compromisso = 0 AND a.tipo = 2) THEN 'Perícia'\
				WHEN (a.tipo_compromisso = 1 AND a.tipo = 0) THEN 'Acórdão/Setença'\
				WHEN (a.tipo_compromisso = 1 AND a.tipo = 1) THEN 'Despacho/Decisões'\
				WHEN (a.tipo_compromisso = 1 AND a.tipo = 2) THEN 'Petições Diversas'\
				WHEN (a.tipo_compromisso = 1 AND a.tipo = 3) THEN 'Quesitos'\
				WHEN (a.tipo_compromisso = 1 AND a.tipo = 4) THEN 'Manifestação de Documentos'\
				WHEN (a.tipo_compromisso = 1 AND a.tipo = 5) THEN 'Prazos Processos Físicos'\
				WHEN (a.tipo_compromisso = 1 AND a.tipo = 6) THEN 'Perito'\
				WHEN (a.tipo_compromisso = 1 AND a.tipo = 7) THEN 'Providência'\
				WHEN (a.tipo_compromisso = 2 AND a.tipo = 0) THEN 'Julgamento'\
				ELSE a.nome\
				END as title,\
				CONVERT_TZ(a.data_inicial,'+00:00',@@global.time_zone) as start,\
				CONVERT_TZ(a.data_final,'+00:00',@@global.time_zone) as end\
				FROM compromissos as a WHERE a.deletado = ? AND (a.id_advogado_setor = ? OR a.id_advogado_compromisso = ? OR (tipo_compromisso = ? AND id_usuario = ?)) ", [0,id_usuario,id_usuario,3,id_usuario]).then(data => {
					console.log('@@@@@@@@@@@@@ Dados Eventos do Model @@@@@@@@@@@@@');
					console.log(data);
					console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
					resolve(data);
				});
			});
	}

	// SelecionarEventos(id_usuario){
	// 	return new Promise(function(resolve, reject) {
	// 		helper.Query("SELECT a.id, a.nome as title,\
	// 			CONVERT_TZ(a.data_inicial,'+00:00',@@global.time_zone) as start,\
	// 			CONVERT_TZ(a.data_final,'+00:00',@@global.time_zone) as end\
	// 			FROM compromissos as a WHERE a.deletado = ? AND (a.id_advogado_setor = ? OR a.id_advogado_compromisso = ? OR (tipo_compromisso = ? AND id_usuario = ?)) ", [0,id_usuario,id_usuario,3,id_usuario]).then(data => {
	// 				console.log('@@@@@@@@@@@@@ Dados Eventos do Model @@@@@@@@@@@@@');
	// 				console.log(data);
	// 				console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	// 				resolve(data);
	// 			});
	// 		});
	// }

	SelecionarEventosPauta(){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y %H:%i') as data_inicial,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y %H:%i') as data_final,\
				(SELECT nome FROM usuarios as b WHERE a.id_advogado = b.id AND b.cargo = ?) as advogado,\
				(SELECT numero FROM processos as c WHERE a.id_processo = c.id) as numero\
				FROM compromissos as a WHERE a.deletado = ?", [1,0]).then(data => {
					console.log('@@@@@@@@@@@@@ Dados Eventos da pauta @@@@@@@@@@@@@');
					console.log(data);
					console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
					resolve(data);
				});
			});
	}


	VerificarSeOutroAdvogadoNoCompromisso(id_advogado,id_processo){
		console.log('id compromisso ikkkkkkkkkkkk');
		console.log(id_processo);
		console.log('id advogado iiiiiiiiiiiii');
		console.log(id_advogado);


		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id_advogado_compromisso FROM compromissos WHERE id_advogado_compromisso = ? AND id = ?', [id_advogado,id_processo]).then(data => {
				resolve(data);
			});
		});
	}





	ProcurarCompromisso(POST,tipo_compromisso) {
		return new Promise(function(resolve, reject) {
			var where = '';
			var array = [1,1,0,tipo_compromisso];
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

					if(key == 'data_inicial'){
						console.log('na data inicial');
						where += 'AND a.' + key + ' >= ? ';
						POST = helper.PrepareDates(POST, ['data_inicial']);
						array.push(POST[key]);

					}else if(key == 'data_final' ){
						console.log('na data_final');
						where += 'AND a.' + key + ' <= ? ';
						POST = helper.PrepareDates(POST, ['data_final']);
						array.push(POST[key]);
					}else if(key.substring(0,3) == 'id_'){
						where += 'AND p.' + key + ' = ? ';
						array.push(POST[key]);
					}else{
						where += 'AND a.' + key + ' = ? ';
						console.log('no else');
						array.push('%'+POST[key]+'%');
					}

					
				}
			}

			console.log('----------------- ARRAY --------------------');
			console.log(array);
			console.log('--------------------------------------------');
			console.log('============== WHERE =======================');
			console.log(where);
			console.log('============================================');


			helper.Query("SELECT a.*,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y %H:%i') as data_inicial,\
				DATE_FORMAT(a.data_inicial, '%Y%m%d %H:%i') as data_inicial_table_filtro,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y %H:%i') as data_final,\
				DATE_FORMAT(a.data_final, '%Y%m%d %H:%i') as data_final_table_filtro,\
				(SELECT b.nome FROM usuarios as b WHERE a.id_advogado_setor = b.id AND b.cargo = ?) as advogado_responsavel_setor,\
				(SELECT c.nome FROM usuarios as c WHERE a.id_advogado_compromisso = c.id AND c.cargo = ?) as advogado_compromisso,\
				(SELECT d.numero FROM processos as d WHERE a.id_processo = d.id) as numero\
				FROM compromissos as a \
				LEFT JOIN processos as p ON p.id = a.id_processo\
				WHERE a.deletado = ? AND a.tipo_compromisso = ? "+ where,array).then(dataCompromisso => {
					resolve(dataCompromisso);
					
				});
			});
	}


	ProcurarCompromissoRelatorio(POST,tipo_compromisso) {
		return new Promise(function(resolve, reject) {
			var where = '';
			var array = [1,1,0,0,0,0,tipo_compromisso];
			// console.log('000000000000000 POST 00000000000000000000');
			// console.log(POST);
			// console.log('00000000000000000000000000000000000000000');
			
			for (var key in POST) {
				if (typeof POST[key] != 'undefined' && POST[key] != '') {
					console.log('ooooooooooooooooooooo RELATORIO CHAVE ooooooooooo');
					console.log(key);
					console.log('ooooooooooooooooooooooooooooooooooooooooooooooooo');
					console.log('«««««««««««««««««««« RELATORIO POST[KEY] «««««««««««««');
					console.log(POST[key]);
					console.log('««««««««««««««««««««««««««««««««««««««««««««««««««««««');

					if(key == 'data_inicial'){
						console.log('::::::::::::: DATA INICIAL ::::::::::::::');
						where += 'AND a.' + key + ' >= ? ';
						array.push(POST[key]);

					}else if(key == 'data_final' ){
						console.log('na data_final relatorio');
						where += 'AND a.' + key + ' <= ? ';
						//não precisa fazer o POST = helper.PrepareDates(POST, ['data_inicial']);
						//pois já foi feito previamente e colocado dentro do proprio post
						array.push(POST[key]);
					}else if(key.substring(0,3) == 'id_'){
						where += 'AND p.' + key + ' = ? ';
						array.push(POST[key]);
					}else{
						where += 'AND a.' + key + ' LIKE ? ';
						console.log('no else relatorio');
						array.push('%'+POST[key]+'%');
					}

					
				}
			}

			console.log('│││││││││││││││││││││││ ARRAY │││││││││││││││││││');
			console.log(array);
			console.log('│││││││││││││││││││││││││││││││││││││││││││││││││');
			console.log('************************ WHERE *********************');
			console.log(where);
			console.log('****************************************************');


			helper.Query("SELECT a.*,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y %H:%i') as data_inicial,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y') as data_inicial_sem_horas,\
				DATE_FORMAT(a.data_inicial, '%Y%m%d %H:%i') as data_inicial_table_filtro,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y %H:%i') as data_final,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y') as data_final_sem_horas,\
				DATE_FORMAT(a.data_final, '%Y%m%d %H:%i') as data_final_table_filtro,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y') as data_inicial_relatorio,\
				(CASE WEEKDAY(a.data_inicial) \
				WHEN 0 THEN 'SEGUNDA-FEIRA'\
				WHEN 1 THEN 'TERÇA-FEIRA'\
				WHEN 2 THEN 'QUARTA-FEIRA'\
				WHEN 3 THEN 'QUINTA-FEIRA'\
				WHEN 4 THEN 'SEXTA-FEIRA'\
				WHEN 5 THEN 'SÁBADO'\
				WHEN 6 THEN 'DOMINGO'\
				END) AS dia_semana_relatorio,\
				(SELECT b.nome FROM usuarios as b WHERE a.id_advogado_setor = b.id AND b.cargo = ?) as advogado_responsavel_setor,\
				(SELECT c.nome FROM usuarios as c WHERE a.id_advogado_compromisso = c.id AND c.cargo = ?) as advogado_compromisso,\
				p.numero,\
				(SELECT e.nome FROM clientes as e WHERE e.id IN (SELECT f.id_cliente FROM processos as f WHERE f.id = a.id_processo AND f.deletado = ?)) as cliente,\
				(SELECT g.nome FROM adversos as g WHERE g.id IN (SELECT h.id_adverso FROM processos as h WHERE h.id = a.id_processo AND h.deletado = ?)) as adverso,\
				com.descricao as comarca,\
				(SELECT k.descricao FROM descricao_generico as k WHERE k.id IN (SELECT l.id_vara FROM processos as l WHERE l.id = a.id_processo AND l.deletado = ?)) as vara\
				FROM compromissos as a \
				LEFT JOIN processos as p ON p.id = a.id_processo\
				LEFT JOIN descricao_generico as com ON com.id = p.id_comarca\
				WHERE a.deletado = ? AND a.tipo_compromisso = ? "+where+
				"ORDER BY a.data_inicial ASC, com.descricao ASC",array).then(dataCompromisso => {
					resolve(dataCompromisso);
					
				});
			});
	}



	SelecionarEventosPorTipoCompromisso(tipo){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y %H:%i') as data_inicial,\
				DATE_FORMAT(a.data_inicial, '%Y%m%d %H:%i') as data_inicial_table_filtro,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y %H:%i') as data_final,\
				DATE_FORMAT(a.data_final, '%Y%m%d %H:%i') as data_final_table_filtro,\
				(SELECT b.nome FROM usuarios as b WHERE a.id_advogado_setor = b.id AND b.cargo = ?) as advogado_responsavel_setor,\
				(SELECT c.nome FROM usuarios as c WHERE a.id_advogado_compromisso = c.id AND c.cargo = ?) as advogado_compromisso,\
				(SELECT d.numero FROM processos as d WHERE a.id_processo = d.id) as numero\
				FROM compromissos as a WHERE a.deletado = ? AND a.tipo_compromisso = ?", [1,1,0,tipo]).then(data => {
					console.log('@@@@@@@@@@@@@ Dados Eventos da pauta @@@@@@@@@@@@@');
					console.log(data);
					console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
					resolve(data);
				});
			});
	}

	SelecionarEventosRelatorioPorTipoCompromisso(tipo){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y %H:%i') as data_inicial,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y') as data_inicial_sem_horas,\
				DATE_FORMAT(a.data_inicial, '%Y%m%d %H:%i') as data_inicial_table_filtro,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y %H:%i') as data_final,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y') as data_final_sem_horas,\
				DATE_FORMAT(a.data_final, '%Y%m%d %H:%i') as data_final_table_filtro,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y') as data_inicial_relatorio,\
				(CASE WEEKDAY(a.data_inicial) \
				WHEN 0 THEN 'SEGUNDA-FEIRA'\
				WHEN 1 THEN 'TERÇA-FEIRA'\
				WHEN 2 THEN 'QUARTA-FEIRA'\
				WHEN 3 THEN 'QUINTA-FEIRA'\
				WHEN 4 THEN 'SEXTA-FEIRA'\
				WHEN 5 THEN 'SÁBADO'\
				WHEN 6 THEN 'DOMINGO'\
				END) AS dia_semana_relatorio,\
				(SELECT b.nome FROM usuarios as b WHERE a.id_advogado_setor = b.id AND b.cargo = ?) as advogado_responsavel_setor,\
				(SELECT c.nome FROM usuarios as c WHERE a.id_advogado_compromisso = c.id AND c.cargo = ?) as advogado_compromisso,\
				m.numero,\
				(SELECT e.nome FROM clientes as e WHERE e.id IN (SELECT f.id_cliente FROM processos as f WHERE f.id = a.id_processo AND f.deletado = ?)) as cliente,\
				(SELECT g.nome FROM adversos as g WHERE g.id IN (SELECT h.id_adverso FROM processos as h WHERE h.id = a.id_processo AND h.deletado = ?)) as adverso,\
				com.descricao as comarca,\
				(SELECT k.descricao FROM descricao_generico as k WHERE k.id IN (SELECT l.id_vara FROM processos as l WHERE l.id = a.id_processo AND l.deletado = ?)) as vara\
				FROM compromissos as a \
				LEFT JOIN processos as m ON m.id = a.id_processo\
				LEFT JOIN descricao_generico as com ON com.id = m.id_comarca\
				WHERE a.deletado = ? AND a.tipo_compromisso = ?\
				ORDER BY a.data_inicial ASC, com.descricao ASC", [1,1,0,0,0,0,tipo]).then(data => {
					console.log('@@@@@@@@@@@@@ Dados Eventos da pauta @@@@@@@@@@@@@');
					console.log(data);
					console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
					resolve(data);
				});
			});
	}


	SelecionarProcesso() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*, \
				DATE_FORMAT(a.data_cadastro, '%d/%m/%Y %H:%i') as data_processo,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as responsavel,\
				(SELECT c.nome FROM clientes as c WHERE c.id = a.id_cliente) as cliente,\
				(SELECT d.nome FROM adversos as d WHERE d.id = a.id_adverso) as adverso\
				FROM processos as a WHERE a.deletado = ?", [0]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarAdvogados(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, nome as descricao FROM usuarios WHERE deletado = ? AND cargo = ? ORDER BY nome DESC', [0,1]).then(data => {
				console.log(data);
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

	SelecioneComarcas() {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT * FROM descricao_generico WHERE deletado = ? AND tipo = ?", [0,19]).then(data => {
				resolve(data);
			});
		});
	}


	SelecionarTempo(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT DATE_FORMAT(NOW(),"%d/%m/%Y") as hoje').then(data => {					
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



	CadastrarCompromisso(POST) {
		POST = helper.PrepareDates(POST, ['data_inicial']);
		POST = helper.PrepareDates(POST, ['data_final']);


		POST.data_inicial = POST.data_inicial +' '+ POST.hora_inicial + ':00';
		POST.data_final = POST.data_final +' '+ POST.hora_final + ':00';
		delete POST.hora_inicial;
		delete POST.hora_final;

		console.log('************** POST FINAL ********************');
		console.log(POST);
		console.log('**********************************************');

		return new Promise(function(resolve, reject) {
			helper.Insert('compromissos', POST).then(data => {
				// helper.Insert('compromissos',"SET @@time_zone = '-3:00';").then(dataTime =>{
					resolve(data);
				// });
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
		delete POST.deletado;

		console.log('??????????????????? Atualizar POST Model ???????????????');
		console.log(POST);
		console.log('????????????????????????????????????????????????????????');

		return new Promise(function(resolve, reject) {
			helper.Update('compromissos', POST).then(data => {
				resolve(data);
			});
		});
	}
	DesativarCompromisso(data) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('compromissos', data).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = CompromissosModel;

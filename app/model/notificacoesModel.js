'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class NotificacoesModel {
	GetNotificacoes(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,  \
				DATE_FORMAT(a.data_cadastro, "%d/%m/%Y %H:%i") as data_cadastro,\
				(SELECT nome FROM usuarios as b WHERE b.id = a.id_usuario_criador ) as nome_criador \
				FROM notificacoes as a WHERE id_usuario = ? AND deletado = ? ORDER BY data_cadastro ASC', [id_usuario, 0]).then(data => {
					resolve(data);
				});
			});
	}

	AtualizarNotificacao(data) {
		return new Promise(function(resolve, reject) {
			helper.Update('notificacoes', data).then(data => {
				resolve(data);
			});
		});
	}

		GetUltimasTarefas(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, nome, status, DATE_FORMAT(data_prevista, "%d/%m/%Y") as data_prevista FROM tarefas WHERE id_usuario = ? AND deletado = ? ORDER BY data_cadastro DESC LIMIT 3', [id_usuario, 0]).then(data => {
				resolve(data);
			});
		});
	}
	GetUltimasTarefasPrazo(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, nome, DATE_FORMAT(data_prevista, "%d/%m/%Y") as data_prevista FROM `tarefas` WHERE id_usuario = ? AND deletado = ? ORDER BY data_prevista ASC LIMIT 5', [id_usuario, 0]).then(data => {
				resolve(data);
			});
		});
	}
	// GetUltimasMensagens(id_usuario){
	// 	return new Promise(function(resolve, reject) {
	// 		helper.Query('SELECT (SELECT c.nome FROM usuarios as c WHERE c.id = a.id_usuario LIMIT 1) as nome_usuario, a.texto\
	// 									 FROM chats_mensagens as a WHERE a.id_usuario_enviado = ?\
	// 									  AND a.id IN (SELECT MAX(b.id) FROM chats_mensagens as b\
	// 									   GROUP BY b.id_usuario_enviado) GROUP BY a.id_usuario_enviado\
	// 									    ORDER BY a.data_cadastro ASC LIMIT 5', [id_usuario]).then(data => {
	// 			resolve(data);
	//     });
	// 	});
	// }

	GetUltimasMensagens(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT (SELECT c.nome FROM usuarios as c WHERE c.id = a.id_usuario LIMIT 1) as nome_usuario, a.texto\
										 FROM chats_mensagens as a WHERE a.id_usuario_enviado = ?', [id_usuario]).then(data => {
				resolve(data);
	    });
		});
	}


	GetUltimasNotificacoes(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, CONCAT(texto, " às ", DATE_FORMAT(data_cadastro, "%d/%m/%Y %H:%i")) as texto FROM notificacoes WHERE id_usuario = ? AND deletado = ? ORDER BY data_cadastro DESC LIMIT 5', [id_usuario, 0]).then(data => {
				resolve(data);
			});
		});
	}

	GetNotificacoesQtdNaoVistas(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT COUNT(visto) as qtdNova FROM notificacoes WHERE id_usuario = ? AND deletado = ? AND visto = ?', [id_usuario, 0, 0]).then(data => {
				resolve(data);
			});
		});
	}

	GetTodasNotificacoesNaoVistas(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM notificacoes WHERE id_usuario = ? AND visto = ? AND deletado = ?', [id_usuario, 0, 0]).then(data_id_nao_visto => {
				resolve(data_id_nao_visto);
			});
		});
	}

	AtualizarTodasNaoVistas(POST){
		POST.lista = helper.PrepareMultiple(POST.lista, 'visto', 1);
		console.log('AAAAAAAAAAA POST ATUALIZARTODASNAOVISTAS AAAAAAAAAAAAAAAAAAAAAA');
		console.log(POST);
		console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
		return new Promise(function(resolve, reject) {
			helper.UpdateMultiple('notificacoes', POST.lista).then(id_notificacoes_visto => {
				resolve(id_notificacoes_visto);
			});
		});
	}




}
module.exports = NotificacoesModel;
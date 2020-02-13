'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class IndexModel {
	Login(POST) {
		// Tratar as variaveis e criar a query, caso não precise dela, deixe-a vazia
		query = 'SELECT id FROM usuarios WHERE login = ? AND senha = ?';
		array = [POST.login, POST.senha];
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query(query, array).then(data => {
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

	GetEmpresaAtualLogin(){
		console.log('resultado');
		console.log(helper.GetEmpresa())
		return helper.GetEmpresa();
	}

	SelecionarEmpresaAtual(empresa_atual) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*\
				FROM empresa_atual as a WHERE a.deletado = ? AND a.id_empresa = ?", [0,empresa_atual]).then(data => {
					resolve(data);
				});
			});
	}


}
module.exports = IndexModel;

'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class DocumentosModel {
	Login(POST) {
		// Tratar as variaveis e criar a query, caso não precise dela, deixe-a vazia
		query = 'SELECT id FROM usuarios WHERE login = ? AND senha = ?';
		array = [POST.login, POST.senha];
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			hlper.Query(query, array).then(data => {
			});
		});
	}
	ProcurarDocumentos(POST, id) {
		return new Promise(function(resolve, reject) {
			var where = '';
			var array = [0, id];
			for (var key in POST) {
				if (typeof POST[key] != 'undefined' && POST[key] != '') {
					where += 'AND ' + key + ' LIKE ? ';
					array.push('%'+POST[key]+'%');
				}
			}
			if (where == '') {
				helper.Query('SELECT id, tipo, arquivo, data_cadastro FROM documentos WHERE deletado = ? AND id_usuario = ? AND onde = ? AND tipo = ? AND id_doc_pai = ?', [0, id, 2, 1, 0]).then(data => {
	      	resolve('');
				});
			} else {
				helper.Query('SELECT *, DATE_FORMAT(data_cadastro, "%d/%m/%Y %H:%i") as data_cadastro FROM documentos WHERE deletado = ? AND id_usuario = ? '+where, array).then(data => {
					resolve(data);
				});
			}
		});
	}
	VerDocumentosUsuario(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM documentos WHERE deletado = ? AND id_usuario = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	GetDocumentosTarefas(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT arquivo, data_cadastro FROM documentos WHERE deletado = ? AND id_usuario = ? AND onde = ?', [0, id, 1]).then(data => {
				resolve(data);
			});
		});
	}
	DesativarDocumento(POST) {
		return new Promise(function(resolve, reject) {
			helper.Query('UPDATE documentos SET deletado = ? WHERE id = ? OR id_doc_pai = ?', [1, POST.id, POST.id]).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}
	GetDocumentos(id_user, id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, arquivo, tipo, DATE_FORMAT(data_cadastro, "%d/%m/%Y %H:%i") as data_cadastro FROM documentos WHERE \
				(deletado = ? AND onde = ? AND id_doc_pai = ?) AND (id_usuario = ? OR (SELECT b.id FROM documentos as b WHERE b.deletado = ? AND b.id = ? AND geral = ?))', [0, 2, id,id_user,0,id,1]).then(data => {
      	resolve(data);
			});
		});
	}
	GetPastas(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id, tipo, arquivo, data_cadastro FROM documentos WHERE \
				deletado = ? AND (id_usuario = ? OR geral = ?) AND onde = ? AND tipo = ? AND id_doc_pai = ?', [0, id,1, 2, 1, 0]).then(data => {
      	resolve(data);
			});
		});
	}

	GetPastasTodas(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.id, a.tipo, a.id_doc_pai, \
				IFNULL(CONCAT((SELECT CONCAT((SELECT c.arquivo FROM documentos as c WHERE c.id = b.id_doc_pai), '/', b.arquivo) FROM documentos as b WHERE b.id = a.id_doc_pai), '/', a.arquivo), IFNULL(CONCAT((SELECT b.arquivo FROM documentos as b WHERE b.id = a.id_doc_pai), '/', a.arquivo), a.arquivo)) as arquivo FROM documentos as a WHERE a.deletado = ? AND (a.id_usuario = ? OR a.geral = ?) AND a.onde = ? AND a.tipo = ?", [0, id, 1, 2, 1]).then(data => {
      	resolve(data);
			});
		});
	}

	CadastrarDocumento(POST) {
		return new Promise(function(resolve, reject) {
			POST.tarefa_arquivo = helper.PrepareMultiple(POST.tarefa_arquivo, 'id_usuario', POST.id_usuario);
			POST.tarefa_arquivo = helper.PrepareMultiple(POST.tarefa_arquivo, 'id_doc_pai', POST.id_doc_pai);
			POST.tarefa_arquivo = helper.PrepareMultiple(POST.tarefa_arquivo, 'onde', POST.onde);
			helper.InsertMultiple('documentos', POST.tarefa_arquivo).then(id_arquivo => {
				resolve(id_arquivo);
			});
		});
	}

	CadastrarPasta(POST) {
		return new Promise(function(resolve, reject) {
			helper.Insert('documentos', POST).then(id_arquivo => {
				resolve(id_arquivo);
			});
		});
	}
}
module.exports = DocumentosModel;
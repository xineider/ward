'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class ContatosModel {
	SelecioneContatos() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*, DATE_FORMAT(a.data_cadastro, '%d/%m/%Y') as data_cadastro,\
										(SELECT COUNT(b.id) FROM usuarios as b WHERE b.id_setor = a.id LIMIT 1) as qtd_usuario\
			 							FROM contatos as a WHERE a.deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}
	ProcurarContatos(POST) {
		return new Promise(function(resolve, reject) {
			var where = '';
			var array = [0];
			for (var key in POST) {
				if (typeof POST[key] != 'undefined' && POST[key] != '') {
					where += 'AND a.' + key + ' LIKE ? ';
					array.push('%'+POST[key]+'%');
				}
			}
			helper.Query("SELECT a.*, DATE_FORMAT(a.data_cadastro, '%d/%m/%Y') as data_cadastro,\
										(SELECT COUNT(b.id) FROM usuarios as b WHERE b.id_setor = a.id LIMIT 1) as qtd_usuario\
			 							FROM contatos as a WHERE a.deletado = ? "+where, array).then(data => {
				resolve(data);
			});
		});
	}
	SelecionarContato(id) {
		return new Promise(function(resolve, reject) {
			var data = {};
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT * FROM contatos WHERE id = ? AND deletado = ?", [id, 0]).then(data_contatos => {
				data.contatos = data_contatos;
				helper.Query("SELECT * FROM contatos_lista WHERE id_contato = ? AND deletado = ?", [id, 0]).then(data_lista => {
					data.lista = data_lista;
					resolve(data);
				});
			});
		});
	}
	SelecionarContatoLista(id) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.* FROM contatos_lista as a WHERE a.id_contato = ? AND a.deletado = ?", [id, 0]).then(data => {
				resolve(data);
			});
		});
	}
	CadastrarContato(data) {
		return new Promise(function(resolve, reject) {
			helper.Insert('contatos', data.contatos).then(id_contato => {
				data.lista = helper.PrepareMultiple(data.lista, 'id_contato', id_contato);
				// console.log('PPPPPPPPPPPPPPPPPPPPPPPP MODEL DEPOIS DO PrepareMultiple PPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
				// console.log(data);
				// console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
				helper.InsertMultiple('contatos_lista', data.lista).then(id_lista => {
					resolve(id_contato);
				});
			});
		});
	}
	AtualizarContato(data) {
		if (typeof data.remover != 'undefined') {
			data.remover = helper.PrepareMultiple(data.remover, 'deletado', 1);
		} else {
			data.remover = {};
		}
		if (typeof data.lista != 'undefined') {
			data.lista = helper.PrepareMultiple(data.lista, 'id_contato', data.contatos.id);
		} else {
			data.lista = {};
		}
		if (typeof data.lista_editar == 'undefined') {
			data.lista_editar = {};
		}

		console.log('JJJJJJJJJJJJJ DATA ATUALIZAR JJJJJJJJJJJ');
		console.log(data);
		console.log('JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ');


		return new Promise(function(resolve, reject) {
			helper.Update('contatos', data.contatos).then(id_contato => {
				helper.UpdateMultiple('contatos_lista', data.remover).then(id_lista_rmv => {
					helper.InsertMultiple('contatos_lista', data.lista).then(id_lista_insert => {
						helper.UpdateMultiple('contatos_lista', data.lista_editar).then(id_lista_edit => {
							resolve(data.contatos.id);
						});
					});
				});
			});
		});
	}
	DesativarContato(data) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('contatos', data).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = ContatosModel;

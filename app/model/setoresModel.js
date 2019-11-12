'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class SetoresModel {
	SelecioneSetores() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*, DATE_FORMAT(a.data_cadastro, '%d/%m/%Y') as data_cadastro,\
										(SELECT COUNT(b.id) FROM usuarios as b WHERE b.id_setor = a.id LIMIT 1) as qtd_usuario\
			 							FROM setores as a WHERE a.deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}
	SelecionarSetor(id) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.* FROM setores as a WHERE a.id = ? AND a.deletado = ?", [id, 0]).then(data => {
				resolve(data);
			});
		});
	}
	CadastrarSetor(data) {
		return new Promise(function(resolve, reject) {
			helper.Insert('setores', data).then(data => {
				resolve(data);
			});
		});
	}
	AtualizarSetor(data) {
		return new Promise(function(resolve, reject) {
			helper.Update('setores', data).then(data => {
				resolve(data);
			});
		});
	}
	DesativarSetor(data) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('setores', data).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = SetoresModel;

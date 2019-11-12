'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class FerramentasModel {
	GetSenhas(id) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT * FROM ferramentas_senhas WHERE id_usuario = ?', [id]).then(data => {
				resolve(data);
			});
		});
	}
	GetSenha(id) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT * FROM ferramentas_senhas WHERE id = ?', [id]).then(data => {
				resolve(data);
			});
		});
	}
	CadastrarSenha(POST) {
		return new Promise(function(resolve, reject) {
			helper.Insert('ferramentas_senhas', POST).then(data => {
				resolve(data);
			});
		});
	}
	AtualizarSenha(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('ferramentas_senhas', POST).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = FerramentasModel;
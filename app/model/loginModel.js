'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class IndexModel {
	Login(POST) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT id, nivel,imagem,nome FROM usuarios WHERE login = ? AND senha = ?', [POST.login, POST.senha]).then(data => {
				console.log(data);
	  		if (data.length > 0) {
	        var hash_login = helper.Encrypt(Date());
	        data[0].hash_login = hash_login;
	        helper.Update('usuarios', {id: data[0].id, hash_login: hash_login}).then(data_up => {
	          resolve(data);
	        });
	      } else {
	      	resolve(data);
	      }
			});
		});
	}
	LoadConfig(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM configuracoes WHERE id_usuario = ?', [id]).then(data => {
				resolve(data);
			});
		});
	}

	// SelecioneClientesPorCpf(cpf) {
	// 	return new Promise(function(resolve, reject) {
	// 		// Adicione a query com scape(?) e os respectivos valores em um array simples
	// 		helper.Query('SELECT id, nome as name FROM clientes WHERE cpf_cnpj LIKE CONCAT("%", ?, "%") AND deletado = ? LIMIT 5', [cpf,0]).then(data => {
	// 			resolve(data);
	// 		});
	// 	});
	// }

	SelecioneClientesPorCpf(cpf) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT b.id, a.nome as name,b.numero FROM clientes as a \
INNER JOIN processos as b ON a.id = b.id_cliente \
WHERE (a.cpf_cnpj LIKE CONCAT("%", ?, "%") OR b.numero LIKE CONCAT ("%", ?, "%")) AND a.deletado = ? AND b.deletado = ?  group by name limit 10', [cpf,cpf,0,0]).then(data => {
				resolve(data);
			});
		});
	}


}
module.exports = IndexModel;

'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class ApiModel {

	PesquisarEmail(email) {
		return new Promise(function(resolve, reject) {
			/*seleciono o id para ver se existe algum usuario com aquele email*/
			helper.Query('SELECT id	FROM usuarios WHERE email = ? AND deletado = ? LIMIT 1',[email,0]).then(data => {
				resolve(data);
			});
		});
	}

	AlterarSenhaUsuarioPorId(POST){
		return new Promise(function(resolve, reject) {
			POST.senha = helper.Encrypt(POST.senha);
			helper.Update('usuarios', POST).then(data => {
				resolve(data);
			});
		});
	}


}
module.exports = ApiModel;

'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class UsuariosModel {

	SelecionarUsuarios() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, (SELECT b.nome FROM setores as b WHERE a.id_setor = b.id) as setor \
				FROM usuarios as a WHERE a.id != ? AND a.deletado = ?', [1, 0]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarSetores() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM setores WHERE deletado = ?', [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecionarUsuario(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE id = ? AND deletado = ?', [id, 0]).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarUsuario(data) {
		return new Promise(function(resolve, reject) {
			data.senha = helper.Encrypt(data.senha);
			console.log('************************* DATA CadastrarUsuario ***************************');
			console.log(data);
			console.log('***************************************************************************');
			helper.Insert('usuarios', data).then(data => {
				helper.Insert('documentos', {id_usuario: data, arquivo: 'Documentos', tipo: 1, onde: 2}).then(docs => {
					resolve(data);
				});
			});
		});
	}

	AtualizarUsuario(data) {
		if (POST.senha != '') {
			POST.senha = helper.Encrypt(POST.senha);
		} else {
			delete POST.senha;
		}
		console.log('AAAAAAAAAAAAAAAAAAA ATUALIZAR DATA AAAAAAAAAAAAAAAAAAAAA');
		console.log(data);
		console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');


		return new Promise(function(resolve, reject) {
			helper.Update('usuarios', data).then(data => {
				resolve(data);
			});
		});
	}

	DesativarUsuario(post) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('usuarios', post).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}


	VerificarSeTemLogin(login){
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT login \
				FROM usuarios WHERE deletado = ? AND login = ?", [0,login]).then(data => {
					resolve(data);
				});
			});
	}

	VerificarSeTemLoginDiferentePorId(login,id){
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT login \
				FROM usuarios WHERE deletado = ? AND login = ? AND id = ?", [0,login,id]).then(data => {
					resolve(data);
				});
			});
	}

	VerificarSeTemEmailDiferente(POST){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT email \
				FROM usuarios WHERE deletado = ? AND email = ? AND id = ?", [0,POST.email,POST.id]).then(data => {
					resolve(data);
				});
			});

	}

	LoadPerfil(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT imagem, nome, email, id FROM usuarios WHERE id = ? AND deletado = ?', [id, 0]).then(data => {
				resolve(data);
			});
		});
	}

}
module.exports = UsuariosModel;

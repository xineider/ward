'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class AdversosModel {
	SelecioneAdversos() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT * FROM adversos WHERE deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}

	PesquisarAdversoPorCpfCnpj(cpf_cnpj) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT * FROM adversos WHERE deletado = ? AND cpf_cnpj = ? LIMIT 1", [0,cpf_cnpj]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneAdversosDescricao() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT *, nome as descricao FROM adversos WHERE deletado = ?", [0]).then(data => {
				console.log('6666666666666666 DENTRO DO MODEL 666666666666666666666666');
				console.log(data);
				console.log('666666666666666666666666666666666666666666666666666666666');
				resolve(data);
			});
		});
	}

		SelecionAdversosCpfCnpjExtra() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT cpf_cnpj as extra FROM adversos WHERE deletado = ?", [0]).then(data => {
				console.log('6666666666666666 DENTRO DO MODEL 666666666666666666666666');
				console.log(data);
				console.log('666666666666666666666666666666666666666666666666666666666');
				resolve(data);
			});
		});
	}

	SelecionarTodosProcessosDoAdverso(idAdverso){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*, \
				DATE_FORMAT(a.data_cadastro, '%d/%m/%Y %H:%i') as data_processo,\
				DATE_FORMAT(a.data_cadastro, '%Y%m%d %H:%i') as data_table_filtro,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as responsavel,\
				(SELECT c.nome FROM clientes as c WHERE c.id = a.id_cliente) as cliente,\
				(SELECT d.nome FROM adversos as d WHERE d.id = a.id_adverso) as adverso\
				FROM processos as a WHERE deletado = ? AND id_adverso = ?", [0,idAdverso]).then(data => {
					resolve(data);
				});
			});
	}


	SelecionarAdversoPorProcesso(idProcesso){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT id_adverso \
				FROM processos as a WHERE deletado = ? AND id = ? LIMIT 1", [0,idProcesso]).then(data => {
					resolve(data);
				});
			});
	}



	SelecionarEnvolvidosAdverso(idProcesso) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*, \
				(SELECT nome FROM adversos as b WHERE a.id_adverso = b.id) as nome,\
				(SELECT descricao FROM outros_envolvidos_tipo_processo as c WHERE a.id_outros_tipo = c.id)as posicao\
				FROM outros_envolvidos_adverso_processo as a WHERE deletado = ? AND id_processo = ?", [0,idProcesso]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarTiposOutrosEnvolvidos(){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT * FROM outros_envolvidos_tipo_processo WHERE deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}

	PesquisarNomeAdversoPorCpfCnpjAutocomplete(cpf_cnpj) {
		return new Promise(function(resolve, reject) {

			console.log('000000000000000 cpf_cnpj 00000000000000000000');
			console.log(cpf_cnpj);
			console.log('00000000000000000000000000000000000000000');			

			/*Adiciona na pesquisa o nome do usuário para facilitar ao usuário*/
			helper.Query('SELECT cpf_cnpj as qualqueratributo,\
				(CONCAT(nome," - ",cpf_cnpj)) as name\
				FROM adversos WHERE cpf_cnpj LIKE CONCAT(?, "%") LIMIT 5',[cpf_cnpj]).then(data => {
					console.log('------------------- PESQUISA DE ADVERSOS ---------------');
					console.log(data);
					console.log('----------------------------------------------------------');
					resolve(data);
				});
			});
	}


	ProcurarAdversos(POST) {
		return new Promise(function(resolve, reject) {
			var where = '';
			var array = [0];
			for (var key in POST) {
				if (typeof POST[key] != 'undefined' && POST[key] != '') {
					where += 'AND ' + key + ' LIKE ? ';
					array.push('%'+POST[key]+'%');
				}
			}
			helper.Query("SELECT * FROM adversos WHERE deletado = ? "+where, array).then(data => {
				resolve(data);
			});
		});
	}
	SelecionarAdverso(id) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT * FROM adversos WHERE id = ? AND deletado = ?", [id, 0]).then(data => {
				resolve(data);
			});
		});
	}
	CadastrarAdverso(POST) {
		return new Promise(function(resolve, reject) {
			POST = helper.PrepareDates(POST, ['nascimento']);
			helper.Insert('adversos', POST).then(data => {
				resolve(data);
			});
		});
	}
	AtualizarAdverso(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('adversos', POST).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}
	DesativarAdverso(POST) {
		console.log(POST);

		return new Promise(function(resolve, reject) {
			helper.Desativar('adversos', POST).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}
}
module.exports = AdversosModel;

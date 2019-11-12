'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class ClientesModel {
	SelecioneClientes() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT * FROM clientes WHERE deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneClientesDescricao() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT *, nome as descricao FROM clientes WHERE deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneClientesCpfCnpjExtra() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT cpf_cnpj as extra FROM clientes WHERE deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecionarEnvolvidosCliente(idProcesso) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*, \
				(SELECT nome FROM clientes as b WHERE a.id_cliente = b.id) as nome,\
				(SELECT descricao FROM outros_envolvidos_tipo_processo as c WHERE a.id_outros_tipo = c.id)as posicao\
				FROM outros_envolvidos_cliente_processo as a WHERE deletado = ? AND id_processo = ?", [0,idProcesso]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarClientePorProcesso(idProcesso){
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT id_cliente \
				FROM processos as a WHERE deletado = ? AND id = ? LIMIT 1", [0,idProcesso]).then(data => {
					resolve(data);
				});
			});
	}


	SelecionarTodosProcessosDoCliente(idCliente){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*, \
				DATE_FORMAT(a.data_cadastro, '%d/%m/%Y %H:%i') as data_processo,\
				DATE_FORMAT(a.data_cadastro, '%Y%m%d %H:%i') as data_table_filtro,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as responsavel,\
				(SELECT c.nome FROM clientes as c WHERE c.id = a.id_cliente) as cliente,\
				(SELECT d.nome FROM adversos as d WHERE d.id = a.id_adverso) as adverso\
				FROM processos as a WHERE deletado = ? AND id_cliente = ?", [0,idCliente]).then(data => {
					resolve(data);
				});
			});
	}

	PesquisarClientePorCpfCnpj(cpf_cnpj) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT *,DATE_FORMAT(nascimento, '%d/%m/%Y') as nascimento FROM clientes WHERE deletado = ? AND cpf_cnpj = ? LIMIT 1", [0,cpf_cnpj]).then(data => {
				resolve(data);
			});
		});
	}


	PesquisarNomeClientePorCpfCnpjAutocomplete(cpf_cnpj) {
		return new Promise(function(resolve, reject) {

			console.log('000000000000000 cpf_cnpj 00000000000000000000');
			console.log(cpf_cnpj);
			console.log('00000000000000000000000000000000000000000');			

			/*Adiciona na pesquisa o nome do usuário para facilitar ao usuário*/
			helper.Query('SELECT cpf_cnpj as qualqueratributo,\
				(CONCAT(nome," - ",cpf_cnpj)) as name\
				FROM clientes WHERE cpf_cnpj LIKE CONCAT(?, "%") LIMIT 5',[cpf_cnpj]).then(data => {
					console.log('------------------- PESQUISA DE CLIENTES ---------------');
					console.log(data);
					console.log('----------------------------------------------------------');
					resolve(data);
				});
			});
	}


	ProcurarClientes(POST) {
		return new Promise(function(resolve, reject) {
			var where = '';
			var array = [0];
			for (var key in POST) {
				if (typeof POST[key] != 'undefined' && POST[key] != '') {
					where += 'AND ' + key + ' LIKE ? ';
					array.push('%'+POST[key]+'%');
				}
			}
			helper.Query("SELECT * FROM clientes WHERE deletado = ? "+where, array).then(data => {
				resolve(data);
			});
		});
	}
	SelecioneGrupos() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT id,nome FROM grupos WHERE deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}
	SelecionarCliente(id) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT *, DATE_FORMAT(nascimento, '%d/%m/%Y') as nascimento FROM clientes WHERE id = ? AND deletado = ?", [id, 0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecioneOutrosEnvolvidos(idProcesso) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT a.*,\
				(SELECT b.numero FROM processos as b WHERE b.id = a.id_processo) as numeroProcesso, \
				(SELECT c.descricao FROM outros_envolvidos_tipo_processo as c WHERE c.id = a.id_outros_tipo) as posicao,\
				(SELECT d.nome FROM clientes as d WHERE d.id = a.id_cliente) as nome\
				FROM outros_envolvidos_processo as a WHERE a.deletado = ? \
				AND a.id_processo = ? ", [0,idProcesso]).then(data => {
					resolve(data);
				});
			});
	}


	SelecionarTiposOutrosEnvolvidos(){
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT * FROM outros_envolvidos_tipo_processo WHERE deletado = ?", [0]).then(data => {
				resolve(data);
			});
		});
	}


	CadastrarGrupo(POST) {
		return new Promise(function(resolve, reject) {
			helper.Insert('grupos', POST).then(id => {
				var data = {};
				data.id = id;
				data.nome = POST.nome;
				resolve(data);
			});
		});
	}
	CadastrarCliente(POST) {
		return new Promise(function(resolve, reject) {
			if (POST.nascimento == "")
				delete POST.nascimento;
			if(POST.nascimento != "")
				POST = helper.PrepareDates(POST, ['nascimento']);
			
			helper.Insert('clientes', POST).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarAdverso(POST) {
		return new Promise(function(resolve, reject) {
			helper.Insert('adversos', POST).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarProcesso(data) {
		return new Promise(function(resolve, reject) {
			helper.Insert('processos', data).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarPasta(POST) {
		return new Promise(function(resolve, reject) {
			console.log('---------------- CADASTRAR PASTA -------------');
			console.log(POST);
			console.log('----------------------------------------------');
			
			helper.Query('SELECT id FROM documentos WHERE deletado = ? AND pasta_processos = ?', [0, 1]).then(data_id_documento => {
				console.log('PPPPPPPPPPPPPPPP PEGANDO O ID DOS DOCUMENTOS PARA COLOCAR COMO DOC PAI PPPPPPPPPPPPPPPPPPPPPP');
				console.log(data_id_documento);
				console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
				POST.id_doc_pai = data_id_documento[0].id;

				console.log(POST);



				helper.Insert('documentos', POST).then(id_arquivo => {
					resolve(id_arquivo);
				});
			});
		});
	}



	AtualizarCliente(POST) {
		return new Promise(function(resolve, reject) {
			if (POST.nascimento == "")
				delete POST.nascimento;
			if(POST.nascimento != "")
				POST = helper.PrepareDates(POST, ['nascimento']);

			helper.Update('clientes', POST).then(data => {

				resolve(data);
			});
		});
	}

	AtualizarAdverso(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('adversos', POST).then(data => {
				resolve(data);
			});
		});
	}





	DesativarCliente(POST) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('clientes', POST).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = ClientesModel;

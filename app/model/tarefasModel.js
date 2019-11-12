'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class TarefasModel {
	CadastrarTarefa(data) {
		return new Promise(function(resolve, reject) {
			if(data.tarefa.data_inicio == ''){
				data.tarefa.data_inicio = data.tarefa.data_prevista;
				console.log(':::::::::::::::: data_inicio :::::::::::::::::::::::::');
				console.log(data.tarefa);
				console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::');
			}
			if(data.tarefa.data_final == ''){
				data.tarefa.data_final = data.tarefa.data_prevista;
			}
			console.log('ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg');
			console.log(data);
			console.log('ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg');
			data.tarefa = helper.PrepareDates(data.tarefa, ['data_prevista','data_inicio','data_final']);
			helper.Insert('tarefas', data.tarefa).then(id_tarefa => {
				data.tarefa_topico = helper.PrepareMultiple(data.tarefa_topico, 'id_tarefa', id_tarefa);
				helper.InsertMultiple('tarefas_topicos', data.tarefa_topico).then(id_topico => {
					if (typeof data.tarefa_arquivo != 'undefined' && data.tarefa_arquivo.length > 0) {
						data.tarefa_arquivo = helper.PrepareMultiple(data.tarefa_arquivo, 'id_tarefa', id_tarefa);
						helper.InsertMultiple('tarefas_arquivos', data.tarefa_arquivo).then(id_arquivo => {
							resolve(id_tarefa);
						});
					} else {
						resolve(id_topico);
					}
				});
			});
		});
	}
	CadastraArquivo(id, nome) {
		return new Promise(function(resolve, reject) {
			helper.Insert('documentos', {id_usuario: id, arquivo: nome}).then(data => {
				resolve(data);
			});
		});
	}
	CadastrarTarefaComentario(data, id_usuario) {
		console.log('data');
		console.log(data);
		console.log('id_usuario');
		console.log(id_usuario);

		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id_usuario FROM tarefas WHERE id = ?', [data.id_tarefa]).then(data_tarefa => {
				data.tipo = data_tarefa[0].id_usuario == id_usuario ? 1 : 2;
				helper.Insert('tarefas_comentarios', data).then(data => {
					resolve(data);
				});
			});
		});
	}


	CadastrarNotificacao(POST){
		return new Promise(function(resolve, reject) {
			helper.Insert('notificacoes', POST).then(data => {				
				resolve(data);
			});
		});
	}


	AtualizarTopico(data) {
		return new Promise(function(resolve, reject) {
			helper.Update('tarefas_topicos', data).then(data => {
				resolve(data);
			});
		});
	}
	AtualizarTarefa(data) {
		return new Promise(function(resolve, reject) {
			helper.Update('tarefas', data).then(data => {
				resolve(data);
			});
		});
	}
	DesativarTarefa(table, post) {
		return new Promise(function(resolve, reject) {
			helper.Desativar(table, post).then(data => {
				resolve(data);
			});
		});
	}
	GetPorcentagem(POST) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT ((SELECT SUM(b.status) FROM tarefas_topicos as b WHERE b.id_tarefa = a.id_tarefa AND status = ? LIMIT 1)/(SELECT COUNT(c.id) FROM tarefas_topicos as c WHERE c.id_tarefa = a.id_tarefa LIMIT 1)) as porcentagem FROM `tarefas_topicos` as a WHERE a.id = ? AND a.deletado = ?', [1, POST.id, 0]).then(data => {
				console.log(data);
				resolve(data);
			});
		});
	}

	SelecioneRequisicoes(){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT *,\
				DATE_FORMAT(data, '%d/%m/%Y') as data		\
				FROM requisicoes WHERE deletado = ?", [0]).then(data => {
					console.log(data);
					resolve(data);
				});
			});

	}
	SelecioneTodasTarefasDoUsuario(id,nivel) {
		return new Promise(function(resolve, reject) {
			if (nivel == 2) {
				helper.Query('SELECT a.id_usuario, \
					(SELECT d.nome FROM usuarios as d WHERE d.id = a.id_usuario LIMIT 1) as nome_usuario\
					FROM tarefas as a \
					WHERE a.deletado = ? AND a.id_responsavel = ? GROUP BY a.id_usuario',[0,id]).then(data => {
						resolve(data);
					});
				}else if(nivel == 1){
					helper.Query('SELECT a.id_usuario, \
						(SELECT d.nome FROM usuarios as d WHERE d.id = a.id_usuario LIMIT 1) as nome_usuario\
						FROM tarefas as a \
						WHERE a.deletado = ? GROUP BY a.id_usuario',[0]).then(data => {
							resolve(data);
						});
					} else {
						helper.Query('SELECT a.id, a.nome, DATE_FORMAT(a.data_final,"%d/%m/%Y") as data_prevista, TIMEDIFF(a.tempo_previsto, a.tempo_gasto) as tempo_previsto, a.descricao, \
							(SELECT ((SELECT SUM(b.status) FROM tarefas_topicos as b WHERE b.id_tarefa = a.id AND status = 1 LIMIT 1)/(SELECT COUNT(c.id) FROM tarefas_topicos as c WHERE c.id_tarefa = a.id LIMIT 1)) as porcentagem FROM `tarefas_topicos` WHERE id_tarefa = a.id LIMIT 1) as porcentagem\
							FROM tarefas as a \
							WHERE a.id_usuario = ? AND a.deletado = ?',
							[id, 0]).then(data => {
								resolve(data);
							});
						}
					});
	}

	SelecionarTarefa(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id, a.nome, DATE_FORMAT(a.data_final,"%d/%m/%Y") as data_prevista, \
				TIMEDIFF(a.tempo_previsto, a.tempo_gasto) as tempo_previsto, a.descricao, \
				(SELECT ((SELECT SUM(b.status) FROM tarefas_topicos as b WHERE b.id_tarefa = a.id AND status = 1 LIMIT 1)/(SELECT COUNT(c.id) FROM tarefas_topicos as c WHERE c.id_tarefa = a.id LIMIT 1)) as porcentagem FROM `tarefas_topicos` WHERE id_tarefa = a.id LIMIT 1) as porcentagem\
				FROM tarefas as a \
				WHERE a.id_usuario = ? AND a.deletado = ?',
				[id, 0]).then(data => {
					resolve(data);
				});
			});
	}


	SelecioneComentarios(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT texto FROM tarefas_comentarios WHERE deletado = ? AND id_tarefa = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	SelecioneTopicos(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT texto, status, id FROM tarefas_topicos WHERE deletado = ? AND id_tarefa = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	SelecioneInfos(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.descricao, a.nome, a.id_responsavel, a.status, DATE_FORMAT(a.data_prevista,"%d/%m/%Y") as data_prevista, \
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_responsavel) as responsavel,\
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario) as usuario, \
				TIME_TO_SEC(a.tempo_gasto) * 1000 as tempo_gasto,\
				a.id_usuario\
				FROM tarefas as a WHERE a.deletado = ? AND a.id = ?', [0, id]).then(data => {
					resolve(data);
				});
			});
	}
	SelecioneUploads(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT arquivo FROM tarefas_arquivos WHERE deletado = ? AND id_tarefa = ?', [0, id]).then(data => {
				resolve(data);
			});
		});
	}
	SelecioneUsuarios() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT nome, id FROM usuarios WHERE deletado = ? AND nivel != ?', [0, 1]).then(data => {
				resolve(data);
			});
		});
	}
	SelecioneGerentes() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT nome, id FROM usuarios WHERE deletado = ? AND nivel = ?', [0, 2]).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = TarefasModel;

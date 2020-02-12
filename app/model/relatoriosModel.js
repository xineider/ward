'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class RelatoriosModel {

	SelecionarTodasParcelas(idProcesso) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*,\
				(SELECT b.numero FROM processos as b WHERE b.id = a.id_processo) as numero_processo,\
				DATE_FORMAT(a.data_vencimento,'%d/%m/%y') as data_vencimento,\
				DATE_FORMAT(a.data_vencimento, '%Y%m%d') as data_vencimento_filtro,\
				DATE_FORMAT(a.data_recebimento_reclamada,'%d/%m/%y') as data_recebimento_reclamada,\
				DATE_FORMAT(a.data_recebimento_reclamada, '%Y%m%d') as data_recebimento_reclamada_filtro,\
				DATE_FORMAT(a.data_pago_reclamante,'%d/%m/%y') as data_pago_reclamante,\
				DATE_FORMAT(a.data_pago_reclamante, '%Y%m%d') as data_pago_reclamante_filtro,\
				(SELECT c.descricao FROM descricao_generico as c WHERE c.id=a.id_banco) as banco_nome\
				FROM parcela_processo as a WHERE a.deletado = ?", [0]).then(data => {
					resolve(data);
				});
			});
	}



	SelecionarParcelaPorId(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*,\
				DATE_FORMAT(a.data_vencimento,'%d/%m/%y') as data_vencimento,\
				DATE_FORMAT(a.data_recebimento_reclamada,'%d/%m/%y') as data_recebimento_reclamada,\
				DATE_FORMAT(a.data_pago_reclamante,'%d/%m/%y') as data_pago_reclamante,\
				(SELECT b.descricao FROM descricao_generico as b WHERE b.id=a.id_banco) as banco_nome\
				FROM parcela_processo as a WHERE a.deletado = ? AND a.id = ?", [0,id]).then(data => {
					resolve(data);
				});
			});
	}



}
module.exports = RelatoriosModel;
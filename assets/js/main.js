// Eventos DOM
$(document).on('ready', function () {
	// NovidadesChat();
	// UltimasNotificacoesUsuario();

	$(document).ready(function(){
		$('.modal').modal();
	});

	
	$('ul.tabs').tabs();
	// InitBar();

	LoadInfosUsuario();
	adicionarLoader();
	FormatInputs();
	InitChat();
	calendarioCompromissos();
	calendarioLista();
	$('select').formSelect();

	$(document).ajaxComplete(function () {
		calendarioCompromissos();
		calendarioLista();
		M.updateTextFields();
		$('.collapsible').collapsible();
		$('ul.tabs').tabs();

		validarDataTable($('.tabela_filtrada'))
		validarDataTableNoSort($('#tabela_andamentos'));
		validarDataTableNoSort($('#tabela_parcelas'));
		validarDataTable($('#tabela_andamentos_more_details'));
		validarDataTable($('#tabela_todos_clientes'));
		validarDataTable($('#tabela_interna_compromisso'));
		validarDataTable($('#tabela_todos_apensos'));
		validarDataTable($('#tabela_todos_recursos'));
		validarDataTable($('#tabela_todos_compromissos_dos_apensos'));
		validarDataTable($('#tabela_todos_andamentos_dos_apensos'));		
		validarDataTable($('#tabela_todos_compromissos_dos_recursos'));
		validarDataTable($('#tabela_todos_andamentos_dos_recursos'));	
		validarDataTable($('#tabela_compromissos_do_recurso'));
		validarDataTable($('#tabela_compromissos_do_apenso'));
		validarDataTable($('#tabela_andamentos_do_apenso'));
		validarDataTable($('#tabela_andamentos_do_recurso'));
		validarDataTable($('#tabela_interna_cliente'));
		validarDataTable($('#tabela_interna_adverso'));
		validarDataTable($('#tabela_interna_contato'));
		validarDataTableNoSort($('#tabela_interna_processo'));
		validarDataTable($('#tabela_interna_notificacoes'));
		validarDataTable($('#tabela_interna_usuario'));

		

		
		

		

		// if($('.tabela_filtrada').length>0){
		// 	/*Já existe a tabela então não há necessidade de criá-la(senão dá problema)*/
		// 	if($.fn.dataTable.isDataTable('.tabela_filtrada')){
		// 	}else{
		// 		filtrarTabelaDataTablePt('.tabela_filtrada');	
		// 	}
		// }
		
	});

	$(document).ajaxError(function () {
		// AddErrorAjax();
	});
	$(document).ajaxSuccess(function () {
		$('.error_ajax').fadeOut();
		$('.datepicker').datepicker({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 190, // Creates a dropdown of 15 years to control year,
    i18n: {
    	months:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    	monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    	weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
    	weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    	weekdaysAbbrev: ['D','S','T','Q','Q','S','S'],
    	cancel:'Cancelar',
    	clear:'Limpar',
    	done:'Pronto'
    },    
    today: 'Hoje',
    clear: 'Limpar',
    close: 'Pronto',
    labelMonthNext: 'Próximo mês',
    labelMonthPrev: 'Mês anterior',
    labelMonthSelect: 'Selecione um mês',
    labelYearSelect: 'Selecione um ano',
    format: 'dd/mm/yyyy',
    autoClose: true, // Close upon selecting a date,
    defaultTime: 'now'
});
		$('.datepicker_container_input').datepicker({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 190, // Creates a dropdown of 15 years to control year,
    i18n: {
    	months:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    	monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    	weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
    	weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    	weekdaysAbbrev: ['D','S','T','Q','Q','S','S'],
    	cancel:'Cancelar',
    	clear:'Limpar',
    	done:'Pronto'
    },    
    today: 'Hoje',
    clear: 'Limpar',
    close: 'Pronto',
    labelMonthNext: 'Próximo mês',
    labelMonthPrev: 'Mês anterior',
    labelMonthSelect: 'Selecione um mês',
    labelYearSelect: 'Selecione um ano',
    format: 'dd/mm/yyyy',
    autoClose: true, // Close upon selecting a date,
    defaultTime: 'now',
    onSelect:function(data_entregada){
    	let mes = (1 + data_entregada.getMonth()).toString().padStart(2, '0');
    	var valorData = data_entregada.getDate()+'/' + mes + '/' + data_entregada.getFullYear();
    	$('#data_final_compromisso').val(valorData);
    }
});

		$('.timepicker').timepicker({
    defaultTime: 'now', // Set default time: 'now', '1:30AM', '16:30'
    twelveHour: false, // Use AM/PM or 24-hour format
    fromNow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    i18n:{
    	cancel:'Cancelar',
    	clear:'Limpar',
    	done:'Pronto'
    },
    autoClose: true, // automatic close timepicker

});

		var imagem_usuario_perfil = $('#imagem-usuario-config');

		if(typeof imagem_usuario_perfil != undefined){

			console.log('iiiiiiiiiiiiiiiiii imagem_usuario_perfil iiiiiiiiiiiiiiiii');
			console.log(imagem_usuario_perfil);
			console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');

			$(imagem_usuario_perfil).cropper({
				aspectRatio: 1 / 1
			});
		}


	});

	if($('.tabela_filtrada').length>0){
		filtrarTabelaDataTablePt('.tabela_filtrada');
	}

	if($('#tabela_todos_clientes').length>0){
		filtrarTabelaDataTablePt('#tabela_todos_clientes');
	}

	// if($('#tabela_interna_cliente').length>0){
	// 	filtrarTabelaDataTablePt('#tabela_interna_cliente');
	// }
	
	$(document).on('click', '.modal-remover-mount', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var texto = $(this).data('texto');
		var id = $(this).data('id');
		var to = $(this).data('to');
		var back = $(this).data('back');

		$(modal).modal('open');
		$(modal).find('#texto').text(texto);
		$(modal).find('#id').val(id);
		$(modal).find('button').data('href', to).data('action', back);
	});

	$(document).on('click', '.modal-remover-mount-reload', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var texto = $(this).data('texto');
		var id = $(this).data('id');
		var to = $(this).data('to');
		var container = $(this).data('container')

		$(modal).modal('open');
		$(modal).find('#texto').text(texto);
		$(modal).find('#id').val(id);
		$(modal).find('button').data('href', to).data('container', container);
	});



	$(document).on('click', '.modal-mount', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var link = $(this).data('link');
		MountModal(modal, link);
		console.log('aqui');
	});


	$(document).on('click', '.modal-mount-anchor-id', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var link = $(this).data('link');
		var anchor_id = $(this).data('anchor-id');
		var anchor_desc = $(this).data('anchor-descricao');
		console.log(anchor_id);
		console.log(anchor_desc);
		var ancoras = {anchorId:anchor_id,anchorDesc:anchor_desc};
		MountModalAnchor(modal, link,ancoras);
	});

	$(document).on('click', '.modal-mount-anchor-id-reload', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var link = $(this).data('link');
		var anchor_id = $(this).data('anchorid');
		var anchor_desc = $(this).data('anchordesc');
		console.log(anchor_id);
		console.log(anchor_desc);
		var ancoras = {anchorId:anchor_id,anchorDesc:anchor_desc};
		MountModalAnchorFocus(modal, link,ancoras);
	});


	$(document).on('click', '.modal-mount-create', function (e) {
		e.preventDefault();
		var modal = $(this).data('modal');
		var link = $(this).data('link');
		console.log('mmmmmmmmm modal create mmmmmmmm');
		console.log(modal);
		console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');

		MountModal(modal, link);
	});



	$(document).on('click', '.modal-mount-anchor-id-adverso', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var link = $(this).data('link');
		var anchor_id = $(this).data('anchor-id');
		var anchor_desc = $(this).data('anchor-descricao');
		var anchor_tipo = $(this).data('anchor-tipo');
		var anchor_cpf = $(this).data('anchor-cpf');
		var anchor_telefone = $(this).data('anchor-telefone');
		var anchor_email = $(this).data('anchor-email');
		var anchor_contato = $(this).data('anchor-contato');
		var anchor_advogado= $(this).data('anchor-advogado');
		var anchor_cep = $(this).data('anchor-cep');
		var anchor_rua = $(this).data('anchor-rua');
		var anchor_bairro = $(this).data('anchor-bairro');
		var anchor_numerocasa = $(this).data('anchor-numerocasa');
		var anchor_cidade = $(this).data('anchor-cidade');
		var anchor_estado = $(this).data('anchor-estado');

		var ancoras = {anchorId:anchor_id, anchorDesc:anchor_desc, anchorTipo:anchor_tipo, anchorCpf:anchor_cpf, anchorTelefone:anchor_telefone, anchorEmail:anchor_email, anchorContato:anchor_contato, anchorAdvogado:anchor_advogado, anchorCep:anchor_cep, anchorRua:anchor_rua, anchorBairro:anchor_bairro, anchorNumeroCasa: anchor_numerocasa, anchorCidade:anchor_cidade, anchorEstado:anchor_estado};
		MountModalAnchor(modal, link,ancoras);
	});


	$(document).on('click', '.modal-mount-anchor-advogado-setor-compromisso', function (e) {
		e.preventDefault();
		console.log('ESTOU SENDO CLICADO NO MODAL-MOUNT');
		var modal = $(this).data('modal');
		var link = $(this).data('link');
		var anchor_id = $(this).data('anchor-id');
		var anchor_desc = $(this).data('anchor-descricao');
		var anchor_advogado_compromisso = $(this).data('anchor-advogado-compromisso');
		var anchor_id_advogado_compromisso = $(this).data('anchor-id-advogado-compromisso');

		var ancoras = {anchorId:anchor_id, anchorDesc:anchor_desc, anchorAdvogadoCompromisso:anchor_advogado_compromisso, anchorIdAdvogadoCompromisso:anchor_id_advogado_compromisso};
		MountModalAnchor(modal, link,ancoras);
	});

	$(document).on('click', '.gerar-relatorio', function(e) {
		e.preventDefault();
		var nomeProvisorio = $(this).data('nome-provisorio');
		var container_relatorio = $(this).data('container-relatorio');
		autoTablePdf(container_relatorio,nomeProvisorio);
		//autoTablePdf2(container_relatorio,nomeProvisorio);
	});


	// $(document).on('click', '.gerar-relatorio', function(e) {
	// 	e.preventDefault();
	// 	var nomeProvisorio = $(this).data('nome-provisorio');
	// 	var container_relatorio = $(this).data('container-relatorio');
	// 	demoFromHTML(container_relatorio)
	// 	//autoTablePdf2(container_relatorio,nomeProvisorio);
	// });

	$(document).on('click', '.gerar-relatorio-no-header', function(e) {
		e.preventDefault();
		var nomeProvisorio = $(this).data('nome-provisorio');
		var container_relatorio = $(this).data('container-relatorio');
		autoTablePdfnoHeader(container_relatorio,nomeProvisorio);
		//autoTablePdf2(container_relatorio,nomeProvisorio);
	});

	$(document).on('click', '.crop-image-servidor', function(e) {
		e.preventDefault();

		var cropper = $('#imagem-usuario-config').data('cropper');
		console.log('croppper');
		console.log(cropper);
		var back = $(this).data('action');
		console.log(back);

		cropper.getCroppedCanvas().toBlob((blob) => {
			var formData = new FormData();
			formData.append('arquivo', blob);
			console.log(formData);

			$.ajax({
				url: '/sistema/configuracoes/cropImagemPerfil',
				type: 'POST',
				data: formData,
				dataType: 'json',
				processData: false,
				contentType: false,
				beforeSend: function(request) {
					request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
					adicionarLoader();
				},
				success: function (data) {
					console.log('---------- sucesso cropp -----------------');
					console.log(data);
					console.log(typeof data != undefined);
					console.log(data > 0);

					if (typeof data != undefined) {
						M.toast({html:'<div class="center-align" style="width:100%;">Imagem Alterada com sucesso</div>', 
							displayLength:5000, classes:'green rounded'});
					}
					console.log(back);

					if (typeof back != 'undefined' && back != 'add_name') {
						console.log('estou caindo no goTo do :D');
						GoTo(back, true);
					}
				},
				error: function (xhr, e, t) {
					console.debug((xhr.responseText));
				},
				complete: function() {
					removerLoader();
				}
			});
		});

	});

	$(document).on('change', '#numero_processo_npadrao', function(e) {
		const numero_processo = $('#numero_processo');
		const numero_processo_cliente = $('#numero_processo_cliente');
		if($(this).prop('checked')){
			numero_processo.unmask();
			numero_processo.removeClass('numero_processo');
			numero_processo_cliente.unmask();
			numero_processo_cliente.removeClass('numero_processo');

		}else{
			numero_processo.addClass('numero_processo');
			numero_processo_cliente.addClass('numero_processo');
		}

	});



	$(document).on('click', '.ajax-load', function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		console.log(link);
		GoTo(link, true);		
	});

	/*usada para as tarefas*/
	$(document).on('click', '.ajax-load-open-collapsible', function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		var id_collapsible = $(this).data('id');
		console.log(link);
		GoToOpenCollapsible(link, true,id);		
	});

	$(document).on('click', '.ajax-load-to', function(e) {
		e.preventDefault();
		var link = $(this).data('href');
		var to = $(this).data('to');
		LoadTo(link, to);
	});
	$(document).on('click', '.ajax-add-to', function(e) {
		e.preventDefault();
		var link = $(this).data('href');
		var to = $(this).data('to');
		AddTo(link, to);
	});

	$(document).on('click', '.remove', function (e) {
		e.preventDefault();
		$(this).closest('.pai').remove();
	});
	$(document).on('click', '.remove_lista', function (e) {
		e.preventDefault();
		AddInputDel($(this));
	});

	$(document).on('click', '.folder', function (e) {
		e.preventDefault();
		if($(this).parent().hasClass('active')){
			console.log('estou dentro do folder.active!!!!!!!!!!!');
			$(this).find('i:first-child:not(.fa-times)').toggleClass('fa-folder fa-folder-open');
			$(this).find('i:last-child').toggleClass('fa-caret-down fa-caret-up');
			console.log($(this).data('ajax'));
			if ($(this).data('ajax') == 1) {
				LoadArquivos($(this).data('id'), $(this));
			}
		}else{
			$(this).find('i:first-child:not(.fa-times)').toggleClass('fa-folder-open fa-folder');
			$(this).find('i:last-child').toggleClass('fa-caret-up fa-caret-down');
		}
	});
	// $(document).on('click', '.folder:not(.active)', function (e) {
		
	// });

	$(document).on('click', '.row_processo_interno', function () {
		/*Removido a classe selecionado independente de quem seja*/
		console.log('estou clicando na row!');
		console.log($('.tabela_loc_processos').find('.row_processo_interno.selecionado'));
		$('.row_processo_interno.selecionado').removeClass('selecionado');
		var id = $(this).find('.id_processo_interno').val();
		const numero_processo = $(this).find('.numero_processo').text();
		console.log(id);
		console.log(numero_processo);
		$(this).addClass('selecionado');
		// LoadMaisDetalhesProcesso(id);
		// loadAndamentos(id);
		$('#numero_more_details').html(numero_processo);
		loadEspecificoPagina('/sistema/processos/detalhes/'+id,$('#tab_container_mais_processo'))
		loadEspecificoPagina('/sistema/processos/andamentos/'+id,$('#tab_container_andamentos_processo'));
		loadEspecificoPagina('/sistema/processos/compromissos/'+id,$('#tab_container_compromissos_processo'));
	});

	$(document).on('click', '.ajax-submit', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back, method);
		}
	});


	$(document).on('click', '.ajax-submit-cadastrar-usuario', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		if (VerificarForm(form) == true) {
			SubmitAjaxCadastrarUsuario(post, link, back, method);
		}
	});




	$(document).on('click', '.alterar-senha-botao', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back, method);
		}
		// $('input[name="senha_atual"').val('');
		// $('#alterar_senha').val('');
		// $('#confirmar_alterar_senha').val('');
		$('.erro-alterar-senha').hide();

	});

	
	$(document).on('click', '.ajax-submit-no-back', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		console.log('no-back');
		var sucessMessage = $(this).data('mensagem-sucesso');
		console.log('sucess-color');
		console.log($(this).data('sucess-color'));
		var sucessClass = 'green rounded';
		if($(this).data('sucess-color') != null){
			sucessClass = $(this).data('sucess-color');
		}
		if (VerificarForm(form) == true) {
			console.log('está correto');
			SubmitAjaxNoBack(post, link, method,sucessMessage,sucessClass);
		}
	});


	$(document).on('click', '.ajax-submit-reload-anchor-id', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var modal = $(this).data('modal');
		var anchor_id = $(this).data('anchorid');
		var anchor_desc = $(this).data('anchordesc');
		var ancoras = {anchorId:anchor_id,anchorDesc:anchor_desc};
		console.log('ajax-submit-reload-anchor-id');
		console.log(ancoras);


		if (VerificarForm(form) == true) {
			SubmitAjaxReloadMountAnchorId(post, link,modal,ancoras)
		}
	});


	$(document).on('click', '.ajax-submit-container-reload', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var container = $(this).data('container');
		console.log('container');
		console.log(container);
		var sucessMessage = $(this).data('mensagem-sucesso');
		console.log('sucess-color');
		console.log($(this).data('sucess-color'));
		var sucessClass = 'green rounded';
		if($(this).data('sucess-color') != null){
			sucessClass = $(this).data('sucess-color');
		}
		if (VerificarForm(form) == true) {
			console.log('está correto');
			SubmitAjaxContainerReload(post, link, container,sucessMessage,sucessClass);
		}
	});



	$(document).on('click', '.ajax-search', function(e) {
		e.preventDefault();
		var link = $(this).data('href');
		var pesquisaInput = $(this).data('search');
		console.log(pesquisaInput);
		console.log(link);
		var back = undefined;
		var valorPesquisa = $('#'+pesquisaInput).val();
		console.log('vvvvvvvvvvvvvvv valor da pesquisa vvvvvvvvvvvvvvvvvvvv');
		console.log(valorPesquisa);
		console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
		link = link + '/' + valorPesquisa;
		console.log('link--------');
		console.log(link);
		var containerFinal = "." + $(this).data('container');
		$(containerFinal).empty();
		console.log('container final');
		console.log(containerFinal);
		loadEspecificoPagina(link,$(containerFinal));
	});

	$(document).on('click', '.ajax-submit-no-form', function(e) {
		e.preventDefault();
		var link = $(this).data('href');
		var metodo = $(this).data('method');
		var idProcesso = $(this).data('id');
		var idCliente = $(this).data('id-cliente');
		var container = $(this).data('container');
		var sucessMessage = $(this).data('mensagem-sucesso');
		var sucessClass = 'green rounded';
		var post = {id_processo:idProcesso,id_cliente:idCliente};
		console.log(post);
		console.log('estou no cadastro sem form');
		
		SubmitAjaxContainerReload(post,link,container,sucessMessage,sucessClass);
	});



	$(document).on("click","input[name='id_posicao_cliente']",function(e){
		$('#input-group-cadastro-container').empty();
		$('.cadastro-processo-titulo').css('margin-top',0);
		$(this).closest('.valign-wrapper').removeClass('valign-wrapper');
		$('.radio_posicao_cliente_container').find('.m4').removeClass('m4').addClass('m3');
		$(this).closest('.m3').removeClass('m3').addClass('m4');
		$('.radio_posicao_cliente_container').find('.offset-m2').removeClass('offset-m2').addClass('offset-m1');


		var numeroProcesso = Math.floor((Math.random() * 90000) + 10000);
		var digito = Math.floor((Math.random() * 90) + 10);
		var ano = new Date().getFullYear();
		var digitojud = Math.floor((Math.random() * 9) + 1);
		var digitotr = Math.floor((Math.random() * 90) + 10);
		var zeroFinal = '0000';
		var numeroProcessoFinal = 'NA' + numeroProcesso +  digito +  ano +  digitojud + digitotr +  zeroFinal;

		console.log('NNNNNNNNNNNNNN NUMERO DO PROCESSO FINAL NNNNNNNNNNNNNNNN');
		console.log(numeroProcessoFinal);
		console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');

		if($(this).val() == '1' || $(this).val() == '2'){
			$('#input-group-cadastro-container').append("\
				<div class='input-field input-group-control-with-search col s12'>\
				<label for='nome_cliente' class='bordo-text'>Cliente</label>\
				<input disabled required='true' type='text' name='nome_cliente' id='nome_cliente'>\
				<a id='selecionar_cliente' class='btn bordo lighten-1 modal-mount-anchor-id' data-link='/clientes/selecionar-todos-modal' data-href='#modalinfo' data-anchor-id='#id_cliente' data-anchor-descricao='#nome_cliente'>\
				<i class='fa fa-search'></i>\
				</a>\
				<input type='hidden' name='id_cliente' id='id_cliente'>\
				</div>\
				<div class='input-field input-group-control-with-search col s12'>\
				<label for='nome_adverso' class='bordo-text'>Adverso</label>\
				<input disabled required='true' type='text' name='nome_adverso' id='nome_adverso'>\
				<a id='selecionar_adverso' class='btn bordo lighten-1 modal-mount-anchor-id' data-link='/adversos/selecionar-todos-modal' data-href='#modalinfo' data-anchor-id='#id_adverso' data-anchor-descricao='#nome_adverso' >\
				<i class='fa fa-search'></i>\
				</a>\
				<input type='hidden' name='id_adverso' id='id_adverso'>\
				</div>\
				<div class='input-field input-group-control col s12'>\
				<label for='numero' class='bordo-text'>Número do Processo</label>\
				<input required='true'  type='text' name='numero' id='numero_processo' class='numero_processo' value='"+numeroProcessoFinal+"'>\
				</div> \
				<div class='input-field input-group-control col s12'>\
				<label> \
				<input type='checkbox' id='numero_processo_npadrao'>\
				<span for='numero_processo_npadrao'>N° Fora do Padrão?</span>\
				</label>\
				</div>");
			/*tem que ter o .trigger para simular um input para o mask do numero_processo funcionar*/
			$('#numero_processo').val(numeroProcessoFinal).trigger('input');
		}
		else if($(this).val() == '3'){
			$('#input-group-cadastro-container').append("\
				<div class='input-field input-group-control-with-search col s12'>\
				<label for='nome_cliente' class='bordo-text'>Autor</label>\
				<input disabled required='true' type='text' name='nome_cliente' id='nome_cliente'>\
				<a id='selecionar_reu' class='btn bordo lighten-1 modal-mount-anchor-id' data-link='/clientes/selecionar-todos-modal' data-href='#modalinfo' data-anchor-id='#id_cliente' data-anchor-descricao='#nome_cliente'>\
				<i class='fa fa-search'></i>\
				</a>\
				<input type='hidden' name='id_cliente' id='id_cliente'>\
				</div>\
				<div class='input-field input-group-control-with-search col s12'>\
				<label for='nome_adverso' class='bordo-text'>Réu</label>\
				<input disabled required='true' type='text' name='nome_adverso' id='nome_adverso'>\
				<a id='selecionar_adverso' class='btn bordo lighten-1 modal-mount-anchor-id' data-link='/adversos/selecionar-todos-modal' data-href='#modalinfo' data-anchor-id='#id_adverso' data-anchor-descricao='#nome_adverso' >\
				<i class='fa fa-search'></i>\
				</a>\
				<input type='hidden' name='id_adverso' id='id_adverso'>\
				</div>\
				<div class='input-field input-group-control col s12'>\
				<label for='numero' class='bordo-text'>Número do Processo</label>\
				<input required='true' type='text' name='numero' id='numero_processo' value='"+numeroProcessoFinal+"'> \
				</div> \
				<div class='input-field input-group-control col s12'>\
				<label> \
				<input type='checkbox' id='numero_processo_npadrao'>\
				<span for='numero_processo_npadrao'>N° Fora do Padrão?</span>\
				</label>\
				</div>");
			/*tem que ter o .trigger para simular um input para o mask do numero_processo funcionar*/
			$('#numero_processo').val(numeroProcessoFinal).trigger('input');
		}
	});

$(document).on("click","input[name='id_posicao_cadastro_cliente']",function(e){
	$('.radio_posicao_cliente_container').find('.m4').removeClass('m4').addClass('m3');		
	$(this).closest('.m3').removeClass('m3').addClass('m4');
	$('.radio_posicao_cliente_container').find('.offset-m2').removeClass('offset-m2').addClass('offset-m1');
	$('.radio_posicao_cliente_container').find('.white').removeClass('white').addClass('bordo');
	$('.radio_posicao_cliente_container').find('.center').removeClass('bordo-text');

	$(this).parent().parent().removeClass('bordo').addClass('white');
	$(this).parent().next('.center').addClass('bordo-text');
});


$(document).on('click','.load_especifico_to_container',function(e){
	e.preventDefault();
	var containerFinal = "." + $(this).data('container');
	console.log($(this).data('idload'));
	console.log($(containerFinal).data('idload'));
	var id_load = $(this).data('idload');
	var id_container = $(containerFinal).data('idload');
	if(id_container == id_load){
		$(containerFinal).empty();
		$(containerFinal).removeData('idload');
	}else{
		console.log('cai no else');
		$(containerFinal).empty();
		$(containerFinal).data('idload',id_load);
		var link = $(this).data('link');
		loadEspecificoPagina(link,$(containerFinal));
	}
});


$(document).on('change','.load_especifico_to_container_andamento_financeiro',function(e){
	e.preventDefault();
	var containerFinal = "." + $(this).data('container');
	console.log($(this).data('idload'));
	console.log($(containerFinal).data('idload'));
	var id_load = $(this).data('idload');
	var id_container = $(containerFinal).data('idload');

	console.log('LENGTH ------');
	console.log($('.container_botao_parcelas_existente').length);
	console.log('-------------');

	//se o container não existir quer dizer que os dados para o cálculo não foi
	//cadastrado
	if($('.container_botao_parcelas_existente').length == 0 && $(this).val() == 2){

		if(id_container == id_load){
			$(containerFinal).empty();
			$(containerFinal).removeData('idload');
		}else{
			console.log('cai no else');
			$(containerFinal).empty();
			$(containerFinal).data('idload',id_load);
			var link = $(this).data('link');
			loadEspecificoPagina(link,$(containerFinal));
		}
	}

});



	// $(document).on('click','.abrir_pessoas_cliente',function(e){
	// 	$('.partes_container_criacao').empty();
	// 	var id = $('body').find('#id_processo').val();
	// 	loadEspecificoPagina('/sistema/clientes/outros_envolvidos/'+id,$('.partes_container_criacao'));
	// });

	$(document).on('click','.abrir_compromissos_criacao',function(e){
		$('.compromissos_container_criacao').empty();
		var link = $(this).data('link');
		console.log(link);
		loadEspecificoPagina(link,$('.compromissos_container_criacao'));
	});


	$(document).on('click','.abrir_andamento',function(e){
		$('.andamentos_container_criacao').empty();
		$('.andamentos_container_criacao').append("\
			<div class='col s12 valign-wrapper'>\
			<div class='input-field input-group-control col s12 m4'>\
			<label for='andamento_data'>Data</label>\
			<input class='data_sem_hora data_hoje' type='text' name='andamento_data'>\
			</div>\
			<div class='input-field input-group-control col s12 m4'>\
			<label for='andamento_descricao'>Descricao</label>\
			<textarea name='andamento_descricao'></textarea>\
			</div>\
			<div class='col s12 m4'>\
			<button data-href='/sistema/processos/andamentos_cadastrar' class='btn waves-effect waves-light bordo ajax-submit-no-back' data-mensagem-sucesso='Andamento Cadastrado!''>Salvar</button>\
			</div>\
			\
			</div>\
			");

	});




	$(document).on('keyup','#numero_processo', function(e){
		e.preventDefault();
		if($(this).val() != '' && $('#id_adverso').val() !='' && $('#id_cliente').val() !=''){
			$('.cadastro-button-group').find('#btn_cadastrar_processo').removeClass('disabled');
		}
		else{
			$('.cadastro-button-group').find('#btn_cadastrar_processo').addClass('disabled');
		}
	});

	$(document).on('click', '.ajax-submit-comentarios', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		if (VerificarForm(form) == true) {
			SubmitComentario(post, link, back, method);
		}
	});


	$(document).on('change', 'select[name="tipo_compromisso"]', function (e) {
		changeTipoCompromissoPorCategoriaCompromisso($(this),$('#select_tipo_compromisso'),'tipo');
	});

	$(document).on('change', 'select[name="tipo_compromisso_apenso"]', function (e) {
		changeTipoCompromissoPorCategoriaCompromisso($(this),$('#select_tipo_compromisso_apenso'),'tipo_apenso');
	});

	$(document).on('change', 'select[name="tipo_compromisso_recurso"]', function (e) {
		changeTipoCompromissoPorCategoriaCompromisso($(this),$('#select_tipo_compromisso_recurso'),'tipo_recurso');
	});


	$(document).on('change', '#cargo_usuario', function (e) {
		console.log('change do cargo usuario');
		console.log($(this).val());
		console.log($('.container_campo_extra_usuario'));
		if($(this).val() == 1){
			$('.container_campo_extra_usuario').append('<label>Oab</label>\
				<input class="validate" type="text" name="oab">');
		}else{
			$('.container_campo_extra_usuario').empty();
		}
	});


	$(document).on('change', 'select[name="id_doc_pai"]', function (e) {
		console.log($(this).val());
		if($(this).val() == 'Criar nova') {
			e.preventDefault();
			var modal = '#modalinfo2';
			var link = '/documentos/adicionar/pasta';
			MountModal(modal, link);
		}
	});
	$(document).on('change', '.grupo', function (e) {
		console.log($(this).val());
		if($(this).val() == 'Criar Novo') {
			e.preventDefault();
			var modal = '#modalinfo2';
			var link = '/clientes/criar/grupo';
			MountModal(modal, link);
		}
	});
	$(document).on('change', 'input[type="file"]:not(#upload_imagem_perfil)', function () {
		console.log('change do input[type=file]');
		if($(this).val() != '') {
			UploadFile($(this));
		}
	});

	$(document).on('change', '#upload_imagem_perfil', function () {
		console.log('estou alterando o upload_imagem_perfil');
		console.log($(this).val());
		console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQ');

		if($(this).val() != '') {
			UploadImagemPerfil($(this));
		}


	});

	$(document).on('submit', 'form', function(e) {
		e.preventDefault();
	});

	$(document).on('change', '.cep', function () {
		GetEndereco($(this).val(), $(this).closest('.row'));
	});

	$(".sidenav").sidenav({closeOnClick: true});

	window.onpopstate = function() {
		GoTo(location.pathname, false);
	};

	// ESPECIFICO

	$(document).on('keyup change', '.pesquisa', function () {
		Pesquisar($(this),$(this).data('container'));
	});

	$(document).on('keyup change', '.pesquisa-remove-empty', function () {
		console.log('value:' + $(this).val());
		if($(this).val().length == 0 ){
			var elemento = $(this).data('removempty');
			console.log('elemento:' +elemento);
			$(elemento).val('');
			/*faço o trigger para simular um change serve para a voltar a tabela original*/
			$(elemento).trigger('change');
		}else{
			Pesquisar($(this),$(this).data('container'));
		}
	});

	$(document).on('change paste keyup','.pesquisa-input',function(){
		Pesquisar($(this),$(this).data('container'));
	});
	$(document).on('click', '.DesbloquearSenha', function () {
		$(this).find('i').removeClass('fa-lock').addClass('fa-unlock-alt');
		DesbloquearSenha($(this).data('id'), $(this).data('senha'));
	});
	$(document).on('click', '.TarefaLoad', function () {
		LoadTopicos($(this).data('id'), $(this));
	});
	$(document).on('click', '.ContatosLoad', function () {
		LoadContatos($(this).data('id'));
	});
	$(document).on('click', '.TarefasLoad', function () {
		LoadTarefas($(this).data('id'), $(this));
	});
	$(document).on('click', '.IniciarTarefa', function () {
		var elemento = $(this).find('i');
		if (elemento.hasClass('fa-play-circle-o')) {
			if ($('.fa-pause-circle-o.brown:not(.notme)').length > 0) {
				PausarTarefa($('.fa-pause-circle-o.brown:not(.notme)').parent().data('id_tarefa'));
				setTimeout(function(){ FIniciarTarefa($(this).data('id_tarefa'), elemento, $(this).data('tempo')); }, 500);
			} else {
				FIniciarTarefa($(this).data('id_tarefa'), elemento, $(this).data('tempo'));
			}
		} else {
			PausarTarefa($(this).data('id_tarefa'));
			elemento.removeClass('fa-pause-circle-o brown').addClass('fa-play-circle-o blue');
		}
	});

	$(document).on('click', '.selecionar-item-modal',function(e){
		e.preventDefault();
		var id = $(this).data('id');
		var descricao = $(this).data('descricao');
		var anchorId = $(this).data('anchorid');
		var anchorDescricao = $(this).data('anchordesc');

		console.log(anchorId);
		console.log(anchorDescricao);

		if($('main').find(anchorId).length>0){
			$('main').find(anchorId).val(id);
			/*faço o trigger para simular um change serve para a pesquisa de cruzamento funcionar*/
			$('main').find(anchorDescricao).val(descricao);
			$('main').find(anchorId).trigger('change');
		}else{
			$('#modalinfo').find(anchorId).val(id);
			$('#modalinfo').find(anchorDescricao).val(descricao);
			$('#modalinfo').find(anchorId).trigger('change');
		}

		/*Testo para saber se estou na tela de cadastro de novo processo e se o primeiro input
		já tiver preenchido eu removo o botão disabled */
		if($('#input-group-cadastro-container').length>0){
			if($('#nome_cliente').val() != '' && $('#nome_adverso').val() != '' && $('#numero_processo').val() != ''){
				$('.cadastro-button-group').find('#btn_cadastrar_processo').removeClass('disabled');
			}else{
				$('.cadastro-button-group').find('#btn_cadastrar_processo').addClass('disabled');
			}
		}
		$(this).closest('.modal').modal('close');
		$(anchorId).focus();

	});

	$(document).on('click', '.selecionar-todos-dados-adverso',function(e){
		e.preventDefault();
		var id = $(this).data('id');
		var descricao = $(this).data('descricao');
		var tipo_pessoa = $(this).data('tipo_pessoa');
		var cpf_cnpj = $(this).data('cpf_cnpj');
		var telefone = $(this).data('telefone');
		var email = $(this).data('email');
		var contato = $(this).data('contato');
		var advogado = $(this).data('advogado');
		var cep = $(this).data('cep');
		var rua = $(this).data('rua');
		var bairro = $(this).data('bairro');
		var numero_casa = $(this).data('numerocasa');
		var cidade = $(this).data('cidade');
		var estado = $(this).data('estado');

		var anchorId = $(this).data('anchorid');
		var anchorDescricao = $(this).data('anchordesc');
		var anchorTipo = $(this).data('anchortipo');
		var anchorCpf = $(this).data('anchorcpf');
		var anchorTel = $(this).data('anchortelefone');
		var anchorEmail = $(this).data('anchoremail');
		var anchorContato = $(this).data('anchorcontato');
		var anchorAdvogado = $(this).data('anchoradvogado');
		var anchorCep = $(this).data('anchorcep');
		var anchorRua = $(this).data('anchorrua');
		var anchorBairro = $(this).data('anchorbairro');
		var anchorNumeroCasa = $(this).data('anchornumerocasa');
		var anchorCidade = $(this).data('anchorcidade');
		var anchorEstado = $(this).data('anchorestado');

		$('main').find(anchorId).val(id);
		$('main').find(anchorDescricao).val(descricao);
		$('main').find(anchorTipo).val(tipo_pessoa);
		$('main').find(anchorCpf).val(cpf_cnpj);
		$('main').find(anchorTel).val(telefone);
		$('main').find(anchorEmail).val(email);
		$('main').find(anchorContato).val(contato);
		$('main').find(anchorAdvogado).val(advogado);
		$('main').find(anchorCep).val(cep);
		$('main').find(anchorRua).val(rua);
		$('main').find(anchorBairro).val(bairro);
		$('main').find(anchorNumeroCasa).val(numero_casa);
		$('main').find(anchorCidade).val(cidade);
		$('main').find(anchorEstado).val(estado);

		$('#modalinfo').modal('close');
	});


	$(document).on('click', '.selecionar-advogados-setor-compromisso',function(e){
		e.preventDefault();
		var id = $(this).data('id');
		var descricao = $(this).data('descricao');



		var anchorId = $(this).data('anchorid');
		var anchorDescricao = $(this).data('anchordesc');
		var anchorAdvogadoCompromisso = $(this).data('anchoradvogadocompromisso');
		var anchorIdAdvogadoCompromisso = $(this).data('anchoridadvogadocompromisso');



		console.log(anchorId);
		console.log(anchorDescricao);

		$('main').find(anchorId).val(id);
		$('main').find(anchorDescricao).val(descricao);
		$('main').find(anchorIdAdvogadoCompromisso).val(id);
		$('main').find(anchorAdvogadoCompromisso).val(descricao);



		$(this).closest('.modal').modal('close');

	});

	$(document).on('click', '.notificacao_ver', function (e) {
		e.preventDefault();
		console.log('NNNNNNNNNNNNNN NOTIFICACAO VER NNNNNNNNNNNNNNNNNNNNNNNNN');
		console.log($(this).data('id'));
		console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');
		RemoverVistoNotificacao($(this).data('id'));
	});


	$(document).on('click', 'a .remove-doc', function (e) {
		e.preventDefault();
		console.log($(this).data('id'));
		// LoadTopicos($(this).data('id'), $(this));
	});
	$(document).on('click', '.AprovarTopico', function () {
		MudaStatusTopico($(this).data('id'), '1', $(this));
	});
	$(document).on('click', '.DesaprovarTopico', function () {
		MudaStatusTopico($(this).data('id'), '0', $(this));
	});
	$(document).on('change', '.timepicker', function () {
		$(this).focus();
	});

	$(document).on('click', '.arquivo-escolha', function(e) {
		e.preventDefault();
		var nome = $(this).data('nome');
		$('.uploads').append('\
			<div class="col s12 m6 center-align relative pai">\
			<div class="card-panel grey lighten-4">\
			<input type="hidden" name="tarefa_arquivo[arquivo][]" value="'+nome+'">\
			<button class="btn-floating btn waves-effect waves-light red close-button remove"><i class="fa fa-times" aria-hidden="true"></i></button>\
			<b>Arquivo: '+nome+' <br>\
			</div>\
			</div>\
			');
		$('.modal').modal('close');
	});





	$(document).on('click','#notificacoes',function(e){
		e.stopPropagation();
		$('.notificacao-content').toggleClass('hide');
		$('.notificacoes-numero').toggleClass('hide');

		if(!($('.user-dropdown-content').hasClass('hide'))){
			$('.user-dropdown-content').addClass('hide');
			$('.user-dropdown i').addClass('fa-angle-down');
			$('.user-dropdown i').removeClass('fa-angle-up');
		}

	});


	$(document).on('click','.user-dropdown',function(e){
		e.stopPropagation();
		if($('.user-dropdown-content').hasClass('hide')){
			$('.user-dropdown-content').removeClass('hide');
			$('.user-dropdown i').removeClass('fa-angle-down');
			$('.user-dropdown i').addClass('fa-angle-up');
		}else{
			$('.user-dropdown-content').addClass('hide');
			$('.user-dropdown i').addClass('fa-angle-down');
			$('.user-dropdown i').removeClass('fa-angle-up');
		}

		if(!($('.notificacao-content').hasClass('hide'))){
			$('.notificacoes-numero').removeClass('hide');
			$('.notificacao-content').addClass('hide');
		}

	});

	$(document).on('click','.close_container_load',function(e){
		e.preventDefault();
		console.log('pppppppppppppppp parent ppppppppppppppppppppppppppppppppp');
		console.log($(this).parent().parent());
		console.log('ppppppppppppppppppppppppppppppppppppppppppppppppppppppppp');
		console.log($(this).parent().parent().data('idload'));
		$(this).parent().parent().empty();
		$(this).parent().parent().removeData('idload');

	});





	$(document).click(function(e){
		if(!($('.notificacao-content').hasClass('hide'))){
			$('.notificacao-content').addClass('hide');
			$('.notificacoes-numero').removeClass('hide');
		}

		if(!($('.user-dropdown-content').hasClass('hide'))){
			$('.user-dropdown-content').addClass('hide');
			$('.user-dropdown i').addClass('fa-angle-down');
			$('.user-dropdown i').removeClass('fa-angle-up');
		}
	});

	$(document).on('click', '.chats li', function () {
		$('.chats').removeClass('active');
		$(this).parent().css('right', '-83%');
		setTimeout(function(){ $('.chats').addClass('active'); }, 1000);
	});
	$(document).on('mouseover', '.chats.active li', function () {
		$(this).parent().css('right', '-20%');
	});
	$(document).on('mouseout', '.chats.active li', function () {
		$(this).parent().css('right', '-83%');
	});
	$(document).on('click', '.load-mensagens', function() {
		MensagensChat($(this).data('id'));
	});
	$(document).on('click', '.load-mensagens-grupo', function() {
		MensagensChatGrupo($(this).data('id_chat_grupo'));
	});
	$(document).on('click', '#enviar-msg', function() {
		EnviarMensagem($(this).data('id'));
	});

	$(document).on('click', '#enviar-msg-grupo', function() {
		EnviarMensagemGrupo($(this).data('id_grupo_chat'));
	});


	$(document).keypress(function(e) {
		if(e.which == 13 && $("#mensagem-texto").is(":focus")) {
			EnviarMensagem($('#enviar-msg').data('id'));
		}
		if(e.which == 13 && $("#mensagem-texto-grupo").is(":focus")) {
			EnviarMensagemGrupo($('#enviar-msg-grupo').data('id_grupo_chat'));
		}
	});
});
// Eventos Após DOM
$(window).on('load', function (e) {
	removerLoader();
	FormatInputs();
});



// Funções
function adicionarLoader() {
	$('body').css('overflow', 'hidden');
	$('.loader').fadeIn('fast');
}
function removerLoader() {
	$('body').css('overflow', 'auto');
	$('.loader').fadeOut('fast');
}
function InitBar() {
	if (localStorage.bar != 2 && localStorage.bar != 1) {
		localStorage.setItem("bar", 1);
	}
}
function GoTo(link, state) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			console.log('setando');
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('main').html(data);
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    	$('.material-tooltip').remove();
    	$('.tooltipped').tooltip({delay: 50});
    	$('.modal').modal('close');
    	$('#search_header').val('');
    	$("html, body").animate({ scrollTop: 0 }, "slow");
    	ActiveMaterializeInput();
    	FormatInputs();
    }
});
	if (state == true) {
		window.history.pushState('Sistema Quorp', 'Sistema Quorp', link);
	}
}

function GoToOpenCollapsible(link, state,id) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			console.log('setando');
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			console.log('LINK');
			console.log(link);
			console.log('state');
			console.log(state);
			console.log('id')
			console.log(id);
			$('main').html(data);
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    	$('.material-tooltip').remove();
    	$('.tooltipped').tooltip({delay: 50});
    	$('.modal').modal('close');
    	$("html, body").animate({ scrollTop: 0 }, "slow");
    	FormatInputs();
    }
});
	if (state == true) {
		window.history.pushState('Sistema Quorp', 'Sistema Quorp', link);
	}
}




function LoadTo(link, to) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('.'+to).html(data);
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    	$('.material-tooltip').remove();
    	$('.tooltipped').tooltip({delay: 50});
    	$('.modal').modal('close');
    	FormatInputs();
    }
});
}
function AddTo(link, to) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('.'+to).append(data);
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    	$('.material-tooltip').remove();
    	$('.tooltipped').tooltip({delay: 50});
    	$('.modal').modal('close');
    	FormatInputs();
    }
});
}
function RemoverVistoNotificacao(id) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema/notificacoes/remover_visto/'+id,
		beforeSend: function(request) {
			console.log('----------------URL------------------');
			console.log('/sistema/notificacoes/remover_visto/'+id);
			console.log('--------------------------------------');
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
		},
		success: function(data) {
			
		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
		}
	});
}

function allAutoCompletes(){
	autoCompleteId('#desc_tipo_causa','/sistema/processos/pesquisar-todos-tipo-causa-autocomplete/','#id_tipo_causa');
	autoCompleteId('#desc_assunto','/sistema/processos/pesquisar-todos-assunto-autocomplete/','#id_assunto');
	autoCompleteId('#desc_comarca','/sistema/processos/pesquisar-todos-comarca-autocomplete/','#id_comarca');
	autoCompleteId('#desc_tipo_acao_rito','/sistema/processos/pesquisar-todos-tipo-acao-rito-autocomplete/','#id_tipo_acao_rito');
	autoCompleteId('#desc_vara','/sistema/processos/pesquisar-todos-vara-autocomplete/','#id_vara');
	autoCompleteId('#desc_categoria','/sistema/processos/pesquisar-todos-categoria-autocomplete/','#id_categoria');
	autoCompleteId('#desc_fase','/sistema/processos/pesquisar-todos-fase-autocomplete/','#id_fase');
	autoCompleteId('#desc_advogado','/sistema/processos/pesquisar-todos-advogados-autocomplete/','#id_advogado');
	autoCompleteId('#desc_cliente','/sistema/processos/pesquisar-todos-clientes-autocomplete/','#id_cliente');
	autoCompleteId('#desc_categoria_cliente','/sistema/processos/pesquisar-todos-clientes-por-categoria-autocomplete/','#id_categoria_cliente');
	autoCompleteId('#desc_adverso','/sistema/processos/pesquisar-todos-adversos-autocomplete/','#id_adverso');
	autoCompleteId('#desc_advogado_setor','/sistema/processos/pesquisar-todos-advogados-autocomplete/','#id_advogado_setor');
	autoCompleteId('#desc_advogado_compromisso','/sistema/processos/pesquisar-todos-advogados-autocomplete/','#id_advogado_compromisso');
	autoCompleteId('#desc_tipo_causa_apenso','/sistema/processos/pesquisar-todos-tipo-causa-apenso-autocomplete/','#id_tipo_causa_apenso');
	autoCompleteId('#desc_posicao_apenso','/sistema/processos/pesquisar-todos-posicao-apenso-autocomplete/','#id_posicao_apenso');
	autoCompleteId('#desc_comarca_apenso','/sistema/processos/pesquisar-todos-comarca-autocomplete/','#id_comarca_apenso');
	autoCompleteId('#desc_vara_apenso','/sistema/processos/pesquisar-todos-vara-autocomplete/','#id_vara_apenso');
	autoCompleteId('#desc_foro_apenso','/sistema/processos/pesquisar-todos-foro-autocomplete/','#id_foro_apenso');
	autoCompleteId('#desc_situacao_apenso','/sistema/processos/pesquisar-todos-situacao-apenso-autocomplete/','#id_situacao_apenso');
	autoCompleteId('#desc_advogado_apenso','/sistema/processos/pesquisar-todos-advogados-autocomplete/','#id_advogado_apenso');
	autoCompleteId('#desc_advogado_recurso','/sistema/processos/pesquisar-todos-advogados-autocomplete/','#id_advogado_recurso');
	autoCompleteId('#desc_relator_recurso','/sistema/processos/pesquisar-todos-relator-recurso-autocomplete/','#id_relator_recurso');
	autoCompleteId('#desc_tipo_recurso','/sistema/processos/pesquisar-todos-tipo-recurso-autocomplete/','#id_tipo_recurso');
	autoCompleteId('#desc_posicao_cliente_recurso','/sistema/processos/pesquisar-todos-posicao-cliente-autocomplete/','#id_posicao_cliente_recurso');
	autoCompleteId('#desc_tribunal_recurso','/sistema/processos/pesquisar-todos-tribunal-recurso-autocomplete/','#id_tribunal_recurso');
	autoCompleteId('#desc_turma_camara_recurso','/sistema/processos/pesquisar-todos-turma-camara-recurso-autocomplete/','#id_turma_camara_recurso');
	autoCompleteId('#desc_banco','/sistema/processos/pesquisar-todos-bancos-autocomplete/','#id_banco');

}


function FormatInputs(focus) {
	$('.cnpj').mask('00.000.000/0000-00', {reverse: true});
	$('.cpf').mask('000.000.000-00', {reverse: true});
	$('.rg').mask('AAAAAAAAAAAAA', {reverse: true});
	$('.cep').mask('00000-000');
	$('.oab').mask('000.000');
	$('.tel').mask('(00) Z0000-0000', {
		translation: {
			'Z': {
				pattern: /[0-9]/, optional: true
			}
		}
	});
	// if(!($('#numero_processo_npadrao').prop('checked')) || typeof $('#numero_processo_npadrao') == undefined){
	// 	console.log('estou caindo aqui');

	// }
	$('.numero_processo').mask('AAAAAAA-00.0000.0.00.0000');
	$('.money').mask('000000000000000,00', {reverse: true});
	$('.data_sem_hora').mask('00/00/0000');
	$('.hora').mask('00:00');
	$('.data_e_hora').mask('00/00/0000 00:00:00');
	$('.time').mask('00:M0', {
		translation: {
			'M': {
				pattern: /[0-5]/
			}
		}
	});

	$('.dropdown-button').dropdown();
	$('.collapsible').collapsible();
	$('.datepicker').datepicker({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 190, // Creates a dropdown of 15 years to control year,
    i18n: {
    	months:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    	monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    	weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
    	weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    	weekdaysAbbrev: ['D','S','T','Q','Q','S','S'],
    	cancel:'Cancelar',
    	clear:'Limpar',
    	done:'Pronto'
    },    
    today: 'Hoje',
    clear: 'Limpar',
    close: 'Pronto',
    labelMonthNext: 'Próximo mês',
    labelMonthPrev: 'Mês anterior',
    labelMonthSelect: 'Selecione um mês',
    labelYearSelect: 'Selecione um ano',
    format: 'dd/mm/yyyy',
    autoClose: true, // Close upon selecting a date,
    defaultTime: 'now'
});

	$('.datepicker_container_input').datepicker({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 190, // Creates a dropdown of 15 years to control year,
    i18n: {
    	months:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    	monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    	weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
    	weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    	weekdaysAbbrev: ['D','S','T','Q','Q','S','S'],
    	cancel:'Cancelar',
    	clear:'Limpar',
    	done:'Pronto'
    },    
    today: 'Hoje',
    clear: 'Limpar',
    close: 'Pronto',
    labelMonthNext: 'Próximo mês',
    labelMonthPrev: 'Mês anterior',
    labelMonthSelect: 'Selecione um mês',
    labelYearSelect: 'Selecione um ano',
    format: 'dd/mm/yyyy',
    autoClose: true, // Close upon selecting a date,
    defaultTime: 'now',
    onSelect:function(data_entregada){
    	let mes = (1 + data_entregada.getMonth()).toString().padStart(2, '0');
    	var valorData = data_entregada.getDate()+'/' + mes + '/' + data_entregada.getFullYear();
    	$('#data_final_compromisso').val(valorData);
    } 
});




	$('.timepicker').timepicker({
    defaultTime: 'now', // Set default time: 'now', '1:30AM', '16:30'
    twelveHour: false, // Use AM/PM or 24-hour format
    fromNow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    i18n:{
    	cancel:'Cancelar',
    	clear:'Limpar',
    	done:'Pronto'
    },
    autoClose: true // automatic close timepicker

});
	/*Adicionar numero do processo para o input de numero de processos ao criar o cliente*/
	var numeroProcesso = Math.floor((Math.random() * 90000) + 10000);
	var digito = Math.floor((Math.random() * 90) + 10);
	var ano = new Date().getFullYear();
	var digitojud = Math.floor((Math.random() * 9) + 1);
	var digitotr = Math.floor((Math.random() * 90) + 10);
	var zeroFinal = '0000';
	var numeroProcessoFinal = 'NA' + numeroProcesso +  digito  + ano  + digitojud + digitotr +  zeroFinal;
	/*tem que ter o .trigger para simular um input para o mask do numero_processo funcionar*/
	$('#numero_processo_cliente').val(numeroProcessoFinal).trigger('input');
	/*Adicionar classe selecionado para o primeiro item da tabela de localizar processos*/
	$('.tabela_loc_processos tbody').children(':first').addClass('selecionado');
	/*Adicionar tamanho máximo para o pane onde fica a tabela, para sempre ter um overflow
	quando o usuario adicionar muitos processo, arrumar uma altura que fique bom*/
	$('.pane').css('max-height', 400);

	autoCompleteLoadEspecifico('#cpf_cnpj_adverso_pesquisa','/sistema/adversos/pesquisar-adverso-por-cpf-cnpj-autocomplete/','.container_adverso_load','/sistema/adversos/pesquisar-adverso-por-cpf-cnpj');
	autoCompleteLoadEspecifico('#cpf_cnpj_cliente_pesquisa','/sistema/clientes/pesquisar-cliente-por-cpf-cnpj-autocomplete/','.container_cliente_load','/sistema/clientes/pesquisar-cliente-por-cpf-cnpj');
	autoCompleteLink('#search_header','/sistema/processos/pesquisar-processo-por-numero-autocomplete/','/sistema/processos/abrir/');

	allAutoCompletes();


	var imagem_usuario_perfil = $('#imagem-usuario-config');

	if(typeof imagem_usuario_perfil != undefined){

		console.log('iiiiiiiiiiiiiiiiii imagem_usuario_perfil iiiiiiiiiiiiiiiii');
		console.log(imagem_usuario_perfil);
		console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');

		$(imagem_usuario_perfil).cropper({
			aspectRatio: 1 / 1
		});
	}
}

function GetEndereco(cep, pai) {
	var link = 'https://viacep.com.br/ws/'+cep+'/json/ ';
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			adicionarLoader();
		},
		success: function(data) {
			console.log(data);
			if (data['erro'] == true) {
				alert('CEP não encontrado');
				$(pai).find('.uf').focus();
			} else {
				$(pai).find('.cidade').val(data['localidade']).focus();
				$(pai).find('.rua').val(data['logradouro']).focus();
				$(pai).find('.uf').val(data['uf']).focus();
				$(pai).find('.bairro').val(data['bairro']).focus();
				console.log('bairro');
				console.log($(pai).find('.bairro'));
				console.log('numero');
				console.log($(pai).find('.numero'));

				$(pai).find('.numero').focus();
			}
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    	alert("CEP não encontrado, utilize somente números");
    	$(pai).find('.uf').focus();
    },
    complete: function() {
    	removerLoader();
    }
});
}
function SubmitAjax(post, link, back, method) {
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
			console.log('beforeSend SubmitAjax');
		},
		success: function(data) {
			console.log('TTTTTTTTTTTTTT DATA DO RES.JSON DO AJAX-SUBMIT TTTTTTTTTTTTT');
			console.log(data);
			console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
			if (data == "RELOAD") {
				window.location.replace('/sistema/configuracoes');
			}
			if (typeof data != undefined && data > 0) {
				M.toast({html:'<div class="center-align" style="width:100%;">Cadastrado com sucesso</div>', 
					displayLength:5000, classes:'rounded'});
			}
			console.log(back);

			if(data.desc == 'cadastro_apenso'){
				loadEspecificoPagina('/sistema/processos/editar-apenso/'+data.id_apenso,$('.container_adicionar_apenso_load'));
			}
			else if(data.desc == "cadastro_recurso"){
				loadEspecificoPagina('/sistema/processos/editar-recurso/'+data.id_recurso,$('.container_adicionar_recurso_load'));
			}


			if (typeof back != 'undefined' && back != 'add_name') {
				console.log('estou caindo no goTo do :D');
				GoTo(back, true);
			} else if(back == 'add_name') {
				$('.grupo').prepend('<option value="'+data.id+'">'+data.nome+'</option>').find('option:first-child').prop('selected', true);
				$('.modal').modal('close');
			}
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    	console.log(xhr.statusText);
    },
    complete: function() {
    	removerLoader();
    }
});
}


function SubmitAjaxCadastrarUsuario(post, link, back, method) {
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
			console.log('beforeSend SubmitAjax');
		},
		success: function(data) {
			console.log('TTTTTTTTTTTTTT DATA DO RES.JSON DO AJAX-SUBMIT TTTTTTTTTTTTT');
			console.log(data);
			console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
			console.log(back);
			if(data == "possui_login"){
				$('.erro_container_cadastro_usuario').removeClass('hide');
				$('.erro_container_cadastro_usuario').find('.error_cadastro_usuario_mensagem').html('Já existe alguém com este Login de usuário!');

			}else{
				M.toast({html:'<div class="center-align" style="width:100%;">Usuário cadastrado com sucesso</div>', 
					displayLength:5000, classes:'rounded'});
				GoTo(back, true);
			}	
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    	console.log(xhr.statusText);
    },
    complete: function() {
    	removerLoader();
    }
});
}

function SubmitAjaxNoBack(post, link, method,sucessMessage,sucessClass) {
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			M.toast({html:'<div class="center-align" style="width:100%;">'+sucessMessage+'</div>',
				displayLength:5000, classes: sucessClass});

			if(data.result == 'redirect'){
				window.location.replace(data.url);
			}
			
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    	console.log(xhr.statusText);
    },
    complete: function(data) {
    	removerLoader();
    	
    }
});
}


/*dar reload em modal-mount-anchor-id*/
function SubmitAjaxReloadMountAnchorId(post, link,modal,ancoras) {
	var id_processo;
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$(modal).find('.modal-content').html(data);
			$(modal).modal('open');

			$.each(ancoras,function(key,value){
				//Coloco dentro do botão selecionar o nome dos objetos + os valores que
				// são recebidos por quem chama
				$(modal).find('.selecionar-item-modal').attr('data-'+key,value);
				$(modal).find('.selecionar-todos-dados-adverso').attr('data-'+key,value);
				$(modal).find('.selecionar-advogados-setor-compromisso').attr('data-'+key,value);
			});

			// $(modal).find('.selecionar-item-modal').attr("data-anchorId",anchorId);
			// $(modal).find('.selecionar-item-modal').attr("data-anchorDesc",anchorDesc);

		},
    error: function(xhr) { // if error occured
    	removerLoader();
    	console.log(xhr.statusText);
    },
    complete: function(data) {
    	removerLoader();
    	$('.material-tooltip').remove();
    	$('.tooltipped').tooltip({delay: 50});
    	FormatInputs();
    	
    }
});
}



function SubmitAjaxContainerReload(post, link, container,sucessMessage,sucessClass) {
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			console.log('container');
			console.log(container);
			console.log('XxXxXxXxXxXxXxXxXxXxXxXx Data XxXxXxXxXxXxXxXxXxXxXxXx');
			console.log(data);
			console.log('XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx');
			M.toast({html:'<div class="center-align" style="width:100%;">'+sucessMessage+'</div>',
				displayLength:5000, classes: sucessClass});
			$(container).html(data);
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    	console.log(xhr.statusText);
    },
    complete: function(data) {
    	removerLoader();
    	
    }
});
}








function SubmitComentario(post, link, back, method) {
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			if (data == "RELOAD") {
				window.location.replace('/sistema/configuracoes');
			}
			if (typeof data != undefined && data > 0) {
				M.toast({html:'<div class="center-align" style="width:100%;">Cadastrado com sucesso</div>',
					displayLength:5000, classes: 'rounded'});
			}
			if(data=='novo_comentario'){
				$('.novos-comentarios').prepend('<p><b>Comentario:</b>'+ '&nbsp;'+$('#texto_comentario').val()+'</p>');
				$('#texto_comentario').val('');
			}
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    }
});
}
function Reestruturar(str) {
	var i = 1;
	$('.'+ str +' > div').each(function () {
		$(this).data('num', ''+i+'');
		i += 1;
	});
	return i;
}
function ActiveMaterializeInput(focus) {
	if (focus != undefined && focus != 'undefined') {
		console.log(focus);
		focus.first().focus();
		return true;
	}
	$('main textarea:not(disabled)').each(function () {
		if ($(this).val() != '') {
			$(this).focus();
		}
	});
	$('main input:not(disabled)').each(function () {
		if ($(this).val() != '') {
			$(this).focus();
			$('main input:not([disabled]):not([type="hidden"])').first().focus();
		}
	});
}

function FocusInputModal(modal) {
	$(modal).find('textarea:not(disabled)').each(function () {
		if ($(this).val() == '') {
			$(this).focus();
		}
	});
	
	$(modal).find('input:not(disabled)').each(function () {
		if ($(this).val() == '') {
			$(this).focus();
			$(modal).find('input:not([disabled]):not([type="hidden"])').first().focus();
		}
	});
}



function MountModal(modal, link) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema'+link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			console.log(link);
			$(modal).find('.modal-content').html(data);
			$(modal).modal('open');
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    	$('.material-tooltip').remove();
    	$('.tooltipped').tooltip({delay: 50});
    	FormatInputs();
    	FocusInputModal(modal);
    }
});
}

function MountModalOneItem(modal, link) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema'+link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			console.log(link);
			$(modal).find('.modal-content').html(data);
			$(modal).modal('open');
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    	$('.material-tooltip').remove();
    	$('.tooltipped').tooltip({delay: 50});
    	FormatInputs();
    	FocusInputModal(modal);
    }
});
}

FormatInputs();


function filtrarTabelaDataTablePt(tabela){
	$(tabela).DataTable({			
		"paging":   false,
		language:{
			"emptyTable":     "Nenhum registro encontrado",
			"info":           "Mostrando de _START_ até _END_ de _TOTAL_ registros",
			"infoEmpty":      "Mostrando de 0 até 0 de 0 registros",
			"infoFiltered":   "(Filtrados de _MAX_ registros)",
			"infoPostFix":    "",
			"thousands":      ".",
			"lengthMenu":     "_MENU_ resultados por página",
			"loadingRecords": "Carregando...",
			"processing":     "Processando...",
			"search":         "Pesquisar: <i class='fa fa-search'></i> ",
			"searchPlaceholder":"Pesquisar",
			"zeroRecords":    "Nenhum registro encontrado",
			"paginate": {
				"first":      "Primeiro",
				"last":       "Último",
				"next":       "Próximo",
				"previous":   "Anterior"
			},
			"aria": {
				"sortAscending":  ": Ordenar colunas de forma ascendente",
				"sortDescending": ": Ordenar colunas de forma descendente"
			}
		}	
	});
}

function filtrarTabelaDataTablePtNoSort(tabela){
	$(tabela).DataTable({			
		"paging":   false,
		"aaSorting": [],
		language:{
			"emptyTable":     "Nenhum registro encontrado",
			"info":           "Mostrando de _START_ até _END_ de _TOTAL_ registros",
			"infoEmpty":      "Mostrando de 0 até 0 de 0 registros",
			"infoFiltered":   "(Filtrados de _MAX_ registros)",
			"infoPostFix":    "",
			"thousands":      ".",
			"lengthMenu":     "_MENU_ resultados por página",
			"loadingRecords": "Carregando...",
			"processing":     "Processando...",
			"search":         "Pesquisar: <i class='fa fa-search'></i> ",
			"searchPlaceholder":"Pesquisar",
			"zeroRecords":    "Nenhum registro encontrado",
			"paginate": {
				"first":      "Primeiro",
				"last":       "Último",
				"next":       "Próximo",
				"previous":   "Anterior"
			},
			"aria": {
				"sortAscending":  ": Ordenar colunas de forma ascendente",
				"sortDescending": ": Ordenar colunas de forma descendente"
			}
		}	
	});
}



function MountModalAnchor(modal, link, ancoras) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema'+link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			console.log(link);
			console.log(ancoras);
			$(modal).find('.modal-content').html(data);
			$(modal).modal('open');

			$.each(ancoras,function(key,value){
				console.log(key);
				console.log(value);
				//Coloco dentro do botão selecionar o nome dos objetos + os valores que
				// são recebidos por quem chama
				$(modal).find('.selecionar-item-modal').attr('data-'+key,value);
				$(modal).find('.selecionar-todos-dados-adverso').attr('data-'+key,value);
				$(modal).find('.selecionar-advogados-setor-compromisso').attr('data-'+key,value);
				$(modal).find('.modal-mount-anchor-id-reload').attr('data-'+key,value);
				$(modal).find('.ajax-submit-reload-anchor-id').attr('data-'+key,value);
			});

			// $(modal).find('.selecionar-item-modal').attr("data-anchorId",anchorId);
			// $(modal).find('.selecionar-item-modal').attr("data-anchorDesc",anchorDesc);
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    	$('.material-tooltip').remove();
    	$('.tooltipped').tooltip({delay: 50});
    	FormatInputs();
    }
});
}


function MountModalAnchorFocus(modal, link, ancoras) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema'+link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			console.log(link);
			console.log(ancoras);
			$(modal).find('.modal-content').html(data);
			$(modal).modal('open');

			$.each(ancoras,function(key,value){
				console.log(key);
				console.log(value);
				//Coloco dentro do botão selecionar o nome dos objetos + os valores que
				// são recebidos por quem chama
				$(modal).find('.selecionar-item-modal').attr('data-'+key,value);
				$(modal).find('.selecionar-todos-dados-adverso').attr('data-'+key,value);
				$(modal).find('.selecionar-advogados-setor-compromisso').attr('data-'+key,value);
				$(modal).find('.modal-mount-anchor-id-reload').attr('data-'+key,value);
				$(modal).find('.ajax-submit-reload-anchor-id').attr('data-'+key,value);
			});

			// $(modal).find('.selecionar-item-modal').attr("data-anchorId",anchorId);
			// $(modal).find('.selecionar-item-modal').attr("data-anchorDesc",anchorDesc);
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    	$('.material-tooltip').remove();
    	$('.tooltipped').tooltip({delay: 50});
    	FormatInputs();
    	FocusInputModal(modal);
    }
});
}


// function MountModalAnchor(modal, link,anchorId,anchorDesc) {
// 	$.ajax({
// 		method: "GET",
// 		async: true,
// 		url: '/sistema'+link,
// 		beforeSend: function(request) {
// 			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
// 			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
// 			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
// 			adicionarLoader();
// 		},
// 		success: function(data) {
// 			console.log(link);
// 			console.log(anchorId);
// 			console.log(data);
// 			$(modal).find('.modal-content').html(data);
// 			$(modal).modal('open');
// 			$(modal).find('.selecionar-item-modal').attr("data-anchorId",anchorId);
// 			$(modal).find('.selecionar-item-modal').attr("data-anchorDesc",anchorDesc);
// 		},
//     error: function(xhr) { // if error occured
//     	removerLoader();
//     },
//     complete: function() {
//     	removerLoader();
//     	$('.material-tooltip').remove();
//     	$('.tooltipped').tooltip({delay: 50});
//     	FormatInputs();
//     }
//   });
// }

function VerificarForm(form) {
	$('.error').remove();
	var qtdErros = 0;

	form.find('input:enabled:not([type="hidden"])[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			console.log('$(this)');
			console.log($(this));
			qtdErros++;
		};
		if($('#alterar_senha').val() != $('#confirmar_alterar_senha').val())
		{
			AddErrorTexto($('#confirmar_alterar_senha'),'Senhas são diferentes');
			qtdErros++;
			console.log('CAI AQUI DENTRO DO DIFERENTE');
		}
	});

	form.find('textarea:enabled[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			qtdErros++;
			// error = true;
			// return false;
		};
	});

	form.find('select:enabled[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			qtdErros++;
		};
	});

	// if (error == false) {
	// 	console.log('cai aqui! no error == false');
	// 	return true;
	// }
	// if (error == true){
	// 	return false;
	// }
	console.log('QQQQQQQQQQQ QTD ERROS!!!!!!! QQQQQQQQQQQQQQQQQQQ');
	console.log(qtdErros);
	console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');
	if(qtdErros > 0){
		return false;
	}else if(qtdErros <= 0){
		return true;
	}
}
function VerificaItem(isso) {
	//Adicionei o isso.val() == null para fazer funcionar no select já que =='' não pega select
	if (isso.val() == '' || isso.val() == null) {
		AddError(isso);
		return true;
	}
}
function AddError(isso) {
	isso.focus().addClass('observe-post').parent().append('<div class="error">Complete corretamente</div>');
}
function AddErrorTexto(isso,texto) {
	isso.focus().addClass('observe-post').parent().append('<div class="error">'+texto+'</div>');
}
function AddErrorAjax() {
	$('.error_ajax').fadeIn();
}
function msToTime(duration) {
	var milliseconds = parseInt((duration%1000)/100)
	, seconds = parseInt((duration/1000)%60)
	, minutes = parseInt((duration/(1000*60))%60)
	, hours = parseInt((duration/(1000*60*60))%24);

	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds;
}

// ESPECIFICO
function LoadInfosUsuario() {
	var id = $('input[name="id_usuario_sessao"]').val();
	$.ajax({
		method: "POST",
		async: true,
		data: {id: id},
		url: '/sistema/usuarios/ver/perfil/',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('.infos-usuario').html(data);
		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
			removerLoader();
		}
	});
}

function LoadTopicos(id, isso) {
	console.log(isso);
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema/tarefas/ver/topico/'+id,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			isso.parent().find('.collapsible-body > .tarefas').empty().append(data);
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    }
});
}
function LoadContatos(id) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema/contatos/ver/lista/'+id,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('#'+id).html(data);
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    }
});
}
function LoadTarefas(id) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema/tarefas/ver/tarefas/'+id,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('#'+id).html(data);
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    }
});
}
function MudaStatusTopico(id, status, isso) {
	$.ajax({
		method: "POST",
		async: true,
		data: {id: id, status: status},
		url: '/sistema/tarefas/atualizar/topico/'+id,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			if (status == 1) {
				isso.removeClass('fa-circle-thin red-text').addClass('fa-check-circle blue-text').removeClass('AprovarTopico').addClass('DesaprovarTopico');
			} else {
				isso.removeClass('fa-check-circle blue-text').addClass('fa-circle-thin red-text').addClass('AprovarTopico').removeClass('DesaprovarTopico');
			}
			console.log(data[0].porcentagem);
			isso.parent().parent().parent().parent().parent().find('.porcentagem').css('width', (data[0].porcentagem * 100) + '%');
		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
			removerLoader();
		}
	});
}


function validarDataTable(elemento){
	if($(elemento).length>0){
		/*Já existe a tabela então não há necessidade de criá-la(senão dá problema)*/
		if($.fn.dataTable.isDataTable(elemento)){
		}else{
			filtrarTabelaDataTablePt(elemento);	
		}
	}
}

function validarDataTableNoSort(elemento){
	if($(elemento).length>0){
		/*Já existe a tabela então não há necessidade de criá-la(senão dá problema)*/
		if($.fn.dataTable.isDataTable(elemento)){
		}else{
			filtrarTabelaDataTablePtNoSort(elemento);	
		}
	}
}


function UploadFile(isso) {
	var link = isso.data('href');
	console.log('FILE UPLOAD');
	console.log(isso[0].files[0]);
	var formData = new FormData();
	formData.append('arquivo', isso[0].files[0]);

	$.ajax({
		url: link,
		type: 'POST',
		data: formData,
		dataType: 'json',
		processData: false,
		contentType: false,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function (data) {
			$('.file-path').val('');
			isso.closest('.row').append('\
				<div class="col s12 m6 center-align relative pai">\
				<div class="card-panel grey lighten-4">\
				<input type="hidden" name="tarefa_arquivo[arquivo][]" value="'+data+'">\
				<button class="btn-floating btn waves-effect waves-light red close-button remove"><i class="fa fa-times" aria-hidden="true"></i></button>\
				<b>Arquivo: '+data+' <br>\
				</div>\
				</div>\
				');
			console.debug(data);
		},
		error: function (xhr, e, t) {
			console.debug((xhr.responseText));
		},
		complete: function() {
			removerLoader();
		}
	});
}


function UploadImagemPerfil(isso) {
	var link = isso.data('href');
	console.log('FILE UPLOAD');
	console.log(isso[0].files[0]);
	var formData = new FormData();
	formData.append('arquivo', isso[0].files[0]);

	$.ajax({
		method: 'POST',
		async: true,
		data: formData,
		url: link,
		processData: false,
		contentType: false,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function (data) {
			$("#modalinfo").find('.modal-content').html(data);
			$("#modalinfo").modal('open');
		},
		error: function (xhr, e, t) {
			console.debug((xhr.responseText));
			removerLoader();
		},
		complete: function() {
			removerLoader();
		}
	});
}



function InitChat() {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema/chats/',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('.chat_box').append(data);
		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
			removerLoader();
			$('.sidenav').sidenav({
		      menuWidth: 400, // Default is 300
		      edge: 'right', // Choose the horizontal origin
		      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
		      draggable: true, // Choose whether you can drag to open on touch screens,
		  }
		  );
		}
	});
}

function NovidadesChat() {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema/chats/novidades',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
		},
		success: function(data) {
			if (data.nova_mensagem == true) {
				$('.tem_mensagem').fadeIn();
				$('#slide-out ul').css('right', '0');
			} else {
				$('.tem_mensagem').fadeOut();
			}
		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
			setTimeout(function(){ NovidadesChat(); }, 10000);
		}
	});
}


function UltimasNotificacoesUsuario() {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema/notificacoes/ultimasNotificacoes',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
		},
		success: function(data) {
			console.log('---------- ULTIMAS NOTIFICACOES -------------');
			console.log(data);
			console.log('---------------------------------------------');


			// if (data.nova_mensagem == true) {
			// 	$('.tem_mensagem').fadeIn();
			// 	$('#slide-out ul').css('right', '0');
			// } else {
			// 	$('.tem_mensagem').fadeOut();
			// }
		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
			setTimeout(function(){ UltimasNotificacoesUsuario(); }, 10000);
		}
	});
}









function MensagensChat(id) {
	var id_usuario_sessao = $('input[name="id_usuario_sessao"]').val();
	$.ajax({
		method: "POST",
		async: true,
		data: {id_usuario_enviado: id, id_usuario: id_usuario_sessao},
		url: '/sistema/chats/mensagens/',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('.chat-conteudo').html(data);
		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
			removerLoader();
		}
	});
}

function MensagensChatGrupo(id_chat_grupo) {
	var id_usuario_sessao = $('input[name="id_usuario_sessao"]').val();
	$.ajax({
		method: "POST",
		async: true,
		data: {id_chat_grupo: id_chat_grupo, id_usuario: id_usuario_sessao},
		url: '/sistema/chats/mensagensGrupo/',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('.chat-conteudo').html(data);
		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
			removerLoader();
		}
	});
}


function AddInputDel(isso) {
	var id = isso.data('id');
	console.log(id);
	isso.closest('form').prepend('<input type="hidden" name="remover[id][]" value="'+id+'">');
	isso.closest('.pai').remove();
}

function EnviarMensagem(id) {
	var id_usuario_sessao = $('input[name="id_usuario_sessao"]').val();
	$.ajax({
		method: "POST",
		async: true,
		data: {id_usuario_enviado: id, id_usuario: id_usuario_sessao, texto: $('#mensagem-texto').val()},
		url: '/sistema/chats/enviarmensagem/',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('.chat-conteudo').html(data);
		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
			removerLoader();
		}
	});
}

function EnviarMensagemGrupo(id_chat_grupo) {
	var id_usuario_sessao = $('input[name="id_usuario_sessao"]').val();
	$.ajax({
		method: "POST",
		async: true,
		data: {id_chat_grupo: id_chat_grupo, id_usuario: id_usuario_sessao, texto: $('#mensagem-texto-grupo').val()},
		url: '/sistema/chats/enviarmensagemgrupo/',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('.chat-conteudo').html(data);
		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
			removerLoader();
		}
	});
}


function LoadArquivos(id, isso) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema/documentos/arquivos/'+id,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			if(data == ''){
				data = '<ul class="collapsible" data-collapsible="expandable"><li>Não existem arquivos nesta pasta</li></ul>';
			}
			isso.parent().find('.collapsible-body').html(data);
		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
			// setTimeout(function(){ NovidadesChat(); }, 10000);
			removerLoader();
		}
	});
}
function FIniciarTarefa(id, elemento, tempo) {
	IniciarTarefa(id, tempo);
	elemento.removeClass('fa-play-circle-o blue').addClass('fa-pause-circle-o brown');
}
function IniciarTarefa(id, tempo) {
	$('.tarefa_controle').addClass('active').data('id', id);
	$('#stop_contagem').val(1);
	Contagem((new Date().getTime() - tempo), id);
}
function PausarTarefa(id) {
	$('.tarefa_controle').removeClass('active').data('id', id);
	$('#stop_contagem').val(0);
	$('.fa-pause-circle-o.brown:not(.notme)').removeClass('fa-pause-circle-o brown').addClass('fa-play-circle-o blue')
}
function Contagem(tempo_fixo, id) {
	var tempo_contado = new Date().getTime() - tempo_fixo;
	$('#tempo_executando').text(msToTime(tempo_contado));
	$('.play'+id).data('tempo', tempo_contado);
	if ($('#stop_contagem').val() == 1) {
		$.ajax({
			method: "POST",
			async: true,
			data: {tempo_gasto: msToTime(tempo_contado), id: id},
			url: '/sistema/tarefas/atualizar/tempo_contado',
			beforeSend: function(request) {
				request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			},
			success: function(data) {
			},
			error: function(xhr) { // if error occured
				removerLoader();
			},
			complete: function() {
			}
		});
		setTimeout(function() {
			Contagem(tempo_fixo, id);
		}, 500)
	}
}
function DesbloquearSenha(id, senha) {
	$('#senha-'+id).text(senha);
}
function Pesquisar(isso,container) {
	var form = isso.closest('form');
	var post = form.serializeArray();
	var link = form.data('link');
	console.log('llllllink');
	console.log(link);
	console.log('llllllink');
	console.log('container');
	console.log(container);
	// console.log(link);
	$.ajax({
		method: "POST",
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
		},
		success: function(data) {
			console.log(data);
			console.log('container:' + container);
			$(container).html(data);
		},
		error: function(xhr) { // if error occured
			removerLoader();
		},
		complete: function() {
		}
	});
}





function calendarioLista(){
	$('#calendar_list').fullCalendar({
		header:{
			left:   'today prev,next',
			center: '',
			right:''
		},
		defaultView: 'listMonth',
		buttonText:{
			today:'Hoje',
			list:'Lista'
		},
		events: {
			url:'/sistema/compromissos/eventos/',
			method:"GET",
			async:true,
			beforeSend:function(request){
				request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			}
		},
		timezone:'UTC-3',
		editable:true,
		eventClick: function(event, jsEvent, view) {
			$.ajax({
				method: "GET",
				async: true,
				url: '/sistema/compromissos/editar/'+event.id,
				beforeSend: function(request) {
					console.log('setando');
					request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
					adicionarLoader();
				},
				success: function(data) {
					$('#modalinfo').find('.modal-content').html(data);
					$('#modalinfo').modal('open');
				},
				error: function(xhr) { // if error occured
					removerLoader();
				},
				complete: function() {
					removerLoader();
					FormatInputs();
				}
			});
		}
	});
}


function calendarioCompromissos(){
	$('#calendar').fullCalendar({
		header:{
			left:   'today prev,next',
			center: '',
			right:  'month,agendaWeek,agendaDay,listMonth'
		},
		buttonText:{
			today:'Hoje',
			month:'Mês',
			week:'Semana',
			day:'Dia',
			list:'Lista'
		},
		events: {
			url:'/sistema/compromissos/eventos/',
			method:"GET",
			async:true,
			beforeSend:function(request){
				request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			}
		},
		timezone:'local',
		editable:true,
		eventClick: function(event, jsEvent, view) {
			$.ajax({
				method: "GET",
				async: true,
				url: '/sistema/compromissos/editar/'+event.id,
				beforeSend: function(request) {
					console.log('setando');
					request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
					adicionarLoader();
				},
				success: function(data) {
					$('#modalinfo').find('.modal-content').html(data);
					$('#modalinfo').modal('open');
				},
				error: function(xhr) { // if error occured
					removerLoader();
				},
				complete: function() {
					removerLoader();
					FormatInputs();
				}
			});
		},eventDrop:function(event){
			$.ajax({
				method: "POST",
				async: true,
				data: {id: event.id, data_inicial: event.start.format('DD/MM/Y'),hora_inicial:event.start.format('HH:mm'),data_final:event.end.format('DD/MM/Y'),hora_final:event.end.format('HH:mm')},
				url: '/sistema/compromissos/atualizar/',
				beforeSend: function(request) {
					request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
				},
				success: function(data) {
				},
				error: function(xhr) { // if error occured
					removerLoader();
				},
				complete: function() {
					removerLoader();
				}
			});
		}

	});
}

function loadEspecificoPagina(url,lugar){
	$.ajax({
		method: "GET",
		async: true,
		url: url,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-nivel", $('input[name="nivel_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			lugar.html(data);
		},
    error: function(xhr) { // if error occured
    	removerLoader();
    },
    complete: function() {
    	removerLoader();
    	/*chamo a função para os autocompletes de dentro do load funcionarem*/
    	allAutoCompletes();
    	FormatInputs();
    }
});
}

function autoCompleteLoadEspecifico(element,url,container,linkload){
	$(element).autocomplete({
		source: function( request, response ){
			$.ajax({
				method:'GET',
				async:true,
				dataType:'json',
				url:url+request.term,
				beforeSend: function() {
					console.log('request');
					console.log(request); 
					console.log('request.term');
					console.log(request.term);
					console.log('url');
					console.log(url+request.term);
				},
				success: function(data) {

					console.log('-------------------- ELEMENTO ------------------------');
					console.log(element);
					console.log('------------------------------------------------------');

					console.log('------------------------ RETORNO DOS DADOS -----------------');
					console.log(data);
					console.log('------------------------------------------------------------');
					// response(data);
					console.log('---------------- O REQUEST -----------');
					console.log(request);
					console.log('--------------------------------------');

					response($.map(data, function (item) {
						return {
							label: item.name,
							value: item.name,
							qualquerAtributo: item.qualqueratributo
						};
					}));
				},
				error: function(xhr) {
					console.log(xhr);
				},
				complete: function() {
				}
			});
		},
		select:function(event,ui){
			$(element).removeAttr('type');

			console.log('eeeeeeeeeeeeeeeeeeeee evento eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
			console.log(event);
			console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

			console.log('uuuuuuuuuuuuuuuuuuuuuu ui uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
			console.log(ui);
			console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');

			$(container).empty();


			var carregar = linkload + '/' + ui.item.qualquerAtributo;
			console.log('oooooooo o que deve ser carregado o link para pegar para fazer o load oooooooooooooooo');
			console.log(carregar);
			console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');

			console.log('ccccccccccccccccccccccccccccccc container ccccccccccccccccccccccc');
			console.log(container);
			console.log('ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc');
			loadEspecificoPagina(carregar,$(container));    
		}

	});
}


function autoCompleteLink(element,url,linkabrir){
	$(element).autocomplete({
		source: function( request, response ){
			$.ajax({
				method:'GET',
				async:true,
				dataType:'json',
				url:url+request.term,
				beforeSend: function() {
					console.log('request');
					console.log(request); 
					console.log('request.term');
					console.log(request.term);
					console.log('url');
					console.log(url+request.term);
				},
				success: function(data) {
					console.log('------------------------ RETORNO DOS DADOS -----------------');
					console.log(data);
					console.log('------------------------------------------------------------');
					// response(data);
					console.log('---------------- O REQUEST -----------');
					console.log(request);
					console.log('--------------------------------------');

					response($.map(data, function (item) {
						return {
							label: item.name,
							value: item.name,
							id: item.id
						};
					}));
				},
				error: function(xhr) {
					console.log(xhr);
				},
				complete: function() {
				}
			});
		},
		select:function(event,ui){

			console.log('eeeeeeeeeeeeeeeeeeeee evento eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
			console.log(event);
			console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

			console.log('uuuuuuuuuuuuuuuuuuuuuu ui uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
			console.log(ui);
			console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
			
			console.log('eeeeeeeeeeeeeee elemento eeeeeeeeeeeeeeeeeeeeeeeeeeee');
			console.log($(element));
			console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
			console.log($(element).val());

			GoTo(linkabrir + ui.item.id, true);
		}

	});
}


function autoCompleteId(element,url,idSetar){
	$(element).autocomplete({
		source: function( request, response ){
			$.ajax({
				method:'GET',
				async:true,
				dataType:'json',
				url:url+request.term,
				beforeSend: function() {
					console.log('ESTOU ENVIANDO ALGO');
				},
				success: function(data) {
					console.log('DDDDDDDDDDDD DATA AUTOCOMPLETE DDDDDDDDDDDDDDDDDDD');
					console.log(data);
					console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
					response($.map(data, function (item) {
						return {
							label: item.name,
							value: item.name,
							id: item.id
						};
					}));
				},
				error: function(xhr) {
					console.log(xhr);
				},
				complete: function() {
				}
			});
		},
		select:function(event,ui){
			$(idSetar).val(ui.item.id);
			/*faço o trigger para simular um change serve para a pesquisa de cruzamento funcionar*/
			$(idSetar).trigger('change');	
		}

	});
}


function changeTipoCompromissoPorCategoriaCompromisso(categoria,tipo,name){
	console.log($(categoria).val());
	console.log(tipo);
	console.log(categoria);
	tipo.empty();
	if($(categoria).val() == 0) {
		tipo.append("\
			<label>Tipo do Compromisso</label>\
			<select class='browser-default validate' name='"+name+"'>\
			<option value='0' selected>Audiência</option>\
			<option value='1'>Reunião</option>\
			<option value='2'>Perícia</option>\
			</select>");

	}else if($(categoria).val() == 1){
		tipo.append("\
			<label>Tipo do Compromisso</label>\
			<select class='browser-default validate' name='"+name+"'>\
			<option value='0' selected>Acórdão/Sentença</option>\
			<option value='1'>Despacho/Decisões</option>\
			<option value='2'>Petições Diversas</option>\
			<option value='3'>Quesitos</option>\
			<option value='4'>Manif de Docs</option>\
			<option value='5'>Prazos Processos Físicos</option>\
			<option value='6'>Perito</option>\
			<option value='7'>Providência</option>\
			</select>");
	}else if($(categoria).val() == 2){
		tipo.append("\
			<label>Tipo do Compromisso</label>\
			<select class='browser-default validate' name='"+name+"'>\
			<option value='0' selected>Julgamento</option>\
			</select>");
	}
}







// function novaFuncao(){
// 	console.log('estou dentro da novaFuncao');
// 	var pdf = new jsPDF('p', 'pt', 'letter');

// 	var element = document.getElementById('relatorio_generator');
// 	console.log('element relatorio_generator');
// 	console.log(element);


// 	// var worker = html2pdf().from(element).save();

// 	html2pdf(document.getElementById('relatorio_generator'), pdf,function(pdf) {

// 		console.log(pdf);
// 		console.log('pdf');
// 		pdf.save('test.pdf');
// 	}
// 	);
// }



function demoFromHTML(elemento) {


	//*****************************************************************************
	// funciona mas o html fica sem css,então fica tudo do lado do outro

	// var doc = new jsPDF();
	// var elementHTML = $('#tabela_interna_processo').html();


	// console.log('elemento do demoFromHTML:');
	// console.log(elementHTML);
	// console.log('-----------------------------------------');

	// var specialElementHandlers = {
	// 	'#elementH': function (element, renderer) {
	// 		return true;
	// 	}
	// };

	// doc.fromHTML(elementHTML, 15, 15, {
	// 	'width': 170,
	// 	'elementHandlers': specialElementHandlers
	// });

	// doc.save('sample-document.pdf');

	//*****************************************************************************




	html2canvas($('#tabela_interna_processo')[0]).then(function(canvas) {

		console.log('8888888 canvas da tabela interna :D 8888888888888');
		console.log(canvas);
		console.log('8888888888888888888888888888888888888888888888888');

		var imgData = canvas.toDataURL('image/jpeg');

		var doc = new jsPDF('p','mm','a4');
		
		doc.setFontSize(10);
		
		doc.text(10, 15, 'Filter section will be printed where.')
		
		doc.addImage(imgData, 'jpeg', 10, 20);
		
		doc.save('sample.pdf');

	});






	// window.html2canvas = html2canvas;
	// console.log('pppppppppppppppppp pdf ppppppppppppppppppppppppppppppp');
	// console.log(pdf);
	// console.log('pppppppppppppppppppppppppppppppppppppppppppppppppppppp');
	// console.log("elemento:"+elemento);
	// window.html2canvas = html2canvas;
	// var doc = new jsPDF();

	// console.log('mais um teste');
	// var doc = new jsPDF();

	// doc.fromHTML($('#relatorio_generator').get(0), 15, 15, {
	// 	'width': 170
	// });




	// html2canvas(document.body,{
	// 	onrendered:function(canvas){

	// 		var img=canvas.toDataURL("image/png");
	// 		var doc = new jsPDF();
	// 		doc.addImage(img,'JPEG',20,20);
	// 		doc.save('test.pdf');
	// 	}

	// });

	// var doc = new jsPDF('landscape', 'pt', 'a4');
	// doc.addHTML($('#relatorio_generator')[0], function() {
	// 	doc.save("teste.pdf");
	// });


	// var doc = new jsPDF();
	// doc.fromHTML($('#relatorio_generator').get(0), 20,20,{
	// 	'width':500
	// });

	// doc.save('teste.pdf');


	// var pdf = new jsPDF('p', 'pt', 'letter');
	// console.log('♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫ PDF ♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫');
	// console.log(pdf);
	// console.log('♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫');
	// pdf.addHTML($('#relatorio_generator')[0], function () {
	// 	console.log('estou dentro do ADDHTML');
	// 	console.log($(this));
	// 	pdf.save('Test.pdf');
	// });




	// var element = document.getElementById('relatorio_generator');
	// var worker = html2pdf().from($('#relatorio_generator')).save();

	//var pdf = new jsPDF('p', 'pt', 'letter');
	//var canvas = pdf.canvas;
	//canvas.height = 72 * 11;
	//canvas.width=72 * 8.5;;
       // var width = 400;

      // html2pdf(document.body, pdf,function(pdf) {
       //	var iframe = document.createElement('iframe');
       	// console.log(iframe);
       	// console.log('iframe');
       	// iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');
       	// document.body.appendChild(iframe);
       	// iframe.src = pdf.output('datauristring');


               //var div = document.createElement('pre');
               //div.innerText=pdf.output();
               //document.body.appendChild(div);
           // }
           // );




	// doc.html(elemento, {
	// 	callback: function (doc) {
	// 		doc.save();
	// 	}
	// });
  // pdf.text('Hello world!', 10, 10)
  // pdf.save('a4.pdf')




 //  source = $(elemento)[0];

 //  // we support special element handlers. Register them with jQuery-style 
 //  // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
 //  // There is no support for any other type of selectors 
 //  // (class, of compound) at this time.
 //  specialElementHandlers = {
	//   // element with id of "bypass" - jQuery style selector
	//   '#bypassme': function(element, renderer) {
	// 		// true = "handled elsewhere, bypass text extraction"
	// 		return true
	// 	}
	// };
	// margins = {
	// 	top: 80,
	// 	bottom: 60,
	// 	left: 40,
	// 	width: 522
	// };
	// // all coords and widths are in jsPDF instance's declared units
	// // 'inches' in this case
	// pdf.fromHTML(
	//   source, // HTML string or DOM elem ref.
	//   margins.left, // x coord
	//   margins.top, {// y coord
	//     'width': margins.width, // max width of content on PDF
	//     'elementHandlers': specialElementHandlers
	// },
	// function(dispose) {
	// 	  // dispose: object with X, Y of the last line add to the PDF 
	// 	  //          this allow the insertion of new lines after html
	// 	  pdf.save('Test2.pdf');
	// 	}
	// 	, margins);
}

function autoTablePdf(element,nomeProvisorio){
	var doc = new jsPDF();
	// You can use html:
	// doc.autoTable({html: element});

	console.log('♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣ Relatorio Elemento ♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣');
	console.log(element);
	console.log('♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣');

	console.log('nomeProvisorio:'+nomeProvisorio);


	doc.autoTable({
		html:element,
		headStyles:{
			fillColor:[79, 33, 40],
			textColor:[255,255,255]
		}
	});


	/*só para gerar um nome único*/
	var relatorioText = 'relatorio';
	var numeroAleatorio = Math.floor((Math.random() * 900000) + 100000);
	var diaHoje = new Date();
	var mes = diaHoje.getMonth() + 1;
	var dia = diaHoje.getDate();

	var pdf_nome = relatorioText +' - '+ nomeProvisorio + ' - ' + dia + '-' + mes + ' - ' + numeroAleatorio + '.pdf';

	doc.save(pdf_nome);
}



function autoTablePdf2(elemento,nomeProvisorio){
	var doc = new jsPDF();
	// You can use html:
	// doc.autoTable({html: element});

	console.log('estou no autoTablePdf2');

	console.log('♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣ Relatorio Elemento ♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣');
	console.log(elemento);
	console.log('♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣');

	console.log('nomeProvisorio:'+nomeProvisorio);

	// doc.html($('#relatorio_generator')[0], {
	// 	callback: function (doc) {
	// 		doc.save();
	// 	}
	// });

	var specialElementHandlers = {
		"#editor":function(element,renderer){
			return true
		}
	};

	//pega o html, mas não pega o css, mas pega o inline, mas é bugado, não pega borda
	// e o display também não funciona direito

	// doc.fromHTML($('#relatorio_generator').html(),{
	// 	"elementHandlers":specialElementHandlers
	// });


	//tira uma print do elemento, mas fica bem ruim

	// html2canvas(document.getElementById('relatorio_generator')).then(function (canvas) {

	// 	var img = canvas.toDataURL("image/png");
	// 	var doc = new jsPDF();
	// 	doc.addImage(img, 'JPEG', 10, 10);
	// 	doc.save('test.pdf');

	// });



	doc.save();



	// doc.addHTML($('#relatorio_generator'),function(){
	// 	console.log('estou no addHtml');
	// 	doc.save();

	// });


	// doc.autoTable({
	// 	html:element,
	// 	headStyles:{
	// 		fillColor:[79, 33, 40],
	// 		textColor:[255,255,255]
	// 	}
	// });


	/*só para gerar um nome único*/
	// var relatorioText = 'relatorio';
	// var numeroAleatorio = Math.floor((Math.random() * 900000) + 100000);
	// var diaHoje = new Date();
	// var mes = diaHoje.getMonth() + 1;
	// var dia = diaHoje.getDate();

	// var pdf_nome = relatorioText +' - '+ nomeProvisorio + ' - ' + dia + '-' + mes + ' - ' + numeroAleatorio + '.pdf';

	// doc.save(pdf_nome);
}




function autoTablePdfnoHeader(element,nomeProvisorio){
	var doc = new jsPDF();
	// You can use html:
	// doc.autoTable({html: element});

	console.log('♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣ Relatorio Elemento ♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣');
	console.log(element);
	console.log('♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣♣');

	console.log('nomeProvisorio:'+nomeProvisorio);


	doc.autoTable({
		html:element,
		headStyles:{
			fillColor:[255, 255, 255],
			textColor:[255,255,255]
		},
		useCss: true,
		theme:'plain',
		showHead:false
	});


	/*só para gerar um nome único*/
	var relatorioText = 'relatorio';
	var numeroAleatorio = Math.floor((Math.random() * 900000) + 100000);
	var diaHoje = new Date();
	var mes = diaHoje.getMonth() + 1;
	var dia = diaHoje.getDate();

	var pdf_nome = relatorioText +' - '+ nomeProvisorio + ' - ' + dia + '-' + mes + ' - ' + numeroAleatorio + '.pdf';

	doc.save(pdf_nome);
}
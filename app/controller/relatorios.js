// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var RelatoriosModel = require('../model/relatoriosModel.js');
var model = new RelatoriosModel;
var data = '';
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'relatorios/index', data: data, usuario: req.session.usuario});
});


module.exports = router;

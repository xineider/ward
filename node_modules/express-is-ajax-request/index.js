/*!
 * express-is-ajax-request
 * Copyright(c) 2016 Konnng <falecom@konnng.com>
 * MIT Licensed
 */

module.exports = function (req, res, next) {

	req.isAjaxRequest = function() {
		return req.xhr || /json/i.test(req.headers.accept);
	};

	req.is_ajax_request = req.isAjaxRequest();

	next();
};

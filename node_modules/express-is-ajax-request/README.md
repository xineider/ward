# express-is-ajax-request

Express middleware to help detecting Ajax Requests in Express.

## Installation

Works with Express 4

```npm install express-is-ajax-request```

## Usage

```javascript

var app = express();

// activate middleware, before routing section of app
app.use(require('express-is-ajax-request'));

[...]

var router = express.Router();

router.get('/foo', function (req, res, next){

	if (req.isAjaxRequest())
		res.send('request made through ajax.');

	res.send('normal http request');
});

```

### License

(The MIT License)

Copyright (c) 2016 Konnng <falecom@konnng.com>

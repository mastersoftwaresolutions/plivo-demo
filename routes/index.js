var express = require('express');
var router = express.Router();

var plivo = require('plivo');
var p = plivo.RestAPI(require('./config'));

/* GET home page. */
router.get('/', function(req, res) {
  p.get_applications({}, function (status, response) {
  	  console.log('Status: ', status);
      res.render('index', { title: 'Plivo App', apps:response.objects });
	});
});

router.post('/send', function(req, res) {
	// body...
	var phn = '+'+req.body.pno;
	var params = {
	    'src': '14153337777', // Caller Id
	    'dst' : phn, // User Number to Call
	    'text' : req.body.msg,
	    'type' : "sms",
	};
	if(req.body.authId != "" && req.body.authToken != ""){
		var obj = {
					"authId": req.body.authId,
					"authToken": req.body.authToken
				};
		p = plivo.RestAPI(obj);
	}
	//console.log('-------',req.body.authId)
	console.log('Called',req.body , params)
	p.send_message(params, function (status, response) {
	    console.log('Status: ', status);
	    console.log('API Response:\n', response);
		console.log('API1', response.error);
		console.log('API1222', response);
		if( typeof response.error == 'undefined'){
			res.render('index', { status: response })
		}else{
			res.render('index', { status: response.error })
		}
	    
	});
})




module.exports = router;

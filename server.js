var express	= require('express');
var app		= express();
var fs		= require('fs');
var parser	= require('body-parser');

//Setup ip adress and port
var ipaddress ;


/**
 * Get the IP address from the environment variables.
 *
 * @return {String}
 */
function initIPAdress() {
    var adr = process.env.OPENSHIFT_NODEJS_IP;
    if (typeof adr === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using localhost');
            adr = 'localhost';
    }

    ipaddress = adr;
}

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;


/**
 * Basic landing page.
 *
 * @return null
 */
app.get('/', function (req, res) {
  res.send('Hello World!')
});


/**
 * Get admin panel from disk.
 *
 * @return null
 */
 
/*
app.get('/admin', function (req, res) {
        res.setHeader('Content-Type', 'text/html'); 
        res.send( fs.readFileSync('./index_admin.html') );
});
*/

initIPAdress(); //Setup IP adress before app.listen()

app.listen(port, ipaddress, function() {
        console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), ipaddress, port);
});
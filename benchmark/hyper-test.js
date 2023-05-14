const HyperExpress = require('hyper-express');
const webserver = new HyperExpress.Server();

webserver.get('*', (request, response) => {
    response.send("OK")
});
// Activate webserver by calling .listen(port, callback);
webserver.listen(3006).catch((err) => {
    console.log(err);
})
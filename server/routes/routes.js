module.exports = function(app) {
    var endpoints = require('../controllers/controller.js');
    // Delete a Document with parameters
    app.delete('/firestore/', endpoints.delete);
    app.get('/firestore/', endpoints.findAll);
}
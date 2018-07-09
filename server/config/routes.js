const quotes = require('../controllers/quotes')

module.exports = function (app) {
    app.get('/', function (req, res) {
        quotes.index(req, res)
    })
    // Render edit ejs page route
    app.get('/show/:id', function (req, res, next) {
        quotes.showBear(req, res)
    })
    app.post('/edit/:id', function (req, res) {
        quotes.editBear(req, res);
    })
    app.get('/delete/:id', function (req, res) {
        quotes.deleteBear(req, res);
    })
    // post route to create bears
    app.post('/addBear', function (req, res) {
        quotes.addBear(req, res);
    });//end post route for addbear
}